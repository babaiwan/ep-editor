import Delta from "quill-delta";

export const MSWORD_MATCHERS = [
    ['span', mathWpsWordList],
    ['p.MsoNormal>span', mathWpsWordList]
];

function mathWpsWordList(node, delta) {
    // 可能出现 font-family:'宋体,仿宋,....'  此时逗号可视作回退系统，若浏览器第一个不匹配则使用第二个字体
    let fontFamilyArr = node.style['font-family'].split(',')
    let fontSize = node.style['font-size']
    switch (fontSize) {
        case '10.5pt':
            fontSize = '五号'
            break
        case '7.5pt':
            fontSize = '六号'
            break
        case '6.5pt':
            fontSize = '小六'
            break
        default:
    }
    if (fontSize == '') {
        let fontClassList = node.classList
        for (let className of fontClassList) {
            if (className.indexOf('ql-size') != -1) {
                fontSize = className.split('-')[2]
            }
        }
    }

    // format到delta中
    delta.ops.map((op) => {
        if (op.attributes == undefined) {
            op.attributes = {}
        }
        op.attributes.font = fontFamilyArr[0]
        op.attributes.size = fontSize
    });
    return new Delta(delta.ops);
}
