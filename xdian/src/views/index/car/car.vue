<!--  -->
<template>
  <div class="car">
    <h4>购物车</h4>
    <div class="carList">
      <div class="item" v-for="(it,inx) in dataList" :key="inx">
        <span @click="toFlag(it.id)" :class="{ave:it.flag}"></span>
        <Item :item="it.shopdata">
          <template>
            <span @click.stop="delCount(it)">-</span>
            <span>{{it.count}}</span>
            <span @click.stop="addCount(it)">+</span>
          </template>
        </Item>
      </div>
    </div>
    <div class="check">
      <span :class="{ave:checkAll}" @click="toCheck"></span>
      <b>全选</b>
      <p>总价：<b>{{countAll}}</b></p>
    </div>
  </div>
</template>

<script>
import { getUserInfo, getCar ,removeCar,addCar,removeShop} from "@/api/api";
import Item from "@/components/item.vue";
export default {
  components: {
    Item
  },
  data() {
    return {
      dataList: [],
      checkAll:false,
      countAll:0
    };
  },
  async created() {
    try {
      //获取用户信息
      let res = await getUserInfo();
      //获取购物车数据
      let add = await getCar({ user_id: res.data.data.uid });
      //给每一条数据都添加一个自定义属性来确定是否选中
      this.dataList = add.data.data.map(it => {
        it.flag = false;
        return it;
      });
    } catch (err) {
      //错误的反应
      console.log(err.response);
    }
  },
  methods: {
    //每个商品的选中与否
    toFlag(id) {
      //循环找到点击的商品的下标
      let inx = this.dataList.findIndex(it => {
        return it.id === id;
      });
      //把当前商品下标的相应属性取反
      this.dataList[inx].flag = !this.dataList[inx].flag;
      //如果所有商品都是选中那么全选按钮也选中
      this.checkAll=this.dataList.every(it=>it.flag);
      //计算出来所有选中的商品的总价
      this.countAll=this.getCount();
    },
    toCheck(){
      //全选按钮的选中与否
      this.checkAll=!this.checkAll;
      //让每个商品的选中都与全选按钮一样
      this.dataList.forEach(it=>{
        it.flag=this.checkAll;
      })
      //计算出来所有选中的商品的总价
      this.countAll=this.getCount();
    },
    addCount(it){
      //自增当前的总量
      it.count++;
      //把用户ID和商品ID传过去增加当前商品的数量
      addCar({user_id:it.userid,shop_id:it.shopid});
      //从新计算总价
      this.countAll=this.getCount();
    },
    delCount(it){
      if(it.count>1){
        //如果当前商品的数量大于1那么就自减
        it.count--;
        //把用户ID和商品ID传过去减少当前商品的数量
        removeCar({user_id:it.userid,shop_id:it.shopid});
      }else{
        //如果当前商品的数量小于等于了1那么就询问访客是否要删除此项商品
        let flag=window.confirm('确定要删除此商品吗？');
        if(flag){
          //如果确定要删除那么就调用删除的接口把相应的用户ID和商品ID传过去把此项商品删除
          removeShop({user_id:it.userid,shop_id:it.shopid});
          //循环如果点击的当前商品和总数据的当前某一项相等了就剔除出去来达到删除商品的作用
          this.dataList=this.dataList.filter(item=>it!==item);
        }
      }
      //从新计算总价
      this.countAll=this.getCount();
    },
    getCount(){
      //根据循环的结果来计算总量 1、默认值（不写就是undefined）2、当前项
      return this.dataList.reduce((pre,cer)=>{
        return pre+(cer.flag?cer.shopdata.price*cer.count:0)
      },0)
    }
  }
};
</script>
<style lang='scss' scoped>
  .car{
    display: flex;
    flex-direction: column;
    h4 {
      font-size: 18px;
      color: tomato;
      text-align: center;
      line-height: 40px;
    }
    .carList{
      flex: 1;
      overflow: auto;
      .item {
        width: 100%;
        display: flex;
        align-items: center;
        padding-left: 20px;
        box-sizing: border-box;
        > span {
          display: inline-block;
          width: 20px;
          height: 20px;
          border-radius: 10px;
          border: 1px solid #999;
        }
        > span.ave {
          border: 1px solid tomato;
          background: tomato;
        }
      }
    }
    .check{
      padding-left: 20px;
      box-sizing: border-box;
      height: 40px;
      display: flex;
      align-items: center;
      > span {
        display: inline-block;
        width: 20px;
        height: 20px;
        border-radius: 10px;
        border: 1px solid #999;
      }
      > span.ave {
        border: 1px solid tomato;
        background: tomato;
      }
      b{
        margin: 0 20px;
        color: tomato;
      }
    }
  }
</style>