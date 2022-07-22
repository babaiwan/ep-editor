import QuillBetterTable from './editorComponent/Table/quill-better-table'
import ImageResize from './editorComponent/ImageResize/ImageResize'
import HtmlManager from "./editorComponent/HtmlManager/htmlManager";
import {Scope, StyleAttributor} from 'parchment'


export function cloneObj (obj) {
  // eslint-disable-next-line one-var
  let str, newobj = obj.constructor === Array ? [] : {}
  if (typeof obj !== 'object') {
    return
  } else if (window.JSON) {
    str = JSON.stringify(obj)
    newobj = JSON.parse(str)
  } else {
    for (var i in obj) {
      newobj[i] = typeof obj[i] === 'object'
        ? cloneObj(obj[i])
        : obj[i]
    }
  }
  return newobj
}

const handlers = {
  image: function image () {
    var self = this
    var fileInput = this.container.querySelector('input.ql-image[type=file]')
    if (fileInput === null) {
      fileInput = document.createElement('input')
      fileInput.setAttribute('type', 'file')
      if (uploadConfig.name) {
        fileInput.setAttribute('name', uploadConfig.name)
      }
      fileInput.setAttribute('accept', uploadConfig.accept)
      fileInput.classList.add('ql-image')
      fileInput.addEventListener('change', function () {
        // 重写图片上传
        let files = fileInput.files[0]
        const fileName = files.name.toString()
        var reader = new FileReader()
        reader.readAsDataURL(files)
        reader.onload = function (evt) {
          self.fileString = evt.target.result
          if (!files) {
            this.$pop('请选择文件')
          } else {
            sendAttachment({
              fileName: fileName,
              fileContent: self.fileString
            }).then(json => {
              // //这里很重要，你图片上传成功后，img的src需要在这里添加，res.path就是你服务器返回的图片链接。
              let length = self.quill.getSelection(true).index
              self.quill.insertEmbed(length, 'image', json.data)
              self.quill.setSelection(length + 1)
            })
          }
        }
      })
      this.container.appendChild(fileInput)
    }
    fileInput.click()
  }
}

const uploadConfig = {
  action: 'http://localhost:9092/ep-article/file/upload', // 必填参数 图片上传地址
  methods: 'POST', // 必填参数 图片上传方式
  token: '', // 可选参数 如果需要token验证，假设你的token有存放在sessionStorage
  name: 'img', // 必填参数 文件的参数名
  size: 2048, // 可选参数   图片大小，单位为Kb, 1M = 1024Kb
  accept: 'image/png, image/gif, image/jpeg, image/bmp, image/x-icon' // 可选 可上传的图片格式
}

function registerTable (Quill) {
  Quill.register({'modules/better-table': QuillBetterTable}, true)
}


function registerFontSize (Quill) {
  // 注册formater 方法，该方法调用register对字体进行format
  var Size = Quill.import('formats/size')
  Size.whitelist = [false, '12px', '16px', '20px', '22px', '30px']
  Quill.register(Size, true)
}

function registerImageResize (Quill) {
  Quill.register('modules/imageResize', ImageResize)
}

function registerHtmlManager (Quill) {
  Quill.register('modules/htmlManager', HtmlManager)
}

function registerScriptBlock (Quill) {
  const block = Quill.import('blots/block')

  class ScriptBlock extends block {
    static create (value) {
      const node = super.create(value)
      node.text = value
      return node
    }
  }

  // blotName
  ScriptBlock.blotName = 'ScriptBlock'
  // class名将用于匹配blot名称
  ScriptBlock.className = 'ScriptBlock'
  // 标签类型自定义
  ScriptBlock.tagName = 'script'
  Quill.register(ScriptBlock, true)
}

