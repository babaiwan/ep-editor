export function registerTextIndent(Quill){
  var Parchment = Quill.import("parchment");
  console.log('parchment is')
  console.log(Parchment)

  class IndentAttributor extends Parchment.ClassAttributor {
    add(node, value) {
      if (value === '+1' || value === '-1') {
        const indent = this.value(node) || 0;
        value = value === '+1' ? indent + 1 : indent - 1;
      }
      if (value === 0) {
        this.remove(node);
        return true;
      }
      return super.add(node, value);
    }

    //  ql-text-indent-${num}
    value(domNode) {
      let num = 0;
      for (let clazz of domNode.classList){
        if (clazz.indexOf('ql-text-indent') != -1){
          num = clazz.split('-')[3]
        }
      }
      let value = parseInt(num,10) || undefined;
      return  value// Don't return NaN
    }
  }

  const TextIndentStyle = new IndentAttributor("text-indent", "ql-text-indent", {
    scope: Parchment.Scope.BLOCK,
    whitelist: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
  })


  Quill.register("formats/text-indent",TextIndentStyle )
  console.log('register done')
  console.log(TextIndentStyle)
  console.log(Quill)
}
