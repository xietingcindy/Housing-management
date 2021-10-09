<template>
  <div class="watch">
    <top :searchShow="searchShow"></top>
    <div class="icon">
      <el-row><div class="title">城市租房全览</div></el-row>
      <el-row class="head" type="flex">
        <div class="reality" id="reality" style="width:1000px;height:500px;margin:0 auto"></div>
      </el-row>
      <el-row class="center" type="flex" justify="space-between">
        <div class="floor" id="floor"></div>
        <div class="style" id="style"></div>
      </el-row>
      <el-row class="center" type="flex">
        <div class="dist" id="dist" style="width:1000px;height:500px;margin:0 auto"></div>
      </el-row>
    </div>
  </div>
</template>
<script>
import top from '../components/top'
export default {
  components: { top },
  data () {
    return {
      searchShow: true,
      echarts1_data: [], // 返回参数1
      echarts2_data: [],
      echarts3_data: [],
      data1x: [], // 解析成echarts1的两个data
      data1y: [],
      data2x: [],
      data2y: [],
      data3: [],
      data4y: []
    }
  },
  methods: {
    // 请求地区数量和房价
    getEcharts () {
      this.$axios.get('/api/user/queryEcharts', {
        params: {
          city: sessionStorage.getItem('current_city')
        }
      }).then(res => {
        this.echarts1_data = res.data
        this.echarts1_data.forEach(element => {
          this.data1x.push(element.dist)
          this.data1y.push(element.perprice)
          this.data4y.push(element.counts)
        })
        // console.log(this.data1x)
        this.myEcharts1()
        this.myEcharts4()
      })
    },
    // 请求楼层
    getFloor () {
      this.$axios.get('/api/user/queryFloor', {
        params: {
          city: sessionStorage.getItem('current_city')
        }
      }).then(res => {
        this.echarts2_data = res.data
        this.echarts2_data.forEach(element => {
          this.data2x.push(element.floor)
          this.data2y.push(element.counts)
        })
        // console.log(this.data1x)
        this.myEcharts2()
      })
    },
    // 请求户型
    getStyle () {
      this.$axios.get('/api/user/queryStyle', {
        params: {
          city: sessionStorage.getItem('current_city')
        }
      }).then(res => {
        this.echarts3_data = res.data
        this.myEcharts3()
        // this.myEcharts4()
      })
    },
    myEcharts1 () {
      let myChart1 = this.$echarts.init(document.getElementById('reality'))
      let option = {
        title: {
          text: '地区每平米单价'
        },
        tooltip: {},
        legend: {
          data: [ '地区每平米单价' ]
        },
        xAxis: {
          name: '地区',
          axisLabel: {
            interval: 0,
            rotate: 0
          },
          data: this.data1x
        },
        yAxis: { name: '元/㎡' },
        series: [{
          name: '地区每平米单价',
          type: 'bar',
          data: this.data1y
        }]
      }
      myChart1.setOption(option)
    },
    myEcharts2 () {
      let myChart2 = this.$echarts.init(document.getElementById('floor'))
      let option = {
        title: {
          text: '楼层数量'
        },
        tooltip: {},
        legend: {
          data: [ '楼层数量' ]
        },
        xAxis: {
          name: '/层',
          axisLabel: {
            interval: 0,
            rotate: 35
          },
          data: this.data2x
        },
        yAxis: {
          name: '数量/套'
        },
        series: [{
          name: '楼层数量',
          type: 'bar',
          data: this.data2y
        }]
      }
      myChart2.setOption(option)
    },
    myEcharts3 () {
      let myChart3 = this.$echarts.init(document.getElementById('style'))
      let option = {
        title: {
          text: '户型分布'
        },
        tooltip: {},
        legend: {
          data: [ '户型分布' ]
        },
        series: [{
          // name: this.data3,
          type: 'pie',
          radius: '55%',
          // roseType: 'angle',
          data: this.echarts3_data
        }]
      }
      myChart3.setOption(option)
    },
    myEcharts4 () {
      let myChart4 = this.$echarts.init(document.getElementById('dist'))
      let option = {
        title: {
          text: '地区房源数量'
        },
        tooltip: {},
        legend: {
          data: [ '地区房源数量' ]
        },
        xAxis: {
          name: '地区房源数量',
          axisLabel: {
            interval: 0,
            rotate: 0
          },
          data: this.data1x
        },
        yAxis: { name: '数量/套' },
        series: [{
          name: '地区房源数量',
          type: 'bar',
          data: this.data4y
        }]
      }
      myChart4.setOption(option)
    }
  },
  mounted () {
    this.getEcharts()
    this.getFloor()
    this.getStyle()
    // this.myEcharts2()
    // this.myEcharts3()
  },
  created () {}
}
</script>

<style lang="scss" scoped>
.icon {
  margin-top: 200px;
}
.title {
  font-size: 25px;
}
.reality {
  margin: 30px auto;
}
.center {
  .floor {
    width: 600px;
    height: 500px;
  }
  .style {
    width: 600px;
    height: 500px;
  }
}
</style>