function registerLineHeight (Quill) {
  const LineHeightClass = new StyleAttributor('lineHeight', 'ql-lineHeight', {
    scope: Scope.INLINE,
    whitelist: ['1.42', '2', '3', '4', '5']
  })
  const LineHeightStyle = new StyleAttributor('lineHeight', 'ql-lineHeight', {
    scope: Scope.INLINE,
    whitelist: [1.42, 2, 3, 4, 5]
  })
  Quill.register({'formats/lineHeight': LineHeightClass}, true)
  Quill.register({'attributors/style/lineHeight': LineHeightStyle}, true)

  let inline = Quill.import('blots/inline')

  class lineHeight extends inline {
    // Resitery 调用该create方法 create对象在富文本中
    static create (value) {
      const node = super.create(value)
      node.style.lineHeight = value
      node.style.display = 'inline-Block'
      return node
    }

    static formats (value) {
      return value.style.lineHeight
    }
  }

  // blotName
  lineHeight.blotName = 'lineHeight'
  // class名将用于匹配blot名称
  lineHeight.className = 'lineHeight'
  // 标签类型自定义
  lineHeight.tagName = 'span'
  Quill.register(lineHeight, true)
}

/**
 * 重载createLink
 * */
function registerLinkBlot (Quill) {
  const Inline = Quill.import('blots/inline')

  class linkBlock extends Inline {
    static create (value) {
      console.log('createLink')
      console.log(value)
      const node = super.create(value)
      node.setAttribute('href', this.sanitize(value))
      node.setAttribute('rel', 'noopener noreferrer')
      node.setAttribute('target', '_blank')
      console.log(node)
      return node
    }

    static formats (domNode) {
      return domNode.getAttribute('href')
    }

    static sanitize (url) {
      return sanitize(url, this.PROTOCOL_WHITELIST) ? url : this.SANITIZED_URL
    }

    /**
     * 重载该方法，format: text -> link
     * */
    format (name, value) {
      if (name !== this.statics.blotName || !value) {
        super.format(name, value)
      } else {
        this.domNode.setAttribute('href', this.constructor.sanitize(value))
      }
    }
  }

  linkBlock.blotName = 'linkBlock'
  linkBlock.tagName = 'A'
  linkBlock.SANITIZED_URL = 'about:blank'
  linkBlock.PROTOCOL_WHITELIST = ['http', 'https', 'mailto', 'tel']

  function sanitize (url, protocols) {
    const anchor = document.createElement('a')
    anchor.href = url
    const protocol = anchor.href.slice(0, anchor.href.indexOf(':'))
    return protocols.indexOf(protocol) > -1
  }

  Quill.register(linkBlock)
}

// hljs.configure({ // optionally configure hljs
//   languages: ['javascript', 'ruby', 'python', 'sql', 'java']
// })
export const options = {
  theme: 'snow',
  boundary: document.body,
  modules: {
    toolbar: {
      container: '#toolbar',
      handlers: handlers
    },
    'better-table': {
      operationMenu: {
        items: {
          insertColumnLeft: {
            text: '左侧插入列'
          },
          insertColumnRight: {
            text: '右侧插入列'
          },
          insertRowUp: {
            text: '顶部插入行'
          },
          insertRowDown: {
            text: '底部插入行'
          },
          mergeCells: {
            text: '合并单元格'
          },
          unmergeCells: {
            text: '取消合并表格单元格'
          },
          deleteColumn: {
            text: '删除列'
          },
          deleteRow: {
            text: '删除行'
          },
          deleteTable: {
            text: '删除表格'
          }
        },
        background: {
          color: '#333'
        },
        color: {
          colors: ['green', 'red', 'yellow', 'blue', 'white'],
          text: 'background:'
        }
      }
    },
    imageResize: {
      // See optional "config" below
    },
    syntax: {
      hljs: {
        highlight: function (language, text) { // 返回highlight函数
          let result = hljs.highlightAuto(text)
          return result
        }
      }
    },
    htmlManager: true
  },
  placeholder: '',
  readOnly: false
}

export function registerPlugin (Quill) {
  registerFontSize(Quill)
  registerImageResize(Quill)
  registerHtmlManager(Quill)
  registerScriptBlock(Quill)
  registerLinkBlot(Quill)
  registerLineHeight(Quill)
  registerTable(Quill)
}
