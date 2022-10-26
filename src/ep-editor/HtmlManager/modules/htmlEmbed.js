import Quill from 'quill'
const embed = Quill.import('blots/block/embed')

class HtmlEmbed extends embed{

    constructor(scroll,domNode) {
        super(scroll,domNode);
    }

    static create(html){
        const node = super.create(html)
        node.innerHTML = html
        return node
    }

    static value(domNode){
        return domNode.innerHTML
    }
}
HtmlEmbed.blotName  = 'HtmlEmbed'
HtmlEmbed.className = 'html-embed'
HtmlEmbed.tagName   = 'div'

export default HtmlEmbed
