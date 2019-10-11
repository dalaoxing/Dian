import Vue from 'vue'
import App from './App.vue'
import router from '@/router/router';
import toast from '@/toast/toast';
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload, {
    preLoad: 1.3,
    loading: require('@/img/loading.gif'),
    attempt: 1
})

Vue.config.productionTip = false;
Vue.use(toast);

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')