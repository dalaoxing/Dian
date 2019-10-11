<!--  -->
<template>
    <div class="classfiy">
        <div class="left">
          <ul>
            <li v-for="(it,inx) in leftList" :key="inx" @click="toLeft(inx)" :class="{'ave':one===inx}">{{it.title}}</li>
          </ul>
        </div>
        <div class="right">
          <ol v-if="leftList[one]&&leftList[one].children.length>0">
            <li v-for="(it,inx) in leftList[one].children" :key="inx" @click="toRight(inx)" :class="{'ave':one===inx}">{{it.name}}</li>
          </ol>
        </div>
    </div>
</template>

<script>
import {Classfiy} from '@/api/api';
export default {
  name:'classfiy',
  data () {
    return {
      leftList:[],
      rightList:[],
      one:0,
      two:0
    };
  },
  async created(){
    let res=await Classfiy();
    this.leftList=res.data.data;
  },
  methods:{
    toLeft(inx){
      this.one=inx;
    },
    toRight(inx){
      this.two=inx;
    }
  }
}

</script>
<style lang='scss' scoped>
  li{
    list-style: none;
  }
  .classfiy{
    width: 100%;
    height: 100%;
    .left{

      ul{
        width: 150px;
        text-align: center;
        li{
          line-height: 50px;
          width: 100px;
          border-bottom: 1px #999 solid;
          margin: 0 auto;
        }
        li.ave{
          color: tomato;
          border-bottom: 1px tomato solid;
        }
      }
    }
  }
</style>