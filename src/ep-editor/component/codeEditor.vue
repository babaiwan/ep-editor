<template>
  <div class="code-editor">
    <div v-if="model" id="code" ref="container" class="container" :style="{height: editorHeight +'px'}"></div>
  </div>
</template>
<script>
  import * as monaco from "monaco-editor"

  const lineHeight = 19
  const defaultOption = {
    lineNumbersMinChars: 3
  }
  export default {
    name: "codeEditor",
    props: {
      codes: {
        type: String,
        default: '#请输入'
      },
      // Monaco editor 原生参数 start
      // 语言
      language: {
        type: String,
        default: 'html'
      },
      // 主题
      // 【多个实例主题设置会影响全局】https://github.com/Microsoft/monaco-editor/issues/338
      theme: {
        type: String,
        default: 'vs-dark' // vs, hc-black, or vs-dark
      },
      // 只读
      readonly: {
        type: Boolean,
        default: false
      },
      //
      automaticLayout: {
        type: Boolean,
        default: false
      },
      scrollBeyondLastLine: {
        type: Boolean,
        default: false
      },
      autoIndent: {
        type: Boolean,
        default: false
      },
      // 右边缩略图
      minimap: {
        type: Object,
        default: () => ({
          enabled: true
        })
      },
      formatOnPaste: {
        type: Boolean,
        default: false
      },
      // Monaco editor 原生参数 end
      minHeight: {
        type: Number,
        default: lineHeight * 3
      },
      maxHeight: {
        type: [Number, String],
        default: lineHeight * 10 // auto 为自适应撑开
      },
      initFormat: {
        type: Boolean,
        default: false
      },
    },
    data() {
      return {
        monacoEditor: null,
        editorHeight: this.minHeight + 5, // 19 是默认行高
        listeners: {
          modelCreation: ''
        },
        modelChangeCount: 0,
        model: true
      };
    },
    computed: {
      option() {
        return {
          value: this.codes,
          language: this.language,
          theme: this.theme,
          automaticLayout: this.automaticLayout,
          scrollBeyondLastLine: this.scrollBeyondLastLine,
          autoIndent: this.autoIndent,
          // minimap: this.minimap,
          readOnly: this.readonly,
          formatOnPaste: this.formatOnPaste
        }
      }
    },
    mounted() {
      this.initEditor();
    },
    destroyed() {
    },
    watch: {
      codes(val) {
        if (this.monacoEditor) {
          // 代码为空时重置代码格式化的计数器
          if (isEmpty(val)) {
            this.modelChangeCount = 0
          }
          if (val === this.monacoEditor.getValue()) {
            return
          }
          this.monacoEditor.setValue(val)
          this.calcHeight()
        }
      }
    },
    methods: {
      initEditor() {
        // console.log('init');
        // 参数
        this.$refs.container.innerHTML = '';
        // 全局监听函数
        // this.listeners.modelCreation = monaco.editor.onDidCreateEditor((event) => {

        // })

        // 创建实例
        this.monacoEditor = monaco.editor.create(this.$refs.container, Object.assign({}, defaultOption, this.option))

        this.format()
        // 监听变化
        this.monacoEditor.onDidChangeModelContent((event) => {
          const newValue = this.monacoEditor.getValue();
          this.$emit('update:codes', newValue)
          // 初始化的时候格式化
          if (this.initFormat && this.modelChangeCount === 0 && !isEmpty(this.codes)) {
            setTimeout(() => {
              this.modelChangeCount++
              this.monacoEditor.getAction('editor.action.formatDocument').run();
              this.calcHeight()
            }, 200)
          } else {
            this.calcHeight()
          }
        })
      },
      /**
       * 计算高度
       */
      calcHeight() {
        let height = this.monacoEditor.getModel().getLineCount() * lineHeight
        let finalHeight = 0
        if (height < this.minHeight) {
          // 最低高度
          finalHeight = this.minHeight
        } else if (this.maxHeight === 'auto') {
          // 最高高度自适应
          finalHeight = height
        } else if (height > this.maxHeight) {
          // 最高高度
          finalHeight = this.maxHeight
        } else {
          finalHeight = height
        }
        this.editorHeight = finalHeight + 5
        this.$nextTick().then(_ => {
          this.monacoEditor.layout()
        })
      },
      format() {
        setTimeout(() => {
          this.monacoEditor.getAction('editor.action.formatDocument').run()
          this.calcHeight()
        }, 200)
      },
      setLanguage(data) {
        let model = this.monacoEditor.getModel()
        monaco.editor.setModelLanguage(model, data || this.language)
      }
    }
  };
</script>
<style scoped lang="less">
  .code-editor {
    padding: 0;
    .container {
      width: 100%;
      border: 1px solid #DDD;
    }
  }
</style>
