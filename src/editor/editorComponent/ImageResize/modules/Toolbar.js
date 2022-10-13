import {ClassAttributor, Scope, StyleAttributor} from 'parchment';
import IconAlignLeft from '../../../../quill/assets/icons/align-left.svg'
import IconAlignCenter from '../../../../quill/assets/icons/align-center.svg'
import IconAlignRight from '../../../../quill/assets/icons/align-right.svg'
import {BaseModule} from './BaseModule'

const FloatStyle = new StyleAttributor('float', 'float')
const MarginStyle = new StyleAttributor('margin', 'margin')
const DisplayStyle = new StyleAttributor('display', 'display')

export class Toolbar extends BaseModule {
  onCreate = () => {
    this.input = {}
    this.storeWidth = this.resizer.img.width

    // Setup Toolbar
    this.toolbar = document.createElement('div')
    Object.assign(this.toolbar.style, this.resizer.options.toolbarStyles)
    this.resizer.overlay.appendChild(this.toolbar)

    // Setup Buttons
    this._defineAlignments()
    this._addToolbarButtons()

    // store the width before operation
    this.preDragWidth = this.resizer.img.width
  }

  // The toolbar and its children will be destroyed when the overlay is removed
  onDestroy = () => {
  }

  // Nothing to update on drag because we are are positioned relative to the overlay
  onUpdate = () => {
    this.input.value = this.resizer.img.width + 'px'
  }

  _defineAlignments = () => {
    this.alignments = [ // 靠左对齐
      {
        icon: IconAlignLeft,
        apply: (index) => {
          this.resizer.quill.formatLine(index, 1, 'align', false)
          // DisplayStyle.add(this.resizer.img, 'inline')
          // FloatStyle.add(this.resizer.img, 'left')
          // MarginStyle.add(this.resizer.img, '0 1em 1em 0')
        },
        isApplied: () => FloatStyle.value(this.resizer.img) == 'left',
      },
      { // 居中
        icon: IconAlignCenter,
        apply: (index) => {
          this.resizer.quill.formatLine(index, 1, 'align', 'center')
          // DisplayStyle.add(this.resizer.img, 'block')
          // FloatStyle.remove(this.resizer.img)
          // MarginStyle.add(this.resizer.img, 'auto')
        },
        isApplied: () => MarginStyle.value(this.resizer.img) == 'auto',
      },
      { // 对齐
        icon: IconAlignRight,
        apply: (index) => {
          this.resizer.quill.formatLine(index, 1, 'align', 'right')
          // DisplayStyle.add(this.resizer.img, 'inline')
          // FloatStyle.add(this.resizer.img, 'right')
          // MarginStyle.add(this.resizer.img, '0 0 1em 1em')
        },
        isApplied: () => FloatStyle.value(this.resizer.img) == 'right',
      }
    ]
  }

  _addToolbarButtons = () => {
    const container = this._initContainer()
    const innerDiv = document.createElement('div')
    innerDiv.style = 'white-space: nowrap;'

    this._initSizeInput(innerDiv)
    // this._initResizerButton(innerDiv)
    // this._initEditButton(innerDiv)
    this._initMarkButton(innerDiv)
    this._initFloatButton(innerDiv)

    container.appendChild(innerDiv)
    this.toolbar.appendChild(container)
  }

  _initContainer = () => {
    const container = document.createElement('div')
    container.style = 'border: 1px solid #ccc;\n' +
      '    background-color: #f5f5f5;\n' +
      '    border-radius: 3px;\n' +
      '    padding: 10px;\n' +
      '    overflow: auto;\n' +
      '    width: 360px;'

    return container;
  }

  _initResizerButton = (domNode) => {
    const resizeButton = document.createElement('a')
    resizeButton.innerHTML = '原始尺寸'
    resizeButton.style = '    box-sizing: border-box;\n' +
      '    background: #f5f5f5;\n' +
      '    border: 1px solid #ccc;\n' +
      '    border-radius: 3.01px;\n' +
      '    color: #333;\n' +
      '    cursor: pointer;\n' +
      '    display: inline-block;\n' +
      '    font-family: inherit;\n' +
      '    font-size: 14px;\n' +
      '    font-variant: normal;\n' +
      '    font-weight: normal;\n' +
      '    height: 2.14285714em;\n' +
      '    line-height: 1.42857143;\n' +
      '    margin: 0;\n' +
      '    padding: 4px 10px;\n' +
      '    text-decoration: none;\n' +
      '    vertical-align: baseline;\n' +
      '    white-space: nowrap;\n' +
      '    float:left;\n' +
      '    margin-right: 10px;'
    resizeButton.addEventListener('click', () => {
      this.resizer.img.width = this.preDragWidth
      this.input.value = this.preDragWidth + 'px'
      this.resizer.overlay.children[0].innerHTML = this.resizer.img.width + ' × ' + this.resizer.img.height
      this.resizer.overlay.style.width = this.resizer.img.width + 'px'
      this.resizer.overlay.style.height = this.resizer.img.height + 'px'
    })

    domNode.appendChild(resizeButton)
  }

