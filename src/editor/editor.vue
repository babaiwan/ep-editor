<template>
  <div class="quill-editor">
    <div ref="toolbar">
      <span class="ql-formats">
        <select class="ql-header">
          <option selected>正文</option>
          <option value="h1">一级标题</option>
          <option value="h2">二级标题</option>
          <option value="h3">三级标题</option>
          <option value="h4">四级标题</option>
        </select>
        <select class="ql-size">
          <option value="12px"></option>
          <option selected>13px(默认)</option>
          <option value="16px"></option>
          <option value="20px"></option>
          <option value="22px"></option>
          <option value="30px"></option>
        </select>
      </span>
      <span class="ql-formats">
        <button class="ql-bold"></button>
        <button class="ql-italic"></button>
        <button class="ql-underline"></button>
        <button class="ql-strike"></button>
      </span>
      <span class="ql-formats">
        <button class="ql-list" value="ordered"></button>
        <button class="ql-list" value="bullet"></button>
      </span>
      <span class="ql-formats">
        <button class="ql-color-picker">
          <colorPicker v-model="color" v-on:change="handleColorChange"/>
        </button>
        <button class="ql-blockquote"></button>
        <button class="ql-code-block"></button>
        <button class="ql-image" value="image"></button>
        <button class="ql-video" value="video"></button>
      </span>
      <span class="ql-formats">
        <select class="ql-lineHeight">
          <option selected value="1.42">1.42</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </span>
      <span class="ql-formats">
        <select class="ql-align"></select>
        <button class="ql-formula" type="button"></button>
        <button class="ql-indent" value="+1" type="button"></button>
        <button class="ql-indent" value="-1" type="button"></button>
        <button class="ql-blockquote"></button>
        <button class="ql-code-block"></button>
        <ep-popover
          placement="bottom"
          width="250"
          trigger="click"
        >
          <div id="md-table-gen-wrap" class="table_size_chooser" ref="md-table-gen-wrap">
              <div class="SizeChooser">
                <span id="md-table-info">Hover mouse over the number of squares<br>to select the number of columns and rows<br>you want in your table.</span>
                <table id="md-table-gen-chooser" ref="md-table-gen-chooser">
                  <tbody>
                    <tr v-for="row in tableSize[0]">
                      <td v-for="cell in tableSize[1]"
                          :ref="'md-table-cell-row-'+row+'-cell-'+cell"
                          @mouseenter="hoverTableCell(row,cell)"
                          @click="insertTable(row,cell)"
                      >
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
          </div>
          <!--          <ep-button slot="reference" style="margin-bottom: 8px;" icon="3-md-grid"></ep-button>-->
          <button slot="reference">
                <svg t="1658472614083" class="icon addTable" viewBox="0 0 1024 1024"
                     version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2841" width="16" height="16"><path
                  d="M0 160v704c0 35.3 28.7 64 64 64h896c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H64c-35.3 0-64 28.7-64 64z m304 704H80c-8.8 0-16-7.2-16-16V688c0-8.8 7.2-16 16-16h224c8.8 0 16 7.2 16 16v160c0 8.8-7.2 16-16 16z m0-256H80c-8.8 0-16-7.2-16-16V432c0-8.8 7.2-16 16-16h224c8.8 0 16 7.2 16 16v160c0 8.8-7.2 16-16 16z m0-256H80c-8.8 0-16-7.2-16-16V176c0-8.8 7.2-16 16-16h224c8.8 0 16 7.2 16 16v160c0 8.8-7.2 16-16 16z m320 512H400c-8.8 0-16-7.2-16-16V688c0-8.8 7.2-16 16-16h224c8.8 0 16 7.2 16 16v160c0 8.8-7.2 16-16 16z m0-256H400c-8.8 0-16-7.2-16-16V432c0-8.8 7.2-16 16-16h224c8.8 0 16 7.2 16 16v160c0 8.8-7.2 16-16 16z m0-256H400c-8.8 0-16-7.2-16-16V176c0-8.8 7.2-16 16-16h224c8.8 0 16 7.2 16 16v160c0 8.8-7.2 16-16 16z m320 512H720c-8.8 0-16-7.2-16-16V688c0-8.8 7.2-16 16-16h224c8.8 0 16 7.2 16 16v160c0 8.8-7.2 16-16 16z m0-256H720c-8.8 0-16-7.2-16-16V432c0-8.8 7.2-16 16-16h224c8.8 0 16 7.2 16 16v160c0 8.8-7.2 16-16 16z m0-256H720c-8.8 0-16-7.2-16-16V176c0-8.8 7.2-16 16-16h224c8.8 0 16 7.2 16 16v160c0 8.8-7.2 16-16 16z"
                  p-id="2842"></path></svg>
          </button>
          <!--           <svg slot="reference" t="1658393655644" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="13121" width="17" height="17"><path d="M928 938.666667H96a53.393333 53.393333 0 0 1-53.333333-53.333334V181.333333a53.393333 53.393333 0 0 1 53.333333-53.333333h832a53.393333 53.393333 0 0 1 53.333333 53.333333v704a53.393333 53.393333 0 0 1-53.333333 53.333334z m-245.333333-42.666667h245.333333a10.666667 10.666667 0 0 0 10.666667-10.666667v-202.666666h-256z m-298.666667 0h256v-213.333333H384z m-298.666667-213.333333v202.666666a10.666667 10.666667 0 0 0 10.666667 10.666667h245.333333v-213.333333z m597.333334-42.666667h256V426.666667h-256z m-298.666667 0h256V426.666667H384z m-298.666667 0h256V426.666667H85.333333z m853.333334-256V181.333333a10.666667 10.666667 0 0 0-10.666667-10.666666H96a10.666667 10.666667 0 0 0-10.666667 10.666666v202.666667z" fill="#5C5C66" p-id="13122"></path></svg>-->
        </ep-popover>

      </span>
      <span class="ql-formats">
        <button @click="openDiagramEditor">
            <svg t="1634262194119" style="vertical-align: -18%" class="icon" viewBox="0 0 1024 1024" version="1.1"
                 xmlns="http://www.w3.org/2000/svg" p-id="1856" width="16" height="16"><path
              d="M532.312692 381.808872l56.193843-32.471101 162.834432 282.02285-56.193843 32.471102z m-259.481457 249.040896l162.291651-281.096929 56.385413 32.566886-162.29165 281.09693z"
              fill="#FB8C00" p-id="1857"></path><path
              d="M349.71463 137.493367m43.103232 0l238.376837 0q43.103232 0 43.103232 43.103232l0 185.184256q0 43.103232-43.103232 43.103232l-238.376837 0q-43.103232 0-43.103232-43.103232l0-185.184256q0-43.103232 43.103232-43.103232Z"
              fill="#FB8C00" p-id="1858"></path><path
              d="M587.740256 615.141035m43.103232 0l238.376837 0q43.103232 0 43.103232 43.103232l0 185.184256q0 43.103232-43.103232 43.103232l-238.376837 0q-43.103232 0-43.103232-43.103232l0-185.184256q0-43.103232 43.103232-43.103232Z"
              fill="#FB8C00" p-id="1859"></path><path
              d="M111.689004 615.141035m43.103232 0l238.376837 0q43.103232 0 43.103232 43.103232l0 185.184256q0 43.103232-43.103232 43.103232l-238.376837 0q-43.103232 0-43.103232-43.103232l0-185.184256q0-43.103232 43.103232-43.103232Z"
              fill="#FB8C00" p-id="1860"></path></svg>
        </button>
        <button @click="openTemplateChooser" style="padding-top: 5px;margin-left: 4px;width: 35px">
            <svg t="1658371742991" class="icon" viewBox="0 0 1927 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                 p-id="4403" width="24" height="24"><path
              d="M1751.04 102.4q34.816 0 66.048 13.312t54.784 36.352 36.864 54.272 13.312 66.048l0 491.52q0 35.84-13.312 66.56t-36.864 54.272-54.784 36.864-66.048 13.312l-1584.128 0q-35.84 0-66.56-13.312t-54.272-36.864-36.864-54.272-13.312-66.56l0-491.52q0-34.816 13.312-66.048t36.864-54.272 54.272-36.352 66.56-13.312l1584.128 0zM508.928 287.744l-62.464 0 0 194.56-192.512 0 0-194.56-65.536 0 0 453.632 65.536 0 0-188.416 192.512 0 0 188.416 62.464 0 0-453.632zM894.976 289.792l-320.512 0 0 68.608 128 0 0 384 64.512 0 0-384 128 0 0-68.608zM1408 289.792l-101.376 0-117.76 332.8-128-332.8-100.352 0 0 453.632 61.44 0 0-330.752 120.832 330.752 76.8 0 124.928-324.608 0 324.608 63.488 0 0-453.632zM1794.048 676.864l-193.536 0 0-385.024-63.488 0 0 451.584 257.024 0 0-66.56z"
              p-id="4404" fill="#1296db"></path></svg>
        </button>
        <button @click="preView" style="margin-left: 5px;">
          <svg style="padding-top: 3px;" t="1658388012400" class="icon" viewBox="0 0 1024 1024"
               version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5352" width="16" height="16"><path
            d="M964.266667 310.613333c-13.653333 0-25.6-11.946667-25.6-25.6v-136.533333c0-34.133333-29.013333-63.146667-64.853334-63.146667h-136.533333c-13.653333 0-25.6-11.946667-25.6-25.6S723.626667 34.133333 738.986667 34.133333h136.533333C936.96 34.133333 989.866667 87.04 989.866667 150.186667v136.533333c0 13.653333-11.946667 23.893333-25.6 23.893333zM873.813333 989.866667h-136.533333c-13.653333 0-25.6-11.946667-25.6-25.6s11.946667-25.6 25.6-25.6h136.533333c35.84 0 64.853333-29.013333 64.853334-64.853334v-136.533333c0-13.653333 11.946667-25.6 25.6-25.6s25.6 11.946667 25.6 25.6v136.533333c0 63.146667-52.906667 116.053333-116.053334 116.053334zM286.72 989.866667h-136.533333C87.04 989.866667 34.133333 936.96 34.133333 873.813333v-136.533333c0-13.653333 11.946667-25.6 25.6-25.6s25.6 11.946667 25.6 25.6v136.533333C85.333333 909.653333 114.346667 938.666667 150.186667 938.666667h136.533333c13.653333 0 25.6 11.946667 25.6 25.6s-11.946667 25.6-25.6 25.6zM59.733333 310.613333c-13.653333 0-25.6-11.946667-25.6-25.6v-136.533333C34.133333 87.04 87.04 34.133333 150.186667 34.133333h136.533333c13.653333 0 25.6 11.946667 25.6 25.6S300.373333 85.333333 286.72 85.333333h-136.533333C114.346667 85.333333 85.333333 114.346667 85.333333 150.186667v136.533333c0 13.653333-11.946667 23.893333-25.6 23.893333z"
            fill="#2c2c2c" p-id="5353"></path><path
            d="M488.106667 738.986667c-138.24 0-252.586667-112.64-252.586667-252.586667s112.64-252.586667 252.586667-252.586667 252.586667 112.64 252.586666 252.586667-114.346667 252.586667-252.586666 252.586667z m0-452.266667c-110.933333 0-201.386667 90.453333-201.386667 201.386667s90.453333 201.386667 201.386667 201.386666S687.786667 597.333333 687.786667 488.106667 597.333333 286.72 488.106667 286.72z"
            fill="#2c2c2c" p-id="5354"></path><path
            d="M762.88 788.48c-6.826667 0-13.653333-1.706667-18.773333-6.826667L631.466667 669.013333c-10.24-10.24-10.24-25.6 0-35.84s25.6-10.24 35.84 0l112.64 112.64c10.24 10.24 10.24 25.6 0 35.84-3.413333 5.12-10.24 6.826667-17.066667 6.826667z"
            fill="#2c2c2c" p-id="5355"></path></svg>
        </button>
        <!--        <button @click="getDelta">get</button>-->
      </span>
    </div>
    <div ref="editor"></div>

    <draw-io-dialog
      ref="drawIo"
      :draw-i-o-dialog="drawIoModal"
      @closeDrawIO="closeDrawIO"
      @createPng="createPng"
    ></draw-io-dialog>

    <template-chooser
      :template-modal="templateChooserModal"
      @insertHtmlBlock="insertHtmlBlock"
      @closeTemplateModal="closeTemplateModal"
    ></template-chooser>

    <html-edit-modal
      ref="htmlEditor"
      :html-edit-modal="htmlEditModal"
      :html-content="htmlContent"
      @updateHtml="updateHtml"
      @closeModal="closeHtmlModal"
    >
    </html-edit-modal>

    <preview-modal
      :preview-modal="previewModal"
      :html-content="preViewContent"
      @closePreviewModal="closePreviewModal"
    >
    </preview-modal>
  </div>
