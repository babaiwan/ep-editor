<template>
  <div id="app">
    <div class="container">
      <ep-editor></ep-editor>
    </div>
  </div>
</template>

<script>
import EpEditor from "./editor/editor";

export default {
  name: 'App',
  components: {
    EpEditor
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}

  .container{
    margin-top: 2em;
    width: 920px;
    margin: 0 auto;
  }
</style>
