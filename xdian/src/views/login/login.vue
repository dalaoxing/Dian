<!--  -->
<template>
    <div>
      <h4>登陆</h4>
      <p><input type="text" v-model="phone" placeholder="请输入手机号"></p>
      <p><input type="text" v-model="pwd"  placeholder="请输入密码"></p>
      <button @click="toLogin">登陆</button>
      <button @click="toRegister">注册</button>
    </div>
</template>

<script>
import Axios from 'axios';
import {Login} from '@/api/api';
export default {
  data () {
    return {
      phone:'',
      pwd:''
    };
  },
  methods:{
    async toLogin(){
      try{
        let res=await Login({phone:this.phone,password:this.pwd});
        // console.log(res);
        if(res.data.code===1){
          window.localStorage.token=res.data.data.token;
          this.$router.push(this.$route.query.redirect)
        }
      }catch(err){
        // console.log(err.response);
        this.$toast(err.response.data.msg)
      }
    },
    toRegister(){
      this.$router.push('/register')
    }
  }
}
</script>
<style lang='scss' scoped>

</style>