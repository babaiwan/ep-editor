<template>
  <div id="app">
    <div class="head-container">
      <h1 style="font-size: 3rem;margin-bottom: 0.25em;display: inline-block">Vue version of quill.</h1>
      <a class="edit-link" href="https://github.com/babaiwan/ep-editor" target="_blank" title="Edit on Github">
        <svg viewBox="0 0 16 16"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.3 6.53 5.47 7.6.4.06.55-.18.55-.4 0-.18 0-.8 0-1.48-2.02.37-2.54-.5-2.7-.94-.1-.23-.48-.94-.82-1.13-.28-.15-.68-.52 0-.53.62 0 1.07.58 1.22.82.72 1.2 1.87.87 2.33.66.07-.52.28-.87.5-1.07-1.77-.2-3.63-.9-3.63-3.95 0-.87.3-1.6.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.2 2.2.83.64-.18 1.32-.27 2-.27.68 0 1.36.1 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.93.08 2.13.5.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.3.25.54.73.54 1.48 0 1.08 0 1.94 0 2.2 0 .22.15.47.55.4C13.7 14.52 16 11.52 16 8c0-4.42-3.58-8-8-8z"></path></svg>
        <span style="color: #1d1e30;">Edit on Github</span>
      </a>
    </div>

    <div class="container">
      <ep-editor></ep-editor>
    </div>
  </div>
</template>

<script>
  import epEditor from "./ep-editor/epEditor";

  export default {
    name: 'App',
    components: {
      epEditor
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin-top: 20px;
  }

  .container {
    margin-top: 2em;
    width: 920px;
    margin: 0 auto;
  }

  .head-container {
    display: block;
    font-size: 1.25rem;
    left: 0;
    padding-bottom: 0.53em;
    text-align: center;
    top: 0;
    width: 100%;
  }

  .edit-link {
    position: absolute;
    right: 60px;
    font-family: 'Sofia Pro', sans-serif;
  }

  .edit-link svg {
    float: right;
    height: 1.2em;
    margin-left: 1em;
    width: 1.2em;
  }
</style>
