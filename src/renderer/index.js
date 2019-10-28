import Vue from 'vue'
import App from './App'
import router from './router'

process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true'

// eslint-disable-next-line
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
