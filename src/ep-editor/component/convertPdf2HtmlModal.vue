<template>
  <ep-modal v-model="convertPdf2HtmlModal" :before-close="closeCoverImageModal" size="mini" width="34%" :append-to-body="true"
            title="插入 Pdf 至 文章 内">
    <div style="text-align: center" v-loading="loading">
      <ep-upload
          v-loading="loading"
          drag
          manual
          multiple
          :file-list="fileList"
          :http-request="fileUpload"
          :preview="false"
      >
        <i class="ep-upload-dragger__icon ion-upload"></i>
        <div class="ep-upload-dragger__text">将 PDF 拖到此处，或<em>点击上传</em></div>
      </ep-upload>
    </div>

    <div style="margin-top: 5px;text-align: center">
      <ep-button type="primary" @click="closeCoverImageModal">确定</ep-button>
      <ep-button @click="closeCoverImageModal">取消</ep-button>
    </div>

  </ep-modal>
</template>

<script>
// import {convertPdf2Html} from "../../../api";

export default {
  name: "convertPdf2HtmlModal",

  props: ['convertPdf2HtmlModal'],

  methods: {
    closeCoverImageModal() {
      this.$emit('closeConvertPdf2HtmlModal')
    },
    fileUpload(files) {
      const file = files[0]; // 获取选择的文件

      if (file) {
        // const formData = new FormData(); // 创建一个FormData对象
        // formData.append('file', file); // 将文件添加到FormData中
        // this.loading = true
        // convertPdf2Html(formData).then(response => {
        //   const reader = response.body.getReader();
        //   return reader.read();
        // }).then(data => {
        //   const html = new TextDecoder().decode(data.value);
        //   // 插入到文档中
        //   this.$emit('insertHtmlBlock', html)
        //   this.closeCoverImageModal()
        //   this.$pop({
        //     message: '插入成功!',
        //     type: 'success'
        //   })
        //   // 在这里你可以根据后端返回的字符串做相应的处理
        // }).catch(error => console.error('Error:', error)).finally(_ => {
        //   this.loading = false
        // });
      }
    },
  },
  data() {
    return {
      loading: false,
      fileList: []
    }
  },
  created() {

  }
}
</script>

<style scoped lang="less">
.delete-img {
  display: block;
  position: absolute;
  bottom: 0px;
  width: 100%;
  height: 40px;
  line-height: 40px;
  background: rgba(59, 60, 61, 0.5);
  // box-sizing: content-box;
  z-index: 999;
  cursor: pointer;
  text-align: right;

  i {
    margin: 8px 10px 0 0;
    display: block;
    font-size: 24px;
    color: white;
  }
}
</style>
