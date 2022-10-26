import {Scope, StyleAttributor} from "parchment";

export function registerLineHeight(Quill){
    const LineHeightClass = new StyleAttributor('lineHeight', 'ql-lineHeight', {
        scope: Scope.INLINE,
        whitelist: ['1.42', '2','3','4','5'],
    });
    const LineHeightStyle = new StyleAttributor('lineHeight', 'ql-lineHeight', {
        scope: Scope.INLINE,
        whitelist: [1.42, 2,3,4,5],
    });
    Quill.register({ 'formats/lineHeight': LineHeightClass }, true)
    Quill.register({ 'attributors/style/lineHeight': LineHeightStyle},true)


    let inline = Quill.import('blots/inline')
    class lineHeight extends inline {
        // Resitery 调用该create方法 create对象在富文本中
        static create(value){
            const node = super.create(value);
            node.style.lineHeight = value
            node.style.display = 'inline-Block'
            return node;
        }

        static formats(value) {
            return value.style.lineHeight;
        }
    }

    // blotName
    lineHeight.blotName  = 'lineHeight';
// class名将用于匹配blot名称
    lineHeight.className = 'lineHeight';
// 标签类型自定义
    lineHeight.tagName   = 'span';
    Quill.register(lineHeight, true);
}
