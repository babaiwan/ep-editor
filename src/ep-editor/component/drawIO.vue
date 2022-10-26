<template>
  <ep-modal v-model="drawIoModal" :before-close="closeDrawIO" height="740px" title="调整图形" id="drawIoModal" :default-render="true">

    <div id="drawIoContainer" style="height: 650px"></div>

    <div class="geFooterContainer" style="left: 0px; right: 0px; bottom: 0px; z-index: 10004; height: 28px;"><div class="geFooter"></div></div>
    <div class="tapd-grap-dialog__foot">
      <div class="tapd-grap-dialog__foot-btns">
        <ep-button type="primary" size="small" @click="confirm">确定</ep-button>
        <ep-button size="small" @click="closeDrawIO">取消</ep-button>
      </div>
    </div>

<!--    <img id="myImage" style="cursor:pointer;" title="Click to edit image" onclick="DiagramEditor.editElement(this);" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHkAAAA9CAYAAACJM8YzAAADT3RFWHRteGZpbGUAJTNDbXhmaWxlJTIwaG9zdCUzRCUyMmVtYmVkLmRpYWdyYW1zLm5ldCUyMiUyMG1vZGlmaWVkJTNEJTIyMjAyMS0wMS0xMVQxMCUzQTQxJTNBMzQuMjQ4WiUyMiUyMGFnZW50JTNEJTIyNS4wJTIwKE1hY2ludG9zaCUzQiUyMEludGVsJTIwTWFjJTIwT1MlMjBYJTIwMTFfMV8wKSUyMEFwcGxlV2ViS2l0JTJGNTM3LjM2JTIwKEtIVE1MJTJDJTIwbGlrZSUyMEdlY2tvKSUyMENocm9tZSUyRjg3LjAuNDI4MC44OCUyMFNhZmFyaSUyRjUzNy4zNiUyMiUyMGV0YWclM0QlMjJtNXI1QVhFdDE3eWx2WWlEWXo5UyUyMiUyMHZlcnNpb24lM0QlMjIxNC4xLjklMjIlMjB0eXBlJTNEJTIyZW1iZWQlMjIlM0UlM0NkaWFncmFtJTIwaWQlM0QlMjJlbVlSU0REUmtEUDJZZDNFWnkzciUyMiUyMG5hbWUlM0QlMjJQYWdlLTElMjIlM0VqWkxOVG9Rd0VJQ2ZwbGV6MEloNkZkZjE0Z2tUejVXT3ROblNrbElXOE9sdDdWUm9OaVplWU9hYjZmd1RXdmZMeWJKQnZCb09pcFFIdmhENlJNcXlxS283JTJGd3RramVTV1BrVFFXY2tqT215Z2tWJTJCQUx4T2RKSWNSV1VUT0dPWGtrTVBXYUEydHl4aXoxc3k1MjZkUmVkYUJkWkI1Qk5DMFRGM1RkOG1kaVBTJTJCckRiJTJCQXJJVEtYTlJZWDhmckQxMzFrd2E4Mm1qSVZwNmxzSmdEYU5nM013N1JJJTJCRTF0WVlGNlYlMkJxVUdGc2VZVGUlMkY3RGlpV1BiazFOcEZvdGFQZXZDS21KQzFNVHhuZ1RjZ3d1NGNQQ0ZtQjBOMWVaWmlFZE5BTnJnejc3a3lEMFViaGVlYTN3NG5VaFdPd0ZySU5saDdDd0U1Z2VuRjI5QzFyVDBOWmNuYmZsRkltSjNXSXFaQXp2b2ZzTnZNM0JDemlLcEc0NyUyQkxIdGJwd2V2d0UlM0QlM0MlMkZkaWFncmFtJTNFJTNDJTJGbXhmaWxlJTNFoE8CRAAABV1JREFUeF7tm1lIlVsYht+NXoSipGkIGpoDBYqiKIIQSCiRSigOCV2odZuSw51KoYaR8xCkGDmiaCDiVM5JSQiKoSiFaVk5UoKK4nz4Fmd73KmdvZX28ez1rZst7rXW/7/vs961vl/8FQB2wU2nHVAQ5J2dHZ0WKbM4PT29XQF5d5fDrIsLgbgyZF0ku08TQ9ZxwCSPITNkCRyQQCInmSFL4IAEEjnJDFkCBySQyElmyBI4IIFETjJDlsABCSRykhmyBA5IIJGTzJAlcEACiZxkhiyBAxJI5CQzZAkckEAiJ5khS+CABBJPTZLpRra3t6Gvry+B7dqVqDXI379/h5WV1ZHq2tvbERUVha9fvx7o8+DBA3z+/BmlpaVquaNpf7UmBfDlyxf09/cjNDRU3SEq/U46/lgX1eZ/a1JK5+bmxH2+f/8efn5+4tPMzEz8bnR09EjIk5OTWF9fx+XLl9XSqWl/tSYF0NjYiHv37uHTp0/qDlHpd9Lxx7qoNiHvv8GBgQG4u7tjfn4e5ubm4quOjg7cunULd+7cQUVFBc6fP4+ioiLR79mzZ5idnUViYiLq6+uRn58PmiMwMBCFhYUwNjZW0a9pfxqcnp6OyspKbG1twd/fHxkZGfTWwd68tHB8fHwwMTGB4OBgvHjxQqQ6ISEBHz58wLVr15CTk4Nz585hcXERtJvU1NSIRfzo0SM4OTkdGH9caJqO09p2rQ5kX19fBAUF4fbt28Iwejeru7sb9+/fB5mcnZ0tFkVtbS1MTEwQHx+PiIgIxMXFqejWtP/w8LAAUFxcLOal7fjp06fiXpRtdXUVeXl5yM3NRWtrKywtLWFhYYHo6GiEhITg8ePHWFpaQm9vLzIzM8WiffjwIV6+fImkpCT8/PlTzKkc7+bmpimrY/c/dZBXVlZgaGgojLx586YwTgktLS0N1tbWKCgoQGRkpDBubW0Nly5dOhSyuv3HxsZE+jw9PfHt2zcBmdJM193f9m+3BCsrKwtTU1NQKBQizXSczMzMIDU1Fe/evUNZWRkcHR3x9u1bENTOzs4TbffHpXyqINN2rTy337x5gytXrohXPJSQy8vLhbG0RVIjEJR4BweHQyGr25+KPToK6JgwMjISc9Eu8TvIlGA6Kn5ttCucPXsW4eHhAq6trS1iY2Nx9+7dE5/pOgF5f3V9GGQCSom7cOEC+vr6BAT6uaqq6lDI6vYnCJQ8OkNppwgLCxMJ/B3k5ORkvHr1Cj09PeLam5ubGBkZgYeHBz5+/IiLFy/ix48faGhoQExMjCgsx8fHOcn/BpkqW29vbwwNDYmEEAQqwJqamg6FrG7/gIAAAYWOgcHBQXENGpuSkqIyb3Nzs6gX6HGwq6tLFFuvX78WYKlQe/LkifiOzmhnZ2fQQlheXhbFGM07PT29N54mpp3gxo0bQsufbKdqu/4dZHrGpOdkSlldXZ2ovmlbfP78Oby8vA5A1qR/W1ubAEONCjt6vCMAtJhcXFz25iZIrq6u4rp0BtOWTsUgNbqf6upqXL16VRSL9Knc+umeS0pKBGTleJrbwMAALS0tuH79+p9k/P98q5EAbmxsHDiLj3JKnf70HE4QbGxsRCG1sLAAU1NTlccomp8esajYUwKkflRH2Nvb48yZM3u3QAUj/QHHzs5OFJLK9uv4P0r378n/kyRrQxhf4x8HGLIEq4EhM2QJHJBAIieZIUvggAQSOckMWQIHJJDISWbIEjgggUROMkOWwAEJJHKSGbIEDkggkZPMkCVwQAKJnGSGLIEDEkjkJDNkCRyQQCInmSFL4IAEEjnJDFkCBySQqJJkCfRKK1GhUOz+BbaftLWDFNYjAAAAAElFTkSuQmCC">-->
  </ep-modal>
