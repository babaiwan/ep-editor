<template>
  <ep-modal size="small" v-model="previewModal" :before-close="closePreviewModal">
    <div v-html="htmlContent"></div>
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
