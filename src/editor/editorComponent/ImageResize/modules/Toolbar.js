import { ClassAttributor, Scope, StyleAttributor } from 'parchment';
import IconAlignLeft from 'quill/assets/icons/align-left.svg'
import IconAlignCenter from 'quill/assets/icons/align-center.svg'
import IconAlignRight from 'quill/assets/icons/align-right.svg'
import {BaseModule} from './BaseModule'

const FloatStyle = new StyleAttributor('float','float')
const MarginStyle = new StyleAttributor('margin','margin')
const DisplayStyle = new StyleAttributor('display','display')

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
        apply: () => {
          DisplayStyle.add(this.resizer.img, 'inline')
          FloatStyle.add(this.resizer.img, 'left')
          MarginStyle.add(this.resizer.img, '0 1em 1em 0')
        },
        isApplied: () => FloatStyle.value(this.resizer.img) == 'left',
      },
      { // 居中
        icon: IconAlignCenter,
        apply: () => {
          DisplayStyle.add(this.resizer.img, 'block')
          FloatStyle.remove(this.resizer.img)
          MarginStyle.add(this.resizer.img, 'auto')
        },
        isApplied: () => MarginStyle.value(this.resizer.img) == 'auto',
      },
      { // 对齐
        icon: IconAlignRight,
        apply: () => {
          DisplayStyle.add(this.resizer.img, 'inline')
          FloatStyle.add(this.resizer.img, 'right')
          MarginStyle.add(this.resizer.img, '0 0 1em 1em')
        },
        isApplied: () => FloatStyle.value(this.resizer.img) == 'right',
      }
    ]
  }

  _addToolbarButtons = () => {
    const container = document.createElement('div')
    const innerDiv = document.createElement('div')
    this.input = document.createElement('input')
    const borderButton = document.createElement('a')
    const resizeButton = document.createElement('a')
    const editButton = document.createElement('a')
    container.style = 'border: 1px solid #ccc;\n' +
      '    background-color: #f5f5f5;\n' +
      '    border-radius: 3px;\n' +
      '    padding: 10px;\n' +
      '    overflow: auto;'
    innerDiv.style = 'white-space: nowrap;'
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
    container.appendChild(innerDiv)
    innerDiv.appendChild(this.input)
    innerDiv.appendChild(borderButton)
    innerDiv.appendChild(resizeButton)
    if (this.resizer.img.src.substring(0, 15) === 'data:image/png;' || this.resizer.img.src.substring(0, 19) === 'data:image/svg+xml;') {
      innerDiv.appendChild(editButton)
    }
    this.toolbar.appendChild(container)

    // 定义一些点击事件
    borderButton.addEventListener('click', () => {
      if (this.resizer.img.style.border === '') {
        this.resizer.img.style.border = '1px solid black'
      } else {
        this.resizer.img.style.border = ''
      }
    })
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
      }
    })
    resizeButton.addEventListener('click', () => {
      this.resizer.img.width = this.preDragWidth
      this.input.value = this.preDragWidth + 'px'
      this.resizer.overlay.children[0].innerHTML = this.resizer.img.width + ' × ' + this.resizer.img.height
      this.resizer.overlay.style.width = this.resizer.img.width + 'px'
      this.resizer.overlay.style.height = this.resizer.img.height + 'px'
    })
    editButton.addEventListener('click', (e) => {
      console.log(this.resizer.img)
      console.log(this.resizer.quill)
      // 操作这个quill 打开 modal
      this.resizer.quill.openDiagramEditor()
    })
  }

  _selectButton = (button) => {
    button.style.filter = 'invert(20%)'
  }
}