</template>

<script>
const DiagramEditor = require('../diagram-editor')

export default {
  name: "drawIo",
  props:['drawIoModal'],
  data(){
    return {
      diagramEditor:{},
      base64Png:''
    }
  },
  created() {
    // this.initEditor()
  },
  beforeDestroy() {
    window.removeEventListener('message',this.handleMessageEvent)
  },
  methods:{
    closeDrawIO(){
      this.$emit('closeDrawIO')
    },
    initEditor(){
      console.log('init editor')
      const origin = DiagramEditor.initDiagramEditor();// Diagram 的原型链
      this.diagramEditor = new origin();
      this.diagramEditor.frame = this.diagramEditor.createFrame(this.diagramEditor.getFrameUrl(),this.diagramEditor.getFrameStyle())
      // Modal中添加frame 并设置监听事件

      document.getElementById("drawIoContainer").appendChild(this.diagramEditor.frame);
      window.addEventListener('message', this.handleMessageEvent);
      this.diagramEditor.format = 'xml'
      this.diagramEditor.setWaiting(true);

    },
    initEditorWithDomNode(domNode){
      const origin = DiagramEditor.initDiagramEditor();// Diagram 的原型链
      this.diagramEditor = new origin();
      this.diagramEditor.editElement(domNode)
    },
    confirm(){
      console.log('handleClick')
      this.diagramEditor.postMessage({action:'export',format:'xmlpng'},'*')
    },
    handleMessageEvent (evt){
      if (this.diagramEditor.frame != null && evt.source == this.diagramEditor.frame.contentWindow && evt.data.length > 0) {
        try {
          var msg = JSON.parse(evt.data);

          if (msg.event == 'export'){
            this.base64Png = msg.data
            this.$emit('createPng',this.base64Png)
          }else if (msg.event == 'init') {
            this.diagramEditor.initializeEditor();
          }

          if (msg != null) {
            console.log('msg is')
            console.log(msg)
            // this.diagramEditor.handleMessage(msg);
          }
        } catch (e) {
          console.error(e);
        }
      }
    },

  },


}
</script>

<style scoped>
  .geFooterContainer {
    background: #e5e5e5;
    border-top: 1px solid #c0c0c0;
  }
  .tapd-grap-dialog__foot{
    height: 55px;
  }

  #drawIoModal /deep/ .ep-model-body{
    padding: 0px 0px!important;
  }

  .tapd-grap-dialog__foot-btns{
    float: right;
    margin-right: 20px;
    margin-top: 12px;
  }
</style>