<!--  -->
<template>
    <div class="classfiy">
        <div class="left">
          <ul>
            <li v-for="(it,inx) in leftList" :key="inx" @click="toLeft(inx)" :class="{'ave':one===inx}">{{it.title}}</li>
          </ul>
        </div>
        <div class="right">
          <p class="kong" v-if="leftList[one]&&leftList[one].children.length===0">莫看我！我某啥子了</p>
          <ol v-if="leftList[one]&&leftList[one].children.length>0">
            <li v-for="(it,inx) in leftList[one].children" :key="inx" @click="toRight(inx)" :class="{'ave':two===inx}">{{it.name}}</li>
          </ol>
          <div class="right-list"  v-if="leftList[one]&&leftList[one].children.length>0">
            <Item v-for="(it,inx) in rightList" :key="inx" :item="it"/>
            <p class="kong" v-if="rightList.length===0">啥子东西都某代喽</p>
          </div>
        </div>
    </div>
</template>

<script>
import {Classfiy,ClassSelect} from '@/api/api';
import Item from '@/components/item.vue';
export default {
  components:{Item},
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
    this._select();
  },
  methods:{
    toLeft(inx){
      this.one=inx;
      this.two=0;
      if(this.leftList[this.one].children.length>0){
        this._select();
      }
    },
    toRight(inx){
      this.two=inx;
      this._select();
    },
    async _select(){
      let {leftList,one,two} = this;
      let ret=await ClassSelect({type_id:leftList[one].id,category_id:leftList[one].children[two].id});
      this.rightList=ret.data.data;
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
    display: flex;
    .left{
      border-right: 1px solid #ccc;
      font-size: 14px;
      ul{
        width: 100px;
        text-align: center;
        li{
          line-height: 50px;
          width: 80px;
          border-bottom: 1px #ccc solid;
          margin: 0 auto;
        }
        li.ave{
          color: tomato;
          border-bottom: 1px tomato solid;
        }
      }
    }
    .right{
      flex: 1;
      display: flex;
      flex-direction: column;
      .kong{
        text-align: center;
        line-height: 100px;
        color: tomato;
      }
      ol{
        display: flex;
        width: 100%;
        justify-content: space-around;
        li{ 
          text-align: center;
          line-height: 40px;
        }
        .ave{
          color: tomato;
        }
      }
      .right-list{
        width: 100%;
        flex: 1;
        overflow-y: auto;
      }
    }
  }
</style>