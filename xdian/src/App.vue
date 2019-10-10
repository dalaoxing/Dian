<template>
  <div id="app">
    <router-view class="rou-one"/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
*{
  margin: 0;
  padding: 0;
}
html,body,#app,.rou-one{
  width: 100%;
  height: 100%;
}
</style>
