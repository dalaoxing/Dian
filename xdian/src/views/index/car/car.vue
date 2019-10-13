<!--  -->
<template>
    <div>
        购物车
    </div>
</template>

<script>
import {getUserInfo,getCar} from '@/api/api';
export default {
  data () {
    return {

    };
  },
  async created(){
    try{
        let res=await getUserInfo();
        let add=await getCar({user_id:res.data.data.uid})
        console.log(add);
        
    }catch(err){
        console.log(err.response);
    }
  }
}

</script>
<style lang='scss' scoped>

</style>