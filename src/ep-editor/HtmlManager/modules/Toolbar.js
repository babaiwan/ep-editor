import {cloneObj} from "ep-ui/src/utils/util";

export class Toolbar {
    // quill reference
    constructor(htmlManager) {
        // Setup Toolbar
        this.domNode = document.createElement('div')
        Object.assign(this.domNode.style, {
            position: 'absolute',
            top: '-25px',
            right: '0',
            left: '15px',
            height: '0',
            minWidth: '300px',
            maxWidth: '300px',
            font: '12px/1.0 Arial, Helvetica, sans-serif',
            textAlign: 'center',
            color: '#333',
            boxSizing: 'border-box',
            cursor: 'default',
        })
        this.htmlManager = htmlManager
        htmlManager.htmlBlock.appendChild(this.domNode)

        // Setup Buttons
        this._addToolbarButtons()
        this._reposition()
    }

    _addToolbarButtons = () => {
        const container = document.createElement('div')
        const innerDiv = document.createElement('div')
        const htmlButton = document.createElement('a')
        const deleteButton = document.createElement('a')
        container.className = 'toolbar'
        container.style = 'border: 1px solid #ccc;\n' +
            '    background-color: #f5f5f5;\n' +
            '    border-radius: 3px;\n' +
            '    padding: 10px;\n' +
            '    overflow: auto;'
        innerDiv.style = 'white-space: nowrap;'
        htmlButton.innerHTML = '编辑html'
        htmlButton.style = 'box-sizing: border-box;\n' +
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
        deleteButton.innerHTML = '删除'
        deleteButton.style = 'box-sizing: border-box;\n' +
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
            '    padding: 4px 10px;\n' +
            '    text-decoration: none;\n' +
            '    vertical-align: baseline;\n' +
            '    white-space: nowrap;\n' +
            '    float:left;\n' +
            '    margin-right: 10px;'

        container.appendChild(innerDiv)
        innerDiv.appendChild(htmlButton)
        innerDiv.appendChild(deleteButton)
        this.domNode.appendChild(container)

        htmlButton.addEventListener('click',()=>{
            this.htmlManager.htmlBlock.removeChild(this.domNode)
            this.domNode = undefined
            this.htmlManager.quill.openHtmlEditor(this.htmlManager.htmlBlock.innerHTML)
        })

        deleteButton.addEventListener('click',()=>{
            this.htmlManager.htmlBlock.removeChild(this.domNode)
            this.domNode = undefined
            this.htmlManager.quill.deleteHtmlBlock(this.htmlManager.htmlBlock)
        })
    }

    _reposition = () => {
        if (!this.htmlManager.overlay || !this.htmlManager.htmlBlock) {
            return;
        }

        const parent = this.htmlManager.quill.root.parentNode;
        const imgRect = this.htmlManager.htmlBlock.getBoundingClientRect();
        const containerRect = parent.getBoundingClientRect();

        Object.assign(this.domNode.style, {
            left: `${imgRect.left - containerRect.left - 1 + parent.scrollLeft}px`,
            top: `${imgRect.top - containerRect.top + parent.scrollTop - 55}px`,
        });
    }
}
