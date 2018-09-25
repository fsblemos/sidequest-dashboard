import Vue from 'vue'

const req = require.context('./', true, /\.vue$/)

req.keys().forEach(filename => {
  const name = filename.split('.')[1].split('/')[1]
  const component = req(filename).default
  Vue.component(name, component)
})
