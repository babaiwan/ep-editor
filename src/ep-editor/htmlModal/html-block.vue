<template>
  <div class="html-block">
    <code-editor language="html" ref="htmlEditor"
                 :min-height="400" :max-height="400"
                 :codes="editContent"
                 @update:codes="handleUpdate">
    </code-editor>
  </div>
</template>

<script>
export default {
  name: "html-block",
  props:['htmlContent'],
  data(){
    return{
      editContent:''
    }
  },
  created() {
    this.editContent = this.htmlContent
  },
  methods:{
    handleUpdate(val){
      this.editContent = val
    }
  }
}
</script>

<style scoped>
.html-block{
  width: 100%;
  min-height: 400px;
  border: 1px solid #AAAAAA;
}
</style>