<template>
  <div class="find">
    <top :searchShow="searchShow"></top>
    <el-row>
      <div class="search">
        <div style="margin-top: 100px;">
          <el-input @focus="changeForm" clearable placeholder="请输入地区、小区" v-model="searchInput" @keyup.enter.native="onSearch">
          <el-button @click="onSearch" class="search-btn" slot="append" type="primary">开始找房</el-button>
          </el-input>
          <!-- <el-button class="search-btn" type="primary">开始找房</el-button> -->
        </div>
      </div>
    </el-row>
    <el-row  class="finds" style="margin-left:25px">
        <el-form :model="searchForm" ref="searchForm">
            <el-form-item label="按地区:" prop="dist">
                <el-radio-group v-model="searchForm.dist">
                    <el-radio name="dist" v-for="(item,index) in dists" :key="index" :label="item.dist"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="方式:" prop="flag">
                <el-radio-group v-model="searchForm.flag">
                  <el-radio v-for="(item,index) in flags" :key="index" :label=item name="flag"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="租金:" prop="price">
                <el-radio-group v-model="searchForm.price">
                  <el-radio v-for="(item,index) in prices" :key="index" :label=item name="price"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item>
                <el-button size="mini" type="primary" @click="submitForm('searchForm')">确定</el-button>
                <el-button size="mini" @click="resetForm('searchForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </el-row>
    <div class="scroll">
        <el-row class="houses" type="flex">
            <div class="text2">已为您找到{{tablePage.total}}套房源</div>
            <a href="javascript:void(0)" class="clear" @click="resetForm('searchForm')">清空条件</a>
        </el-row>
        <el-divider content-position="left">优质房源为你而来</el-divider>
        <el-row type="flex" v-for="(house,index) in houses" :key="index">
            <a class="desc" :href="house.href">
                <img class="pic" :src="house.pic" :onerror="defaultImg" alt="image..."/>
                <div class="right">
                    <div class="title">{{house.title}}</div>
                    <div class="recommend">
                      单价：{{(house.reality)}} 元/㎡
                    </div>
                    <div class="detial">
                        <div class="address">{{house.address}}/{{house.floor}}/{{house.size}}㎡/{{house.direction}}/{{house.style}}</div>
                        <div class="tag">
                            <i class="el-icon-paperclip">{{house.tag}}</i>
                        </div>
                        <div class="resource">
                            <i class="el-icon-pie-chart">{{house.resource}}</i>
                            <i class="el-icon-timer">{{house.time}}</i>
                        </div>
                    </div>
                    <div class="price">{{house.price}}元/月</div>
                </div>
            </a>
        </el-row>
        <el-pagination
          class="page"
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="tablePage.currentPage"
          :page-size="tablePage.pageSize"
          :total="tablePage.total"
          layout="prev, pager, next">
        </el-pagination>
    </div>
  </div>
</template>

<script>
import top from '../components/top'
export default {
  name: 'find',
  components: { top },
  data () {
    return {
      defaultImg: 'this.src="' + require('../assets/imgs/erro.png') + '"', // 默认图地址
      searchShow: false,
      tablePage: {
        currentPage: 1,
        pageSize: 30,
        total: 100
      },
      searchInput: this.$route.params.searchInput || '',
      select_city: '0',
      loading: true,
      prices: [[0, 1500], [1500, 3000], [3000, 6000], [6000, 8000], [8000, 100000]],
      flags: ['整租', '合租', '独栋'],
      searchForm: {
        dist: '',
        price: [],
        flag: ''
      },
      dists: [],
      houses: []
      // rates: Math.pow(this.houses.reality, -1)
    }
  },
  methods: {
    clear () {
      this.checkList1 = []
      this.checkList2 = []
    },
    // fatherMethod() {
    //     console.log('测试');
    // },
    onSearch () {
      // this.$refs[this.searchForm].resetFields()
      this.getPageList(this.select_city)
    },
    changeForm () {
      this.$refs.searchForm.resetFields()
    },
    submitForm (formName) {
      this.searchInput = ''
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.getPageList(this.select_city)
          // alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.searchInput = ''
      this.$refs[formName].resetFields()
      this.getPageList(this.select_city)
    },
    getPageList (value) {
      // value = sessionStorage.getItem('current_city')
      this.$axios.post('/api/user/queryTotal', {
        params: {
          // city: sessionStorage.getItem('current_city'),
          city: value,
          search: this.searchInput,
          page: this.tablePage.currentPage,
          pageSize: 30,
          searchForm: this.searchForm
        }
      }).then(res => {
        // console.log(res)
        this.tablePage.total = res.data.data.total
        this.houses = res.data.data.rows
        this.search = ''
      })
    },
    handleSizeChange (val) {
      this.tablePage.pageSize = val
      this.getPageList(this.select_city)
    },
    handleCurrentChange (val) {
      this.tablePage.currentPage = val
      this.getPageList(this.select_city)
    },
    // 获取该城市所有地区
    getDist (value) {
      this.$axios.get('/api/user/queryDist', {
        params: {
          city: value
        }
      }).then(res => {
        this.dists = res.data
        // this.window.reload()
      })
    }
  },
  created () {
    this.select_city = sessionStorage.getItem('current_city')
    // console.log(this.select_city)
    this.getDist(this.select_city)
    this.getPageList(this.select_city)
  }
}
</script>

<style lang="scss" scoped>
// .find {
//     height: 100vh;
//     overflow-y: scroll;
// }
.search {
  .el-input {
      width: 600px;
      // height: 45px;
  }
  .el-input-group--append .el-input__inner,.el-input-group__prepend {
      height: 45px;
  }
}
.finds {
  margin-top: 200px;
    text-align: left;
}
a {
    text-decoration: none;
    color: #000000;
}
a:active {
    color: #99CC66;
}
a:hover {
    color: #99CC66;
}
.dists {
    margin-top: 10px;
    .dist {
        margin-left: 10px;;
    }
}
// .page {
//     margin-left: 400px;
// }
.houses {
    margin: 20px;
    align-items: center;
    .text2 {
        font-size: 20px;
    }
    .clear {
        font-size: 12px;
        margin-left: 400px;
    }
}
.desc {
    display: flex;
    justify-content: space-around;
    margin: 20px;
    margin-top: 0;
    .pic {
      width: 250px;
      height: 182px;
      border-radius: 5px;
    }
.right {
    font-size: 16px;
    text-align: left;
    margin-left: 100px;
    padding: 15px;
    .title {
        font-size: 20px;
    }
    .address {
        margin: 10px 0;
        font-size: 14px;
        font-weight: bold;
        font-family: 'Microsoft YaHei';
        color: #6d6d73;
    }
    .tag {
        font-family: HiraginoSansGB-W3;
        height: 24px;
        width: 160px;
        line-height: 24px;
        font-size: 12px;
        color: #849aae;
        background-color: rgba(132,154,174,.1);
        border-radius: 2px;
        margin-right: 6px;
        padding: 0 11px;
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
    .resource {
       color: #9399a5;
       font-size: 14px;
       line-height: 14px;
       margin: 15px 0;
    }
    .price {
        position: absolute;
        right: 150px;
        top: 35px;
        font-size: 24px;
        font-family: PingFangSC-Semibold;
        color: #fa5741;
        line-height: 22px;
        font-weight: 700;
    }
  }
}
</style>
