<template>
  <ep-modal v-model="htmlModal"
            :before-close="closeHtmlModal"
            append-to-body
            size="small">
    <div style="display: flex">
      <html-block
          ref="htmlBlock"
          :html-content="htmlContent"
      ></html-block>
    </div>
    <div style="text-align: center;margin-top: 15px">
        <ep-button type="primary" size="small" @click="confirmChangeHtmlContent">确定</ep-button>
        <ep-button size="small" @click="closeHtmlModal">取消</ep-button>
    </div>

  </ep-modal>
</template>

<script>
import HtmlBlock from "./html-block";
export default {
  name: "htmlModal",
  components: {HtmlBlock},
  props:['htmlModal','htmlContent'],
  methods:{
    closeHtmlModal(){
      this.$emit('closeHtmlModal')
    },
    confirmChangeHtmlContent(){
      this.$emit('changeHtmlContent',this.$refs.htmlBlock.editContent)
      this.$emit('closeHtmlModal')
    }
  }
}
</script>

<style scoped>
</style>
