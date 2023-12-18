<template>
  <ep-modal size="mini" v-model="uploadDocxModal" :before-close="closeDocxModal" append-to-body>
    <ep-upload
        style="text-align: center"
        drag
        manual
        multiple
        list-type="file-list"
        :file-list="fileList"
        :http-request="customUpload"
        :data="{a: 1}"
        :preview="false"
    >
      <i class="ep-upload-dragger__icon ion-upload"></i>
      <div class="ep-upload-dragger__text">导入并解析docx文件,<em>点击上传</em></div>
    </ep-upload>
  </ep-modal>
</template>

<script>
import {convertDocxToHtml} from "../../../api";

export default {
  name: "uploadDocxModal",
  props: ['uploadDocxModal', 'quill'],
  data() {
    return {
      fileList: []
    }
  },
  methods: {
    closeDocxModal() {
      this.$emit('closeDocxModal')
    },
    customUpload(files, data) {
      let file = files[0]
      const formData = new FormData();
      formData.append('file', file);
      convertDocxToHtml(formData).then(response => {
        this.processStream(response);
      }).catch(error => console.error('Error:', error)).finally(_ => {
        this.loading = false
      });
    },
    async processStream(response) {
      const reader = response.body.getReader();
      let chunks = [];

      while (true) {
        const { done, value } = await reader.read();

        if (done) {
          break;
        }

        chunks.push(value);
      }

      const result = new Uint8Array(chunks.reduce((acc, chunk) => acc.concat(Array.from(chunk)), []));

      const html = new TextDecoder().decode(result);
      this.$emit('insertHtmlBlock', html)
      this.closeConvertWord2HtmlModal()
      this.$pop({
        message: '插入成功!',
        type: 'success'
      })
    }
  }
}
</script>

<style scoped>

</style>