  _initSizeInput = (domNode) => {
    this.input = document.createElement('input')
    this.input.id = 'resizeImageInput'
    this.input.value = `${this.resizer.img.width}px`
    this.input.style = '    margin-right: 10px;\n' +
      'border-radius: 3px;\n' +
      '    background: transparent;\n' +
      '    border: 1px solid #CCC;\n' +
      '    box-sizing: border-box;\n' +
      '    font-size: 14px;\n' +
      '    float: left;\n' +
      '    padding: 4px;\n' +
      '    text-align: center;\n' +
      '    height: 30px;\n' +
      '    width: 60px;\n' +
      '    cursor: text;'

    this.input.addEventListener('click', () => {
      this.input.focus()
    })
    this.input.addEventListener('keydown', (e) => {
      // console.log(this.resizer.overlay.children[0])
      if (e.keyCode === 13) {
        this.resizer.img.width = this.input.value.substring(0, this.input.value.lastIndexOf('p'))
        this.resizer.overlay.children[0].innerHTML = this.resizer.img.width + ' × ' + this.resizer.img.height
        this.resizer.overlay.style.width = this.resizer.img.width + 'px'
        this.resizer.overlay.style.height = this.resizer.img.height + 'px'

        this.resizer.hideOverlay()
        this.resizer.img = undefined
      }
    })

    domNode.appendChild(this.input)
  }

  _initEditButton = (domNode) => {
    const editButton = document.createElement('a')
    editButton.innerHTML = '编辑'
    editButton.style = '    box-sizing: border-box;\n' +
      '    background: #f5f5f5;\n' +
      '    border: 1px solid #ccc;\n' +
      '    border-radius: 3.01px;\n' +
      '    color: #333;\n' +
      '    cursor: pointer;\n' +
      '    display: inline-block;\n' +
      '    font-family: inherit;\n' +
      '    font-size: 14px;\n' +
      '    font-variant: normal;\n' +
      '    font-weight: normal;\n' +
      '    height: 2.14285714em;\n' +
      '    line-height: 1.42857143;\n' +
      '    margin: 0;\n' +
      '    padding: 4px 10px;\n' +
      '    text-decoration: none;\n' +
      '    vertical-align: baseline;\n' +
      '    white-space: nowrap;\n' +
      '    float:left;\n' +
      '    margin-right: 10px;'
    editButton.addEventListener('click', (e) => {
      console.log(this.resizer.img)
      console.log(this.resizer.quill)
      // 操作这个quill 打开 modal
      this.resizer.quill.openDiagramEditor()
    })

    if (this.resizer.img.src.substring(0, 15) === 'data:image/png;' || this.resizer.img.src.substring(0, 19) === 'data:image/svg+xml;') {
      domNode.appendChild(editButton)
    }
  }

  _initBorderButton = (domNode) => {
    const borderButton = document.createElement('a')
    borderButton.innerHTML = '边框'
    borderButton.style = '    box-sizing: border-box;\n' +
      '    background: #f5f5f5;\n' +
      '    border: 1px solid #ccc;\n' +
      '    border-radius: 3.01px;\n' +
      '    color: #333;\n' +
      '    cursor: pointer;\n' +
      '    display: inline-block;\n' +
      '    font-family: inherit;\n' +
      '    font-size: 14px;\n' +
      '    font-variant: normal;\n' +
      '    font-weight: normal;\n' +
      '    height: 2.14285714em;\n' +
      '    line-height: 1.42857143;\n' +
      '    margin: 0;\n' +
      '    padding: 4px 10px;\n' +
      '    text-decoration: none;\n' +
      '    vertical-align: baseline;\n' +
      '    white-space: nowrap;\n' +
      '    float:left;\n' +
      '    margin-right: 10px;'

    // 定义一些点击事件
    borderButton.addEventListener('click', () => {
      if (this.resizer.img.style.border === '') {
        this.resizer.img.style.border = '1px solid black'
      } else {
        this.resizer.img.style.border = ''
      }
    })

    domNode.appendChild(borderButton)
  }

  _initMarkButton = (domNode) => {
    const markButton = document.createElement('a')  // 标注按钮
    markButton.innerHTML = '标注'
    markButton.style = '    box-sizing: border-box;\n' +
      '    background: #f5f5f5;\n' +
      '    border: 1px solid #ccc;\n' +
      '    border-radius: 3.01px;\n' +
      '    color: #333;\n' +
      '    cursor: pointer;\n' +
      '    display: inline-block;\n' +
      '    font-family: inherit;\n' +
      '    font-size: 14px;\n' +
      '    font-variant: normal;\n' +
      '    font-weight: normal;\n' +
      '    height: 2.14285714em;\n' +
      '    line-height: 1.42857143;\n' +
      '    margin: 0;\n' +
      '    padding: 4px 10px;\n' +
      '    text-decoration: none;\n' +
      '    vertical-align: baseline;\n' +
      '    white-space: nowrap;\n' +
      '    float:left;\n' +
      '    margin-right: 10px;'


    domNode.appendChild(markButton)
  }

