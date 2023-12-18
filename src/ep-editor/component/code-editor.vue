<template>
  <div class="code-editor">
    <!-- <ep-button type="primary" icon="android-settings" @click="handleSetting">RUN</ep-button> -->
    <div
      :style="{height: typeof editorHeight === 'number' ? editorHeight +'px': editorHeight}"
      v-if="model"
      ref="container"
      class="container"
    ></div>
  </div>
</template>
<script>

export function isEmpty(item) {
  return item === undefined || item === null || item === ''
}

import * as monaco from "monaco-editor";

const lineHeight = 19;

const defaultOption = {
  // lineNumbers: 'off',
  lineNumbersMinChars: 3,
};

export default {
  props: {
    codes: {
      type: String,
      default: "#请输入",
    },
    // Monaco editor 原生参数 start
    // 语言
    language: {
      type: String,
      default: "html",
    },
    // 主题
    // 【多个实例主题设置会影响全局】https://github.com/Microsoft/monaco-editor/issues/338
    theme: {
      type: String,
      default: "vs-dark", // vs, hc-black, or vs-dark
    },
    // 只读
    readonly: {
      type: Boolean,
      default: false,
    },
    //
    automaticLayout: {
      type: Boolean,
      default: false,
    },
    scrollBeyondLastLine: {
      type: Boolean,
      default: false,
    },
    autoIndent: {
      type: Boolean,
      default: false,
    },
    // 右边缩略图
    minimap: {
      type: Object,
      default: () => ({
        enabled: true,
      }),
    },
    formatOnPaste: {
      type: Boolean,
      default: false,
    },
    // Monaco editor 原生参数 end
    height: [Number, String],
    minHeight: {
      type: Number,
      default: lineHeight * 3,
    },
    maxHeight: {
      type: [Number, String],
      default: lineHeight * 10, // auto 为自适应撑开
    },
    initFormat: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      monacoEditor: null,
      editorHeight: this.minHeight + 5, // 19 是默认行高
      listeners: {
        modelCreation: "",
      },
      modelChangeCount: 0,
      model: true,
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
        formatOnPaste: this.formatOnPaste,
      };
    },
  },
  mounted() {
    this.initEditor();

  },
  destroyed() {
    this.disPoseEditor()
  },
  watch: {
    codes(val) {
      if (this.monacoEditor) {
        // 代码为空时重置代码格式化的计数器
        if (isEmpty(val)) {
          this.modelChangeCount = 0;
        }
        if (val === this.monacoEditor.getValue()) {
          return;
        }
        this.monacoEditor.setValue(val);
        this.calcHeight();
      }
    },
  },
  methods: {
    initEditor() {
      // console.log('init');
      // 参数
      this.$refs.container.innerHTML = "";
      // 全局监听函数
      // this.listeners.modelCreation = monaco.editor.onDidCreateEditor((event) => {

      // })

      // 创建实例
      this.monacoEditor = monaco.editor.create(
        this.$refs.container,
        Object.assign({}, defaultOption, this.option)
      );
      this.format();
      // 监听变化
      this.monacoEditor.onDidChangeModelContent(() => {
        const newValue = this.monacoEditor.getValue();
        this.$emit("update:codes", newValue);
        // 初始化的时候格式化
        if (
          this.initFormat &&
          this.modelChangeCount === 0 &&
          !isEmpty(this.codes)
        ) {
          setTimeout(() => {
            this.modelChangeCount++;
            this.monacoEditor.getAction("editor.action.formatDocument").run();
            this.calcHeight();
          }, 200);
        } else {
          this.calcHeight();
        }
      });
    },
    disPoseEditor () {
      this.monacoEditor.dispose()
    },
    reLayout () {
      this.monacoEditor.layout()
    },
    /**
     * 计算高度
     */
    calcHeight() {
      let height = this.monacoEditor.getModel().getLineCount() * lineHeight;
      let finalHeight = 0;
      if (this.height) {
        this.editorHeight = this.height;
      } else {
        if (height < this.minHeight) {
          // 最低高度
          finalHeight = this.minHeight;
        } else if (this.maxHeight === "auto") {
          // 最高高度自适应
          finalHeight = height;
        } else if (height > this.maxHeight) {
          // 最高高度
          finalHeight = "auto";
        } else {
          finalHeight = height;
        }
        this.editorHeight = finalHeight + 5;
      }
      this.$nextTick().then(() => {
        this.monacoEditor.layout();
      });

    },
    runResult() {
      // console.log(this.monacoEditor.getValue());
    },
    format() {
      setTimeout(() => {
        this.monacoEditor.getAction("editor.action.formatDocument").run();
        this.calcHeight();
      }, 200);
    },
    setLanguage(data) {
      let model = this.monacoEditor.getModel();
      monaco.editor.setModelLanguage(model, data || this.language);
    },
    goDown(){
      let height =this.monacoEditor.getScrollHeight()
      this.monacoEditor.setScrollPosition({scrollTop:height });
    },
    goUp(){
      this.monacoEditor.setScrollPosition({scrollTop:0 });
    }
  },
};
</script>
<style scoped lang="less">
.code-editor {
  // height:  calc(100vh - 50px);

  padding: 0;
  // border: 1px solid #9E9E9E;
  .container {
    border: 1px solid #ddd;
  // height:  calc(100vh - 50px);

  }
}
</style>
