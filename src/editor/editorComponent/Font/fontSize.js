export function registerFontSize (Quill) {
    // 注册formater 方法，该方法调用register对字体进行format
    var Size = Quill.import('formats/size')
    Size.whitelist = [false, '12px', '16px', '20px', '22px', '30px']
    Quill.register(Size, true)
}
