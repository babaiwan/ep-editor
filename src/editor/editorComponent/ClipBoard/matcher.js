import Delta from "quill-delta";

export const MSWORD_MATCHERS = [
    ['b span', mathWpsWordList],
    ['p.MsoNormal>span', mathWpsWordList]
];

function mathWpsWordList(node, delta) {

    // 可能出现 font-family:'宋体,仿宋,....'  此时逗号可视作回退系统，若浏览器第一个不匹配则使用第二个字体
    let fontFamilyArr = node.style['font-family'].split(',')

    // format到delta中
    delta.ops.map((op) => {
        if (op.attributes == undefined){
            op.attributes = {}
        }
        op.attributes.font = fontFamilyArr[0]
    });
    return new Delta(delta.ops);
}

