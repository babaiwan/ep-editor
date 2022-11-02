<template>
  <ep-modal v-model="htmlEditModal" :before-close="closeModal" size="small" @open="initHtml">
    <div class="html-block">
      <code-editor language="html" ref="htmlEditor"
                   :min-height="400" :max-height="400"
                   :codes="editContent"
                   @update:codes="handleUpdate">
      </code-editor>
    </div>
  </ep-modal>
</template>

<script>
export default {
  name: "htmlEditModal",
  components: {
    CodeEditor: () => import ('../component/codeEditor')
  },
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
