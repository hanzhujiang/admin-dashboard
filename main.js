// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/reset.css'
// import './assets/css/adaptive.css'
// import './assets/css/publicStyle.css'
// import './assets/css/commonality.css'
// import './api/saleApi.js'
Vue.use(ElementUI);
import Vuex from 'vuex'
Vue.use(Vuex)

import axios from 'axios'


import store from './store';

Vue.prototype.$http = axios //其他页面在使用axios的时候直接  this.$http就可以了 

import vueQuillEditor from 'vue-quill-editor' //富文本
Vue.use(vueQuillEditor);

import _ from '../src/assets/js/myfunction';
router.beforeEach((to, from, next) => {
    var router = store.state.controlrouter;
    if (to.path != "/" && JSON.stringify(router) != '{}') {
        // console.log("beforeEach.path", to.path);
        // console.log("beforeEach.control", router);
        var path = "";
        if (router.hasOwnProperty(to.path)) {
            path = to.path;
        } else {
            for (var ele in router) {
                if( to.path.startsWith(ele) ) {
                    path = ele;
                    break;
                }
            }
        }
        // console.log("beforeEach.path", path);
        // console.log("beforeEach.path", router[path]);
        if (path == '' || router[path] == '01') {
            return next(false);
        }
    }
  
    window.scrollTo(0, 0);
    if (to.meta.Auth) { // 判断该路由是否需要登录权限
        if (sessionStorage.getItem('token')) { // 通过sessionStorage获取当前的token是否存在
            next();
        } else {
            next({
                path: '/login',
                query: { redirect: to.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
            })
        }
    } else {
        next();
    }
});

Vue.prototype.$environment = 'staging'; // market, enterprice, staging, localhost

if (Vue.prototype.$environment == 'market' || Vue.prototype.$environment == 'enterprice') {
    axios.defaults.baseURL = 'https://service.arcnet.com.au/arc-back-end/'
    Vue.prototype.$stripe_apikey = 'pk_live_veWrShz0ziOSkjWS35eA4HRT00flKi2CVS'
} else if (Vue.prototype.$environment == 'staging') {
    axios.defaults.baseURL = 'https://staging.arcnet.com.au/arc-back-end/'
    Vue.prototype.$stripe_apikey = 'pk_test_M3w648L5uJ3WVqju5j6f9buR00YidNfXP1'
} else {
    axios.defaults.baseURL = 'http://localhost:8088/'
    Vue.prototype.$stripe_apikey = 'pk_test_M3w648L5uJ3WVqju5j6f9buR00YidNfXP1'
}


import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import 'font-awesome/css/font-awesome.css' //Font-awesome 图标
import '../src/assets/css/common.scss' //公共样式 有需要自己建
import echarts from 'echarts'

Vue.prototype.$echarts = echarts


import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

// Vue.use(vueQuillEditor);
import VueDND from 'awe-dnd'
Vue.config.productionTip = false
Vue.use(VueDND)
new Vue({
    el: '#app',
    router,
    store,
    components: {
        App,
        router,
    },
    template: '<App/>'
})
