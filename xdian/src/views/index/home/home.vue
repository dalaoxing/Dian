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
      //获取首页数据如果没有传页码跟每页的条数那么
      let res = await homeList({pageid:this.pageid,limit:this.limit});
      //把之前的数据跟新请求到的数据合并
      this.shopList=[...this.shopList,...res.data.data];
      //如果请求到了数据比默认的数据条数多那么就不需要再请求数据了
      if(res.data.data.length<this.limit){
        this.show=true;
      }
      this.iscroll.refresh();//从新计算整个DOM结构
      this.iscroll.finishPullUp(); //上拉加载完成之后要调用一下此方法
      this.iscroll.finishPullDown(); //下拉刷新完成之后要调用一下此方法
    },
    _scroll(){
      this.iscroll=new BScroll('.home',{
        click:true,
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
        //上拉成功之后执行
        if(!this.show){
          //页码自增之后从新请求信数据
          this.pageid++;
          this.upData();
        }
      })
      this.iscroll.on('pullingDown',()=>{
        //下拉成功后把需要的数据全部都恢复为默认
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