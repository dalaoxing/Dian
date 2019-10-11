<!--  -->
<template>
    <div class="home">
      <div class="home-box">
        <div class="swiper-container banner">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="it in bannerList" :key="it.id">
              <img :src="it.image">
            </div>
          </div>
        </div>
        <div class="list">
          <Item v-for="(it,inx) in shopList" :key="inx" :item="it"/>
          <div class="foots" v-if="show">什么都木有了！</div>
        </div>
      </div>
    </div>
</template>

<script>
import Swiper from 'swiper';
import 'swiper/css/swiper.min.css';
import BScroll from 'better-scroll';
import {Banner,homeList} from '@/api/api';
import Item from '@/components/item.vue';
export default {
  components:{
    Item
  },
  name:'home',
  data () {
    return {
      bannerList:[],
      shopList:[],
      pageid:0,
      limit:10,
      show:false
    };
  },
  methods:{
    async upData(pageid,limit){
      let res = await homeList({pageid:this.pageid,limit:this.limit})
      this.shopList=[...this.shopList,...res.data.data];
      if(res.data.data.length<10){
        this.show=true;
      }
      this.iscroll.refresh();
      this.iscroll.finishPullUp(); //上拉加载完成之后要调用一下此方法
      this.iscroll.finishPullDown(); //下拉刷新完成之后要调用一下此方法
    },
    _scroll(){
      this.iscroll=new BScroll('.home',{
        pullDownRefresh: {
          //下拉刷新
          threshold: 50
        },
        pullUpLoad: {
          //上拉加载
          threshold: -50
        }
      });
      this.iscroll.on('pullingUp',()=>{
        if(!this.show){
          this.pageid++;
          this.upData();
        }
      })
      this.iscroll.on('pullingDown',()=>{
        this.shopList=[];
        this.pageid=0;
        this.show=false;
        this.upData();
        // window.location.reload()
      })
    }
  },
  created(){
    //请求banner图
    Banner().then(res=>{
      this.bannerList=res.data.data;
      this.$nextTick(()=>{
        //实例化swiper
        new Swiper('.banner',{
          loop:true
        });
        //请求首页第一次渲染的列表
        this.upData();
        //实例化下拉上拉    
        this._scroll();
      })
    })
  }
}
</script>
<style lang='scss' scoped>
  .home{
    overflow-y: hidden;
    .home-box{
      width: 100%;
      .swiper-slide{
        img{
          width: 100%;
          height: 150px;
        }     
      }
      .foots{
        text-align: center;
        line-height: 50px;
        color: tomato;
      }
    }
  }
</style>