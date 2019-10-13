<!--  -->
<template>
    <div class="details">
        <div v-html="this.$route.query.html"></div>
    </div>
</template>

<script>
export default {
  data () {
    return {

    };
  }
}

</script>
<style lang='scss'>
    .details{
        width: 100%;
        img{
            width: 100%;
        }
    }
</style>