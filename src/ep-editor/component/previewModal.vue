<template>
  <ep-modal v-model="previewModal"
            :before-close="closePreviewModal"
            :wrap-close="true"
            append-to-body
            size="small"
  >
    <div class="ql-editor" style="font-size: 13px;">
      <div v-html="htmlContent"></div>
    </div>
  </ep-modal>
</template>

<script>
export default {
  name: "previewModal",
  props: ['previewModal', 'htmlContent'],
  methods: {
    closePreviewModal() {
      this.$emit('closePreviewModal')
    }
  }
}
</script>

<style scoped>
</style>
