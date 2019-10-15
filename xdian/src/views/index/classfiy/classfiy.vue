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
      leftList:[],//左边列表数据
      rightList:[],//右边列表数据
      one:0,//一级列表下标
      two:0//二级列表下标
    };
  },
  async created(){
    //获取左边列表的数据
    let res=await Classfiy();
    //赋值给相应的数据
    this.leftList=res.data.data;
    //调用方法渲染出右边列表数据
    this._select();
  },
  methods:{
    //左边列表的点击事件
    toLeft(inx){
      //让一级下标等于点击的下标二级下标归零
      this.one=inx;
      this.two=0;
      //如果点击的一级列表的二级列表长度不等于零就渲染右边列表的数据
      if(this.leftList[this.one].children.length>0){
        this._select();
      }
    },
    toRight(inx){
      //右边列表的点击事件
      this.two=inx;
      //二级列表渲染
      this._select();
    },
    async _select(){
      //先把需要的变量结构出来
      let {leftList,one,two} = this;
      //调用筛选的请求端口把一级列表的ID和二级列表的ID都传过去返回的就是需要渲染到右边的数据
      let ret=await ClassSelect({type_id:leftList[one].id,category_id:leftList[one].children[two].id});
      //把数据赋值给相应的变量去渲染
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