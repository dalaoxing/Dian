import toastComponent from './toast.vue';

const asy = {
    install(Vue) {
        //创建一个vue的子类
        let toastChild = Vue.extend(toastComponent)
            //创建一个子类的实例
        let intoast = new toastChild();
        //把实例挂载到一个元素上边
        intoast.$mount(document.createElement('div'));
        //添加到body里边
        document.body.appendChild(intoast.$el);
        //挂载到vue实例上面
        Vue.prototype.$toast = (msg, tiems = 1500) => { //1、错误信息2、显示时间
            intoast.show = true;
            intoast.msg = msg;
            //时间到了就消失
            setTimeout(() => {
                intoast.show = false;
            }, tiems)
        }
    }
}

export default asy;