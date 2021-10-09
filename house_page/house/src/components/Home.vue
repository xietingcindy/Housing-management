<template>
  <div class="home">
    <top :searchShow="searchShow"></top>
    <el-row class="icon" type="flex" justify="center">
      <el-col class="left" :span="12" style="height:150px;width:200px;margin:0 auto">
        <router-link to="/watchHouse">
          <div class="icon-left"></div>
          <div class="text1">城市租房全览</div>
          <div class="text2">真实数据结果分析，让您选择便捷</div>
        </router-link>
      </el-col>
      <el-col class="right" :span="12" style="height:150px;width:200px;margin:0 auto">
        <router-link to="/findHouse">
          <div class="icon-right"></div>
          <div class="text1">找租房</div>
          <div class="text2">海量真实房源，让您所见即真</div>
        </router-link>
      </el-col>
    </el-row>
    <el-row>
      <div class="bg2">
        <div class="word">
          <p class="p1">真实数据</p>
          <p class="p1 p2">海量房源</p>
          <p class="p3">集租房，城市概览于一体，随时随地任性找房。海量数据让您感受贴心漫漫找房路，为您省一点心，从此租房不再愁！</p>
        </div>
      </div>
    </el-row>
    <el-row class="tag" type="flex" justify="space-between">
        <div style="width:300px;font-size:25px">为您精选好房</div>
        <router-link to="/findHouse" style="color: #394043;">查看更多{{value}}房源>></router-link>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6" class="house" v-for="(house,index) in houses" :key="index">
        <a :href="house.href">
          <img class="pic" :src="house.pic" :onerror="defaultImg" alt="image..."/>
          <div class="address">{{house.address}}</div>
          <div class="recommend">
            单价：{{(house.reality)}} 元/㎡
            <!-- <el-rate disabled show-text max=160 v-model="house.recommend"
             low-threshold=0.08
             high-threshold=0.04
             :colors="['#FF9900', '#F7BA2A', '#99A9BF']"
             :texts="['极力推荐','推荐','一般推荐','一般','不太推荐']"
             ></el-rate> -->
          </div>
          <div class="detial">
            <div class="style">{{house.style}}·{{house.size}}㎡</div>
            <!-- <div class="size">·{{house.size}}㎡</div> -->
            <div class="price">{{house.price}}元/月</div>
          </div>
        </a>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import top from '../components/top'
// import eventBus from '../eventBus'
export default {
  name: 'home',
  components: { top },
  computed: {},
  data () {
    return {
      searchShow: true,
      select_city: '',
      // value: '0',
      msg: 'Welcome to Houses!',
      defaultImg: 'this.src="' + require('../assets/imgs/erro.png') + '"', // 默认图地址
      houses: []
    }
  },
  methods: {
    getList: function (value) {
      this.$axios.get('/api/user/queryAll', {
        params: {
          city: value
        }
      }).then(res => {
        this.houses = res.data
        // this.houses = result
      })
    }
  },
  created () {
    this.select_city = sessionStorage.getItem('current_city') || '0'
    this.getList(this.select_city)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
a {
  text-decoration: none;
  color: #000000;
}
.home {
  .icon {
    margin-top: 200px;
  }
  .icon-left {
    display: inline-block;
    margin: 0 auto;
    background: url(../assets/icons/look.png) no-repeat;
    background-size: 100%;
    height: 70px;
    width: 70px;
  }
  .icon-right {
    display: inline-block;
    margin: 0 auto;
    background: url(../assets/icons/find.png) no-repeat;
    background-size: 100%;
    height: 70px;
    width: 70px;
  }
  .icon-left:hover,.icon-right{
    cursor: pointer;
    animation: move 1.5s infinite;
    -webkit-animation: move 1.5s infinite;
    // -webkit-transform: translate(0,-10px);
    // -moz-transform: translate(0,-10px);
    // -ms-transform: translate(0,-10px);
    // -o-transform: translate(0,-10px);
    // transform: translate(0,-10px);
  }
  @keyframes move {
    0%{ transform: translate(0px, 0px); }
    50%{ transform: translate(0px, -10px); }
    100%{ transform: translate(0px, 0px); }
  }
  .text2 {
    font-size: 12px;
    color: #b0b3b4;
  }
  .bg2 {
    background: url(../assets/imgs/home.jpg) no-repeat;
    background-size: 100%;
    height: 400px;
    width: 100%;
    .word{
      position: relative;
      top: 80px;
      line-height: 30px;
      // text-align: left;
      .p1 {
        font-size: 50px;
    }
      .p2 {
        font-size: 36px;
      }
    }
  }
  .tag {
    align-items: center;
  }
  .recommend {
      display: inline-block;
      font-family: HiraginoSansGB-W3;
      height: 24px;
      line-height: 24px;
      font-size: 12px;
      text-align: center;
      color: #99CC66;
      // background-color: rgba(132,154,174,.1);
      border-radius: 2px;
    }
  .detial {
    display: flex;
    justify-content: space-around;
    .style {
      color:#999;
      // color:#99A9BF, #F7BA2A, #FF9900,
      font-size: 12px;
    }
    .price{
      color: #F56C6C;
      font-weight: 700;
    }
  }
}
</style>
