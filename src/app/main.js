import './assets/app.css'

import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'

import './components'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: App }
]

const router = new VueRouter({
  routes
})

new Vue({
  router
}).$mount('#app')
