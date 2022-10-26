import {Quill} from "vue-quill-editor/dist/ssr";

class countingWords{
    constructor(quill,val) {
        // 创建一个统计字数的容器
        this.container = quill.addContainer('ql-counter');
        quill.on(Quill.events)
        quill.on(Quill.events.TEXT_CHANGE, () => {
            const text = quill.getText();
            const char = text.replace(/\s/g, '');
            this.container.innerHTML = `当前字数：${char.length}`;
        });
    }
}


export default countingWords