  _initFloatButton = (domNode) => {
    const left_button = document.createElement('a')
    left_button.innerHTML = '<svg t="1658985642824" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2863" width="16" height="16"><path d="M64 320h896v128H64zM64 576h384v128H64zM64 832h896v128H64zM64 64h384v128H64z" p-id="2864"></path></svg>'
    left_button.style = '    box-sizing: border-box;\n' +
      '    background: #f5f5f5;\n' +
      '    border: 1px solid #ccc;\n' +
      '    border-radius: 3.01px;\n' +
      '    color: #333;\n' +
      '    cursor: pointer;\n' +
      '    display: inline-block;\n' +
      '    font-family: inherit;\n' +
      '    font-size: 14px;\n' +
      '    font-variant: normal;\n' +
      '    font-weight: normal;\n' +
      '    height: 2.14285714em;\n' +
      '    line-height: 1.42857143;\n' +
      '    margin: 0;\n' +
      '    padding: 4px 10px;\n' +
      '    text-decoration: none;\n' +
      '    vertical-align: baseline;\n' +
      '    white-space: nowrap;\n' +
      '    float:left;\n' +
      '    margin-right: 10px;'

    const center_button = document.createElement('a')
    center_button.innerHTML = '<svg t="1658984432751" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2613" width="16" height="16"><path d="M320 64h381.312v128H320zM64 317.312h896V448H64zM320 576h384v128H320zM64 829.312h896V960H64z" p-id="2614"></path></svg>'
    center_button.style = '    box-sizing: border-box;\n' +
      '    background: #f5f5f5;\n' +
      '    border: 1px solid #ccc;\n' +
      '    border-radius: 3.01px;\n' +
      '    color: #333;\n' +
      '    cursor: pointer;\n' +
      '    display: inline-block;\n' +
      '    font-family: inherit;\n' +
      '    font-size: 14px;\n' +
      '    font-variant: normal;\n' +
      '    font-weight: normal;\n' +
      '    height: 2.14285714em;\n' +
      '    line-height: 1.42857143;\n' +
      '    margin: 0;\n' +
      '    padding: 4px 10px;\n' +
      '    text-decoration: none;\n' +
      '    vertical-align: baseline;\n' +
      '    white-space: nowrap;\n' +
      '    float:left;\n' +
      '    margin-right: 10px;'

    const right_button = document.createElement('a')
    right_button.innerHTML = '<svg t="1658990815813" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2409" width="16" height="16"><path d="M64 320h896v128H64zM576 576h384v128H576zM64 832h896v128H64zM576 64h384v128H576z" p-id="2410"></path></svg>'
    right_button.style = ' box-sizing: border-box;\n' +
      '    background: #f5f5f5;\n' +
      '    border: 1px solid #ccc;\n' +
      '    border-radius: 3.01px;\n' +
      '    color: #333;\n' +
      '    cursor: pointer;\n' +
      '    display: inline-block;\n' +
      '    font-family: inherit;\n' +
      '    font-size: 14px;\n' +
      '    font-variant: normal;\n' +
      '    font-weight: normal;\n' +
      '    height: 2.14285714em;\n' +
      '    line-height: 1.42857143;\n' +
      '    margin: 0;\n' +
      '    padding: 4px 10px;\n' +
      '    text-decoration: none;\n' +
      '    vertical-align: baseline;\n' +
      '    white-space: nowrap;\n' +
      '    float:left;\n' +
      '    margin-right: 10px;'

    left_button.addEventListener('click', () => {
      console.log(this.resizer.getImageIndex())
      this.alignments[0].apply(this.resizer.getImageIndex())
      this.resizer.img = undefined
      this.resizer.hideOverlay()
    })
    center_button.addEventListener('click', () => {
      console.log(this.resizer.getImageIndex())
      this.alignments[1].apply(this.resizer.getImageIndex())
      this.resizer.img = undefined
      this.resizer.hideOverlay()
    })
    right_button.addEventListener('click', () => {
      console.log(this.resizer.getImageIndex())
      this.alignments[2].apply(this.resizer.getImageIndex())
      this.resizer.img = undefined
      this.resizer.hideOverlay()
    })

    domNode.appendChild(left_button)
    domNode.appendChild(center_button)
    domNode.appendChild(right_button)
  }

  _selectButton = (button) => {
    button.style.filter = 'invert(20%)'
  }

  _getBlock = () => {
    let index = this.resizer.getImageIndex()
    let [Block, Number] = this.resizer.quill.getLine(index)
    // Block is the <p> which contain the <img>
    return Block
  }
}