</template>

<script>
import './editorComponent/Table/quillTable.css'
import './quillSnow.css' // import styles
import _Quill from 'quill'
import {registerPlugin, options} from './registerPlugin'
import DrawIoDialog from './editorComponent/DrawIODialog/drawIoDialog'
import TemplateChooser from "./editorComponent/Component/templateChooser";
import HtmlEditModal from "./editorComponent/HtmlManager/htmlEditModal";
import Delta from "quill-delta";
import PreviewModal from "./editorComponent/Component/previewModal";
import vcolorpicker from 'vcolorpicker'
import Vue from 'vue'

Vue.use(vcolorpicker)


const Quill = window.Quill || _Quill
registerPlugin(Quill)
export default {
  name: 'epEditor',
  components: {PreviewModal, HtmlEditModal, TemplateChooser, DrawIoDialog},
  data() {
    return {
      color: '',
      quill: {},

      drawIoModal: false,
      tableSize: [10, 10],
      tableGenerator: false,

      templateChooserModal: false,
      htmlEditModal: false,
      previewModal: false,
      htmlContent: '',
      preViewContent: ''
    }
  },
  methods: {
    preView() {
      let html = this.quill.root.innerHTML
      this.preViewContent = html
      this.previewModal = true
    },
    openTemplateChooser() {
      this.templateChooserModal = true
    },
    openDiagramEditor() {
      this.drawIoModal = true
    },
    openHtmlEditor(html) {
      this.htmlContent = html
      this.htmlEditModal = true
    },
    closeDrawIO() {
      this.drawIoModal = false
    },
    createPng(base64String) {
      // todo 如果设置了全局的上传图片地址，则上传图片返回接口地址 否则返回base64存入
      let length = this.quill.getSelection(true).index
      this.quill.insertEmbed(length, 'image', base64String)
      this.drawIoModal = false
    },
    initialize() {
      options.modules.toolbar.container = this.$refs.toolbar
      this.quill = new Quill(this.$refs.editor, options)
      this.quill.openDiagramEditor = () => {
        this.openDiagramEditor()
      }
      this.quill.openHtmlEditor = (html) => {
        this.openHtmlEditor(html)
      }
    },
    hoverTableCell(row, cell) {
      // 清除之前赋予的color
      for (let r = 0; r < this.tableSize[0]; r++) {
        for (let c = 0; c < this.tableSize[1]; c++) {
          this.$refs[`md-table-cell-row-${(r + 1).toString()}-cell-${(c + 1).toString()}`].forEach(v => {
            v.bgColor = ''
          })
        }
      }
      for (let r = 0; r < row; r++) {
        for (let c = 0; c < cell; c++) {
          this.$refs[`md-table-cell-row-${(r + 1).toString()}-cell-${(c + 1).toString()}`].forEach(v => {
            v.bgColor = '#DEF;'
          })
        }
      }
    },
    insertTable(row, cell) {
      this.tableGenerator = false
      let tableModule = this.quill.getModule('better-table')
      console.log('module is ')
      console.log(tableModule)
      tableModule.insertTable(row, cell)
    },
    handleColorChange(val) {
      this.quill.format('color', val) // val =  #ffff  || red ....
    },
    insertHtmlBlock(html) {
      let range = this.quill.getSelection(true)
      this.quill.insertText(range.index, '\n', Quill.sources.USER)
      this.quill.insertEmbed(range.index + 1, 'HtmlEmbed', html, Quill.sources.USER)
      this.quill.insertText(range.index + 2, '\n', Quill.sources.USER)
    },
    closeTemplateModal() {
      this.templateChooserModal = false
    },
    closeHtmlModal() {
      this.htmlEditModal = false
    },
    closePreviewModal() {
      this.previewModal = false
    },
    updateHtml(val) {
      console.log('update html')
      console.log(this.quill)
      this.quill.updateContents(new Delta()
        .retain(this.quill.htmlManager.range.index - 1)
        .delete(1)
        .insert({'HtmlEmbed': val})
      );
    }
  },
  mounted() {
    this.initialize()
  }
}
</script>

<style scoped>

</style>
