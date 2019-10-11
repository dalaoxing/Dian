<!--  -->
<template>
    <div>
      <h4>注册</h4>
      <p><input type="text" v-model="phone" placeholder="请输入手机号"></p>
      <p><input type="text" v-model="pwd"  placeholder="请输入密码"></p>
      <button @click="toRegister">注册</button>
    </div>
</template>

<script>
import Axios from 'axios';
import {Register} from '@/api/api';
export default {
  data () {
    return {
      phone:'',
      pwd:''
    };
  },
  methods:{
    async toRegister(){
      try{
        let res=await Register({phone:this.phone,password:this.pwd})
        // console.log(res);
        if(res.data.code===1){
          this.$router.go(-1)
        }
      }catch(err){
        // console.log(err.response);
        let msg=err.response.data.msg;
        this.$toast(msg.message?msg.message:msg)
      }
    }
  }
}
</script>
<style lang='scss' scoped>

</style>