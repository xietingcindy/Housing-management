<template>
  <div id="app">
    <div class="back">
    </div>
    <router-view/>
    <foot/>
    <el-backtop target="#app" :bottom="100">up!</el-backtop>
  </div>
</template>

<script>
import foot from './components/footer'
export default {
  name: 'App',
  components: { foot }
}
</script>

<style lang="scss">
body {
  height: 100vh;
  overflow-y: hidden;
  min-width:1080px;
  // max-width: 100%;
}
#app {
  height: 100vh;
  overflow-y: scroll;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000000;
  // margin-top: 60px;
}
.back {
  background: url(./assets/imgs/home1.jpg) no-repeat;
  // background-image: linear-gradient(90deg,#000 19%,rgba(0,0,0,.25));
  background-size: 100%;
  height: 420px;
  width:100%;
}
// .top {
//   margin-top: 20px;
// }
</style>
