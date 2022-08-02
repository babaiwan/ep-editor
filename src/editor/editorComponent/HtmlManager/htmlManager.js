import Module from 'quill/core/module'
import Quill from 'quill'
import HtmlEmbed from "./modules/htmlEmbed";
import {Toolbar} from "./modules/Toolbar";

class HtmlManager extends Module {

  // 注册需要的一些基础组件
  static register() {
    Quill.register(HtmlEmbed, true)
  }

  // 初始化
  constructor(quill, options) {
    super(quill, options)

    // save the refrence
    this.quill = quill
    this.quill.htmlManager = this
    this.quill.root.addEventListener('click', this.clickHtmlBlock);
  }


  clickHtmlBlock = (evt) => {
    let range = this.quill.getSelection();
    this.quill.htmlManager.range = range;

    if (this.quill.htmlManager.htmlBlock || this.quill.htmlManager.overlay) {
      this.hideOverlay()
    }

    // 递归寻找html-embed 的html代码块
    this.findParentHtmlDom(evt.target)
    console.log(this.htmlWapper)
    this.htmlWapper !== null ? this.initOverlay(this.htmlWapper) : this.hideOverlay()
  }

  findParentHtmlDom = (domNode) => {

    try {
      if (domNode == null) {
        return
      }
      if (domNode.classList.contains('ql-editor')) {
        this.htmlWapper = null
        return
      }

      if (domNode && domNode.tagName && domNode.tagName.toUpperCase() === 'DIV' && domNode.classList.contains('html-embed')) {
        this.htmlWapper = domNode
        return
      } else {
        this.findParentHtmlDom(domNode.parentNode)
      }
    } catch (e) {
      console.log(e)
    }
  }

  initOverlay = (domNode) => {
    // overlay
    this.htmlBlock = domNode
    this.overlay = document.createElement('div');
    Object.assign(this.overlay.style, {
      position: 'absolute',
      boxSizing: 'border-box',
      border: '1px dashed #444',
      opacity: 0.2,
      background: '#4EC2F8'
    });
    this.quill.blur();
    this.quill.root.parentNode.appendChild(this.overlay);
    this.repositionElements()
    document.addEventListener('keydown', this.listener)

    // toolbar
    this.toolbar = new Toolbar(this)
  }

  listener = (evt) => {
    if (evt.keyCode == 8 && this.overlay && this.htmlBlock) {
      if (this.htmlBlock !== undefined) {
        this.quill.root.removeChild(this.htmlBlock);
      }
      this.hideOverlay()
    }
  }

  hideOverlay = () => {
    if (!this.overlay || !this.htmlBlock) {
      return;
    }

    // Remove the toolbar
    if (this.toolbar.domNode) {
      this.htmlBlock.removeChild(this.toolbar.domNode)
    }


    // Remove the overlay
    this.quill.root.parentNode.removeChild(this.overlay);
    this.overlay = undefined;
    this.htmlBlock = undefined;
    document.removeEventListener('keydown', this.listener)


  }

  repositionElements = () => {
    if (!this.overlay || !this.htmlBlock) {
      return;
    }

    // position the overlay over the htmlBlock
    const parent = this.quill.root.parentNode;
    const imgRect = this.htmlBlock.getBoundingClientRect();
    const containerRect = parent.getBoundingClientRect();

    Object.assign(this.overlay.style, {
      left: `${imgRect.left - containerRect.left - 1 + parent.scrollLeft}px`,
      top: `${imgRect.top - containerRect.top + parent.scrollTop}px`,
      width: `${imgRect.width}px`,
      height: `${imgRect.height}px`,
    });
  }
}

export default HtmlManager
