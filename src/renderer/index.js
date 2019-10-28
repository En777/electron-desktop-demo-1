import Vue from 'vue'
import App from './App'

process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true'

// eslint-disable-next-line
new Vue({
  el: '#app',
  render: h => h(App)
})
