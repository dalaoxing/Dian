import Vue from 'vue';
import Router from 'vue-router';
import routes from './router.config';

Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(it => it.meta.request)) {
        if (!window.localStorage.token) {
            next({
                path: '/login',
                query: {
                    redirect: to.fullPath
                }
            });
        } else {
            next();
        }
    } else {
        next();
    }
})

router.afterEach((to, from) => {
    if (to.meta.title) {
        document.title = to.meta.title;
    } else {
        document.title = '1705A';
    }
})

export default router;