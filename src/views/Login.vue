<template>
     <div class="bg">
      <el-container style="margin-bottom: 40px;">
        <el-header  style="padding-top: 10px;background-color: #505458; position: fixed;width: 100%;z-index:1; ">
          <div class="header_logo" >
            <img src="../../public/images/book2.png" style="width: 38px">
            <a class="logo_name" style="font-family: 'Helvetica Neue'">OfCourse</a>

          </div>
          <el-button style="float: right; background-color: #05A081;color: white;" @click="gotolink">返回
          </el-button>
        </el-header>
        <el-main style="color: #333;text-align: center;line-height: 160px;">
      <el-form :model="loginForm"  :rules="rules" ref="userForm" class="login">
            <h3 class="header-title">Welcome to OfCourse</h3>
            <el-form-item prop="username">
                <el-input type="text" v-model="loginForm.username" placeholder="请输入用户名" autocomplete="off"><template slot="prepend">用户：</template></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="password" v-model="loginForm.password" autocomplete="off" placeholder="请输入密码" @keydown.enter.native="submit"><template slot="prepend">密码：</template></el-input>

            </el-form-item>
            <el-form-itema class="btn">
                <el-button type="primary" style="width: 100% ;background-color: #05A081;" @click="submit">登录</el-button>

            </el-form-itema>
        </el-form>
        </el-main>
        </el-container>
     </div>
</template>

<script>
    import {postKeyValueRequest} from "../config/interceptor";

    export default {
        name: "Login",
        data () {
            return {
                rules: {
                    username: [{ required: true, message: '请输入用户名', trigger: 'blur' },],
                    password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
                },
                loginForm: {
                    username: "admin",
                    password: "123456"
                }
            }
        },
        methods: {
            submit() {
                this.$refs.userForm.validate((valid) => {
                    if (valid) {
                        postKeyValueRequest("/doLogin",this.loginForm).then( (res)=> {
                            if(res.data.obj !=null) {
                                window.sessionStorage.setItem("user",JSON.stringify(res.data.obj))
                                let path = this.$route.query.redirect;
                                this.$router.replace((path === '/'||path === undefined)?"/home":path)
                            }
                        })
                    } else {
                            this.$message({
                                message: '请输入所有字段',
                                type: 'error'
                            });
                            return false
                    }
                });
            },
        }
    }
</script>

<style >

    .header-title{
     font-size: 30px;
      text-align: center;
        color: #ffffff;
    }

    .bg{
      background: url('../../public/images/login-bg.jpg');
    }
    .login {

        width: 350px;
        border-radius: 15px;
        background-clip: padding-box;
       background-color: transparent;
        margin: 150px auto;
        padding: 35px 35px 15px 35px;
        border: 1px solid #eaeaea;
        /*水平位置 垂直位置 阴影大小 阴影颜色*/
        box-shadow: 0 0 25px #cac6c6;
    }

    .btn{
      background-color: darkolivegreen;
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
/*.el-header, .el-footer {*/
/*  background-color: #B3C0D1;*/
/*  color: #333;*/
/*  text-align: center;*/
/*  line-height: 60px;*/
/*}*/



/*.el-main {*/

/*  color: #333;*/
/*  text-align: center;*/
/*  line-height: 160px;*/
/*}*/




</style>