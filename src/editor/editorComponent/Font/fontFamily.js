export function registerFontFamily(Quill){
    var Font = Quill.import('formats/font')
    Font.whitelist = [false,'宋体', '黑体', '微软雅黑', '楷体', 'Arial', 'pingfang','幼圆','仿宋_GB2312','仿宋'];
    Quill.register(Font, true)
}
