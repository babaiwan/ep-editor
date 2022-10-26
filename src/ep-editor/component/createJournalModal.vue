<template>
  <div>
    <ep-modal v-model="chooseJournalTypeModal"  title="编辑器选择"  width="610px" height="500px" :before-close="closeChooseJournalTypeModal">
      <div style="display: flex;padding: 10px 0px">
        <div class="container-box" @click="chooseContentType('M')">
          <div class="inner-container">
            <div style="height: 40px">

            </div>
            <div style="text-align: center">
              <img src="../../../../public/dist/assets/markdown.png">
            </div>

            <div>
              <figcaption>
                <h2 style="color: #AAAAAA">Markdown编辑器</h2>
                <p  style="color: #AAAAAA">Markdown是一种「标记语言」，通常为程序员群体所用。除此之外，Markdown也是国际杂志编辑以及许多写作者都广泛使用的标记语言。</p>
              </figcaption>
            </div>


          </div>
        </div>

        <div class="container-box" @click="chooseContentType('H')">
          <div class="inner-container">
            <div style="height: 40px">

            </div>
            <div style="text-align: center">
              <img src="../../../../public/dist/assets/fuwenben.png">
            </div>

            <div>
              <figcaption>
                <div style="text-align: center">
                  <h2 style="color: #AAAAAA">富文本编辑器</h2>
                </div>

                <p  style="color: #AAAAAA">富文本编辑器，Multi-function Text Editor, 简称 MTE, 它提供类似于 Microsoft Word 的编辑功能</p>
              </figcaption>
            </div>
          </div>
        </div>
      </div>


    </ep-modal>
  </div>


</template>

<script>
export default {
  name: "createJournalModal",
  props:['chooseJournalTypeModal'],

  methods:{
    closeChooseJournalTypeModal(){
      this.$emit('closeChooseJournalTypeModal',true)
    },
    chooseContentType(val){
      this.$emit('newEdit',val)
    }
  },
}
</script>

<style scoped lang="less">
.container-box:hover{
  background-color: #cbe0fa;
}

.container-box{
  margin: 10px 15px;
  width: 50%;
  max-width: 250px;
  height: 437px;
  padding: 25px 26px;
}
.inner-container:hover{
  cursor: pointer;
}

.grid {
  width: 100%;
}
.grid a {
  float: left;
  max-width: 250px;
  width: 50%;
  color: #333;
}
.grid figure {
  position: relative;
  overflow: hidden;
  margin: 5px;
  background: #333;
}
.grid figure img {
  position: relative;
  display: block;
  width: 100%;
  opacity: 0.7;
  transition: opacity 0.3s;
}
.grid figcaption {
  position: absolute;
  top: 0;
  z-index: 11;
  padding: 10px;
  width: 100%;
  height: 100%;
  text-align: center;
}
.grid figcaption h2 {
  margin: 0 0 20px 0;
  color: #3498db;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 300;
  font-size: 130%;
  transition: transform 0.3s;
}

.grid figcaption p {
  padding: 0 20px;
  color: #aaa;
  font-weight: 300;
  transition: opacity 0.3s, transform 0.3s;
}

.grid figcaption h2,
.grid figcaption p {
  transform: translateY(50px);
}
.grid figure button {
  position: absolute;
  padding: 4px 20px;
  border: none;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: bold;
  transition: opacity 0.3s, transform 0.3s;
}
.grid figcaption,
.grid figcaption h2,
.grid figcaption p,
.grid figure button {
  backface-visibility: hidden;
}
.grid svg {
  position: absolute;
  top: -1px; /* fixes rendering issue in FF */
  z-index: 10;
  width: 100%;
  height: 100%;
}
.grid svg path {
  fill: #fff;
}
.grid a:hover figure img {
  opacity: 1;
}

.grid a:hover figcaption h2,
.grid a:hover figcaption p {
  transform: translateY(0);
}

.grid a:hover figcaption p {
  opacity: 0;
}
.demo-1 body {
  background: #3498db;
}

.demo-1 .grid figure button,
.demo-3 .grid figure button {
  top: 50%;
  left: 50%;
  border: 3px solid #fff;
  background: transparent;
  color: #fff;
  opacity: 0;
  transform: translateY(-50%) translateX(-50%) scale(0.25);
}

.demo-1 .grid a:hover figure button,
.demo-3 .grid a:hover figure button {
  opacity: 1;
  transform: translateY(-50%) translateX(-50%) scale(1);
}
</style>