<template>
  <div class="footer">
      <el-row class="footer">
        <div class="description">小贝壳优质房源推荐系统，你值得拥有！</div>
        <div class="copy">
            <p>copyright©cindy2020在线房源识别系统</p>
            <p>联系电话：15809253703 邮箱：1246227958@qq.com</p>
        </div>
      <!-- <div class="copy"></div> -->
    </el-row>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.footer {
    // position: absolute;
    // bottom: 0;
    background-image:url(../assets/imgs/home3.jpg);
    background-size: 100%;
    margin-top: 30px;
    width: 100%;
    height: 350px;
    .description {
      margin-top: 30px;
      // text-align: left;
      font-size: 40px;
      color: #fff;
      font-weight: bold;
    }
    .copy {
      position: relative;
      top: 100px;
    }
  }
</style>
