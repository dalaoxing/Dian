<!--  -->
<template>
    <dl>
        <dt>
            <img v-lazy="item.cover">
        </dt>
        <dd>
            <h4>{{item.name}}</h4>
            <span>累计{{(item.volume/10000).toFixed(1)}}万份</span>
            <p>
                <b>{{"￥"+item.price}}</b>
                <i><svg t="1570781693268" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1923" width="24" height="24"><path d="M384 768a64 64 0 1 0 0.032 128.032A64 64 0 0 0 384 768M704 768a64 64 0 1 0 0.032 128.032A64 64 0 0 0 704 768M312.672 512l-51.456-192h560.96l-51.456 192H312.672z m583.36-224a32 32 0 0 0-32-32H244.064L209.824 128H96v64h64.672l145.728 544H800v-64H355.52l-25.664-96H819.84l12.16-45.376 64-238.88-0.768-0.192C895.424 290.336 896 289.28 896 288z" fill="#fff" p-id="1924"></path></svg></i>
            </p>
        </dd>
    </dl>
</template>

<script>
export default {
    props:{
        item:{
            type:Object,
            default:{}
        }
    },
    data () {
        return {

        };
    }
}

</script>
<style lang='scss' scoped>
    dl{
        box-sizing: border-box;
        padding: 0 15px;
        display: flex;
        margin: 15px 0;
        dt{
            margin-right: 15px;
            img{
                width: 120px;
            }
        }
        dd{
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            h4{
                line-height: 24px;
            }
            span{
                font-size: 14px;
                color: #999;
            }
            p{
                display: flex;
                width: 210px;
                justify-content: space-between;
                align-items: center;
                b{
                    font-size: 18px;
                    color: tomato;
                }
                i{
                    font-style: normal;
                    display: inline-block;
                    width: 40px;
                    height: 40px;
                    background: tomato;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 20px;
                }
            }
        }
    }
</style>