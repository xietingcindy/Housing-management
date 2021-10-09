<template>
<!-- 顶部导航，找房组件 -->
  <div class="top">
    <el-row class="nav">
        <el-col :span="12">
          <el-button @click="goHome">
            <el-row type="flex" justify="center">
              <div class="logo"></div>
              <div class="text">小贝壳优质房源推荐</div>
            </el-row>
          </el-button>
        </el-col>
        <el-col :span="12">
          <el-row class="city" type="flex" justify="center">
            <div class="text1">
                <i class="el-icon-location-information"></i>
                当前城市：
            </div>
              <el-select v-model="city" clearable placeholder="请选择城市" @change="selectChanged">
                <el-option
                    v-for="item in cities"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    <span style="float: left">{{ item.label }}</span>
                    <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
                </el-option>
             </el-select>
          </el-row>
        </el-col>
    </el-row>
    <el-row>
      <div class="search" v-if="searchShow == true">
        <div style="margin-top: 100px;">
          <el-input @keyup.enter.native="onSearch1" clearable placeholder="请输入地区、小区" v-model="searchInput">
          <el-button @click="onSearch1" class="search-btn" slot="append" type="primary">开始找房</el-button>
          </el-input>
        </div>
      </div>
    </el-row>
  </div>
</template>

<script>
export default {
  props: {
    searchShow: Boolean
  },
  data () {
    return {
      searchInput: '',
      activeIndex: '1',
      cities: [{
        value: '0',
        label: '北京'
      }, {
        value: '1',
        label: '上海'
      }, {
        value: '2',
        label: '深圳'
      }],
      city: sessionStorage.getItem('current_city') || '北京'
    }
  },
  methods: {
    goHome () {
      this.$router.replace('/')
    },
    selectChanged (value) {
      sessionStorage.setItem('current_city', value)
      // if (this.$parent.getList()) {
      location.reload()
      this.$parent.getList(value) || this.$parent.getDist(value)
    },
    onSearch1 () {
      // this.searchShow = false
      this.$router.push({
        name: 'find',
        params: {
          searchInput: this.searchInput
          // searchShow: false
        }
      })
    }
  },
  created () {
    // sessionStorage.setItem('current_city', '0')
  }
}
</script>

<style lang="scss" scoped>
.top {
    position: relative;
    top: 20px;
    margin-top: -400px;
    .logo {
        background:url(../assets/icons/logo1.png);
        background-size: 100%;
        height: 40px;
        width: 40px;
    }
    .text {
        color: #666666;
        font-size: 36px;
    }
    .text1 {
        color:#fff;
        font-size: 25px;
    }
    .search {
        .el-input {
            width: 600px;
            // height: 45px;
        }
        .el-input-group--append .el-input__inner,.el-input-group__prepend {
            height: 45px;
        }
    }
}
</style>
