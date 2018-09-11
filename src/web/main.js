import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';

// import basecss from './base.css';

Vue.use(VueRouter)

const routes = [
    { path: '/', component: App }
];

const router = new VueRouter({
    routes
});

const app = new Vue({
    router
}).$mount('#app');