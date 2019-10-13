<!--  -->
<template>
    <div class="login">
      <h4>手机号登录</h4>
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
        console.log(123);
        
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
  .login{
    box-sizing: border-box;
    padding: 0 40px;
    h4{
      font-size: 36px;
      font-weight: 400;
      line-height: 100px;
    }
    p{
      border-bottom: 1px solid #ccc;
      input{
        border: 0;
        outline: none;
        line-height: 48px;
        font-size: 18px;
      }
    }
    button{
      width: 100%;
      line-height: 40px;
      border: 0;
      outline: none;
      margin-top: 30px;
      background: tomato;
      color: #fff;
      font-size: 18px;
      border-radius: 20px;
    }
  }
  
</style>