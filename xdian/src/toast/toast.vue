<!--  -->
<template>
    <div>
        <transition name="fade">
            <p v-if="show" class="toast">{{msg}}</p>
        </transition>
    </div>
</template>

<script>
export default {
  data () {
    return {
        msg:'',
        show: true
    };
  }
}

</script>
<style lang='scss' scoped>
    .toast{
        position: fixed;
        top:0;
        bottom: 0;
        left: 0;
        right: 0;
        width: 80%;
        margin: auto;
        height: 40px;
        text-align: center;
    }
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }
</style>