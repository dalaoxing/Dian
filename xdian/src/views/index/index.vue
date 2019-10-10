<!--  -->
<template>
    <div class="index">
        <router-view class="rou-two"/>
        <div class="foot">
            <dl v-for="(it,inx) in foot" :key="inx" :class="{ave:inx===index}" @click="toJump(inx)">
                <dt><img :src="inx===index?require('@/img/'+it.ave):require('@/img/'+it.img)"></dt>
                <dd>{{it.title}}</dd>
            </dl>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
        index:0,
        foot:[
            {
                title:'首页',
                path:'/index/home',
                img:'首页.png',
                ave:'首页1.png'
            },{
                title:'分类',
                path:'/index/classfiy',
                img:'分类.png',
                ave:'分类1.png'
            },{
                title:'购物车',
                path:'/index/car',
                img:'购物车.png',
                ave:'购物车1.png'
            },{
                title:'我的',
                path:'/index/my',
                img:'我的.png',
                ave:'我的1.png'
            }
        ]
    };
  },
  methods:{
      toJump(inx){
          this.index=inx;
          this.$router.push(this.foot[inx].path).catch(()=>{});
      }
  }
}

</script>
<style lang='scss' scoped>
    .index{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        .rou-two{
            width: 100%;
            flex: 1;
        }
        .foot{
            width: 100%;
            height: 50px;
            display: flex;
            border-top: 1px solid #eee;
            font-size: 14px;
            align-items: center;
            dl{
                text-align: center;
                flex: 1;
                dt{
                    img{
                        width: 24px;
                    }
                }
            }
            .ave{
                color: tomato;
            }
        }
    }
</style>