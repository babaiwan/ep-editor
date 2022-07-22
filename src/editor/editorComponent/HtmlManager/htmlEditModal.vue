<template>
  <ep-modal v-model="htmlEditModal" :before-close="closeModal" size="small" @open="initHtml">
    <div class="html-block">
      <code-editor language="html" ref="htmlEditor"
                   :min-height="400" :max-height="400"
                   :codes="editContent"
                   @update:codes="handleUpdate">
      </code-editor>
      <div style="text-align: center;margin-top: 8px">
        <ep-button type="primary" @click="updateHtml">确定</ep-button>
        <ep-button @click="closeModal">取消</ep-button>
      </div>
    </div>
  </ep-modal>
</template>

<script>
import CodeEditor from "../Component/code-editor";
export default {
  name: "htmlEditModal",
  components: {CodeEditor},
  props: {
    htmlEditModal: Boolean,
    htmlContent: String
  },
  data() {
    return {
      editContent: ''
    }
  },
  created() {
  },
  methods: {
    updateHtml(){
      this.$emit('updateHtml',this.editContent)
      this.closeModal()
    },
    handleUpdate(val) {
      this.editContent = val
    },
    closeModal() {
      this.$emit('closeModal')
    },
    initHtml() {
      this.editContent = this.htmlContent
    }
  }
}
</script>

<style scoped>

</style>
