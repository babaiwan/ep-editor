<template>
  <div id="app">
    <img src="./assets/logo.png">
<!--    <HelloWorld/>-->
    <ep-editor></ep-editor>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import EpEditor from "./editor/editor";

export default {
  name: 'App',
  components: {
    EpEditor,
    HelloWorld
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
