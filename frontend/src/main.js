import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "./components/Home";
import Player from "./components/Player";
import App from "./App";
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import Vuex from 'vuex'
import { store } from './store/index'

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.config.productionTip = false;

const router = new VueRouter({
    routes: [
        {path: '', component: Home},
        {path: '/player', component: Player},
    ]
});

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');
