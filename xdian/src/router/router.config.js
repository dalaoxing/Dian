export default [{
    path: '/index',
    name: 'index',
    meta: {
        request: false,
        title: '首页'
    },
    children: [{
        path: 'home',
        name: 'home',
        meta: {
            request: false,
            title: '首页'
        },
        component: () =>
            import ('@/views/index/home/home.vue')
    }, {
        path: 'classfiy',
        name: 'classfiy',
        meta: {
            request: false,
            title: '分类'
        },
        component: () =>
            import ('@/views/index/classfiy/classfiy.vue')
    }, {
        path: 'car',
        name: 'car',
        meta: {
            request: true,
            title: '购物车'
        },
        component: () =>
            import ('@/views/index/car/car.vue')
    }, {
        path: 'my',
        name: 'my',
        meta: {
            request: true,
            title: '我的'
        },
        component: () =>
            import ('@/views/index/my/my.vue')
    }],
    component: () =>
        import ('@/views/index/index.vue')
}, {
    path: '/login',
    name: 'login',
    meta: {
        request: false,
        title: '登陆'
    },
    component: () =>
        import ('@/views/login/login.vue')
}, {
    path: '/register',
    name: 'register',
    meta: {
        request: false,
        title: '注册'
    },
    component: () =>
        import ('@/views/register/register.vue')
}, {
    path: '/details',
    name: 'details',
    meta: {
        request: false,
        title: '详情'
    },
    component: () =>
        import ('@/views/details/details.vue')
}, {
    path: '/',
    redirect: '/index/home'
}]