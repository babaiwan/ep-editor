// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import "ionicons-npm/css/ionicons.css"  // 旧图标库。必须，message等组件及老项目用到了
import "ep-ui/theme/lib/epui.min.css"   // ep-ui原始样式
import epui from "ep-ui";


Vue.config.productionTip = false
Vue.use(epui)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
