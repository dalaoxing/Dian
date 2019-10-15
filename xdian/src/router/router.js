import Vue from 'vue';
import Router from 'vue-router';
import routes from './router.config'; //路由表

Vue.use(Router);

const router = new Router({
    mode: 'history', //路由方式
    routes
})

//前置全局守卫
router.beforeEach((to, from, next) => {
    //循环每一个路由信息的一级和二级路由来确定自己写的自定义路由信息是否需要守卫
    if (to.matched.some(it => it.meta.request)) {
        //如果需要守卫查看是否登陆了
        if (!window.localStorage.token) {
            //如果没有登录那么就跳转登陆页面
            next({
                path: '/login',
                query: {
                    //确定登陆成功后知道是跳转那个路由才触发了守卫
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

//全局后置守卫
router.afterEach((to, from) => {
    //如果路由的自定义信息写了title那么就渲染到document.title
    if (to.meta.title) {
        document.title = to.meta.title;
    } else {
        //否则就默认名称
        document.title = '1705A';
    }
})

export default router;