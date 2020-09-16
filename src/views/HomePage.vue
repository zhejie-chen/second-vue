<style scoped>
.el-carousel__item:nth-child(4n) {
  background-image: url("../../public/images/bg1.png");
  max-width: 100%;
  max-height: 100%;
}

.el-carousel__item:nth-child(4n+1) {
  background-image: url("../../public/images/bg2.png");
  max-width: 100%;
  max-height: 100%;
}
.el-carousel__item:nth-child(4n+2) {
  background-image: url("../../public/images/bg3.png");
  max-width: 100%;
  max-height: 100%;
}
.el-carousel__item:nth-child(4n+3) {
  background-image: url("../../public/images/bg4.png");
  max-width: 100%;
  max-height: 100%;
}
.el-carousel__item {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.header_logo{
  float: left;
  width: 44px;
  height: 42px;
  margin-left: 8px;
  margin-top: -4px;
  padding-left: 6px;
  padding-top: 5px;
  background-color: #05A081;
  border-radius:6px;
}
.logo_name{
  float: left;
  /*font-family: "Helvetica Neue";*/
  margin-top: -55px;
  margin-left: 55px;
  padding-top: 18px;
  font-size: 20px;
  color: white;
}
.bar {
  height: 60px;
  margin-bottom: 7px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  padding-top: 20px;
}
</style>

<template>
  <div>
    <el-container>

      <el-header  style="padding-top: 10px;background-color: #505458; position: fixed;width: 100%;z-index:1; ">
        <div class="header_logo" >
        <img src="../../public/images/book2.png" style="width: 38px">
        <a class="logo_name" style="font-family: 'Helvetica Neue'">OfCourse</a>
        <el-input style="float: left;width: 600px; margin-top: -40px; margin-left: 200px;"
                  placeholder="搜索课程/教师" v-model="input1" >

          <el-button slot="append" icon="el-icon-search">搜索</el-button>
        </el-input>
      </div>
        <el-button style="float: right; background-color: #05A081;color: white;" @click="gotolink">登录
        </el-button>
      </el-header>

     <!--走马灯-->
      <el-carousel indicator-position="outside" height="500px" width="100%" style="margin-top: 60px;z-index: 0;">
        <el-carousel-item v-for="item in 4" :key="item"></el-carousel-item>
      </el-carousel>

<!--      分隔栏-->
        <el-main style="margin-top: -3px">
          <div class="bar"style="font-family: 'PingFang SC';  text-align: center">
            <i class="el-icon-s-management" style="font-size: xx-large">&nbsp;精品课程</i>
          </div>
        <el-row :gutter="20" style="margin-top: 10px">
          <el-col :span="8"><div class="grid-content bg-purple"><img style="width: 100%" src="https://edu-image.nosdn.127.net/B49698F00EFDAC30A15B1F8DA5DCFB90.jpg?imageView&thumbnail=510y288&quality=100"></div></el-col>
          <el-col :span="8"><div class="grid-content bg-purple"><img style="width: 100%" src="../../public/images/1.png"></div></el-col>
          <el-col :span="8"><div class="grid-content bg-purple"><img style="width: 100%" src="../../public/images/1.png"></div></el-col>
        </el-row>

      </el-main>
      <el-footer>Footer</el-footer>
      <el-backtop target=".page-component__scroll .el-scrollbar__wrap" :bottom="100">
        <div
            style="{
        height: 100%;
        width: 100%;
        background-color: #f2f5f6;
        box-shadow: 0 0 6px rgba(0,0,0, .12);
        text-align: center;
        line-height: 40px;
        color: #1989fa;
      }"
        >
          UP
        </div>
      </el-backtop>

    </el-container>
  </div>
</template>

<script>
export default {
  name: "HomePage",
  methods:{
    gotolink(){
      this.$router.replace('/login')
    }
  },
  data() {
    return {
      input1: '',

    }
  }
}

</script>

