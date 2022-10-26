import './quillFont.css'

export function registerFontSize (Quill) {
    // 注册formater 方法，该方法调用register对字体进行format
    var Size = Quill.import('formats/size')
    Size.whitelist = ['42pt','36pt','26pt','24pt','22pt','18pt',
        '16pt','15pt','14pt','12pt',
        '五号','9pt','六号','小六','13px',
        '12px', '16px', '20px', '22px', '30px']
    Quill.register(Size, true)
}
