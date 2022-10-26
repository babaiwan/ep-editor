import QuillBetterTable from './betterTable/quill-better-table'
import ImageResize from "./ImageResize/ImageResize";
import HtmlManager from "./HtmlManager/htmlManager"
import {MSWORD_MATCHERS} from "./ClipBoard/matcher";
import hljs from 'highlight.js'
import {registerFontSize} from "./Font/fontSize";
import {registerFontFamily} from "./Font/fontFamily";
import {registerLineHeight} from "./LineHeight/lineHeight"
import {registerTextIndent} from "./Indent/Indent";
import ImageUploader from "./ImageUploader/quill.imageUploader";
import {registerImageBlot} from './ImageUploader/loadingImage';
import {upload} from "../../api";

function registerImageUploader(Quill) {
    Quill.register("modules/imageUploader", ImageUploader);
}

function registerTable(Quill) {
    Quill.register({'modules/better-table': QuillBetterTable}, true)
}

function registerImageResize(Quill) {
    Quill.register('modules/imageResize', ImageResize);
}

function registerHtmlBlock(Quill) {
    Quill.register('modules/htmlManager', HtmlManager)
}

function registerScriptBlock(Quill) {
    const block = Quill.import('blots/block')

    class ScriptBlock extends block {
        static create(value) {
            const node = super.create(value);
            node.text = value
            return node;
        }
    }

    // blotName
    ScriptBlock.blotName = 'ScriptBlock';
    // class名将用于匹配blot名称
    ScriptBlock.className = 'ScriptBlock';
    // 标签类型自定义
    ScriptBlock.tagName = 'script';
    Quill.register(ScriptBlock, true);
}

function registerColor(Quill) {
    let inline = Quill.import('blots/inline')

    class myColorInline extends inline {
        static create(value) {
            const node = super.create(value);
            node.innerText = typeof value === 'object' ? value.text : value;
            node.style.color = value.color
            return node;
        }

        static transformValue(value) {
            let handleArr = value.split('\n')
            handleArr = handleArr.map(e => e.replace(/^[\s]+/, '')
                .replace(/[\s]+$/, ''))
            return handleArr.join('')
        }

        static value(node) {
            return {text: node.outerText, color: node.style.color}
        }
    }

// blotName
    myColorInline.blotName = 'myColorInline';
// class名将用于匹配blot名称
    myColorInline.className = 'myColorInline';
// 标签类型自定义
    myColorInline.tagName = 'span';
    Quill.register(myColorInline, true);
}

/**
 * 重载createLink
 * */
function registerLinkBlot(Quill) {
    const Inline = Quill.import('blots/inline')

    class linkBlock extends Inline {
        static create(value) {
            console.log('createLink')
            console.log(value)
            const node = super.create(value);
            node.setAttribute('href', this.sanitize(value));
            node.setAttribute('rel', 'noopener noreferrer');
            node.setAttribute('target', '_blank');
            console.log(node)
            return node;
        }

        static formats(domNode) {
            return domNode.getAttribute('href');
        }

        static sanitize(url) {
            return sanitize(url, this.PROTOCOL_WHITELIST) ? url : this.SANITIZED_URL;
        }

        /**
         * 重载该方法，format: text -> link
         * */
        format(name, value) {
            if (name !== this.statics.blotName || !value) {
                super.format(name, value);
            } else {
                this.domNode.setAttribute('href', this.constructor.sanitize(value));
            }
        }
    }

    linkBlock.blotName = 'linkBlock';
    linkBlock.tagName = 'A';
    linkBlock.SANITIZED_URL = 'about:blank';
    linkBlock.PROTOCOL_WHITELIST = ['http', 'https', 'mailto', 'tel'];


    function sanitize(url, protocols) {
        const anchor = document.createElement('a');
        anchor.href = url;
        const protocol = anchor.href.slice(0, anchor.href.indexOf(':'));
        return protocols.indexOf(protocol) > -1;
    }

    Quill.register(linkBlock)
}

hljs.configure({   // optionally configure hljs
    languages: ['javascript', 'ruby', 'python', 'sql', 'java']
});
export const options = {
    theme: 'snow',
    boundary: document.body,
    modules: {
        toolbar: {
            container: '#toolbar',
            // handlers:handlers
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
                highlight: function (language, text) {// 返回highlight函数
                    let result = hljs.highlightAuto(text)
                    return result
                }
            }
        },
        htmlManager: true,
        clipboard: {
            matchers: MSWORD_MATCHERS
        },
        imageUploader: {
            upload: files => {
                return new Promise((resolve, reject) => {
                    const fileName = files.name.toString()
                    var reader = new FileReader()
                    reader.readAsDataURL(files)
                    reader.onload = function (evt) {
                        let fileString = evt.target.result
                        if (!files) {
                            this.$pop('请选择文件')
                        } else {
                            upload({
                                fileName: fileName,
                                fileContent: fileString
                            }).then(json => {
                                resolve(json.data)
                            })
                        }
                    }
                });
            }
        },  // use imageUploader instandOf uploader
        uploader:{
            handler : function (range, files){
                console.log('do nothing')
            }
        }
    },
    placeholder: 'Insert text here ...',
    readOnly: false
}

export function initEpEditor(Quill) {
    registerImageBlot(Quill);
    registerImageUploader(Quill);
    registerTextIndent(Quill);
    registerTable(Quill);
    registerFontSize(Quill);
    registerFontFamily(Quill);
    registerImageResize(Quill);
    registerHtmlBlock(Quill);
    registerScriptBlock(Quill);
    registerColor(Quill);
    registerLinkBlot(Quill);
    registerLineHeight(Quill);
}
