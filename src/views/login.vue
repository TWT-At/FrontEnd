<template>
    <el-container>
        <el-header height="142px">
            <img class="logo" height="62" width="72" :src="logo">
            <img class="at" height="36" width="46" :src="at">
        </el-header>
        <el-main>
            <div class="login-main" v-loading="loading">
                <div class="form-container">
                    <el-form :hide-required-asterisk="true" class="login-form" ref="form" :model="form" :rules="rules">
                        <el-form-item label="用户名" prop="student_id">
                            <el-input v-model="form.student_id"></el-input>
                        </el-form-item>
                        <el-form-item label="密  码" prop="password">
                            <el-input type="password" v-model="form.password"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <button class="login-button" type="primary" @click="submitForm('form')">登录</button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </el-main>
    </el-container>
</template>

<script>
import logo from '../assets/logo.png'
import at from '../assets/at.png'

export default {
    name: "login",
    data(){
        return{
            logo,
            at,
            loading:false,
            form:{
                student_id:'',
                password:''
            },
            rules:{
                student_id:[ {required: true, message: '请输入用户名', trigger: 'blur'}],
                password:[{required: true, message: '请输入密码', trigger: 'blur'}],
            }
        }
    },
    methods: {
        submitForm(form){
            this.$refs[form].validate((valid) => {
          if (valid) {
              this.loading=true;
             this.$store.dispatch('user/login',this.form).then( ()=>{
                 this.$router.push('/main/home');
                 this.loading=false;
             })
             .catch(() => {
                 this.loading=false;
             })
          } else {
            alert('请输入正确用户名密码格式');
            return false;
          }
        });
        }
    }
}
</script>

<style scoped>
    .login-main >>> .el-form-item__error{
        margin:0px auto 0px 40%;
    }

    .login-main >>> .el-form-item__label{
        width: 64px;
        text-align: center;
        margin-bottom: 8px;
    }

    .login-button:hover,.login-button:focus{
        height: 36px;
        width: 126px;
        color: #000;
        border: 0;
        outline: none;
        border-radius: 18px;
        background: linear-gradient(145deg, #d2d7da, #f9ffff);
        box-shadow:  8px 8px 15px #d4d9dc, 
             -8px -8px 15px #feffff;
    }

    .login-button{
        border: 0;
        outline: none;
        width:124px;
        height:34px;
        background:rgba(59,76,93,1);
        box-shadow:3px -3px 5px 0px rgba(0, 0, 0, 0.1), -3px 3px 5px 0px rgba(0, 0, 0, 0.1), 3px 3px 5px 0px rgba(0, 0, 0, 0.1), -3px -3px 5px 0px rgba(0, 0, 0, 0.1);
        border-radius:17px;
        font-size:18px;
        font-family:Microsoft YaHei;
        font-weight:bold;
        color:rgba(252,254,255,1);
        line-height:24px;
    }

    .form-container >>> .el-input__inner{
        border-radius: 19px;
    }

    .form-container >>> .el-input {
        width:198px;
        height: 42px;

    }

    .form-container{
        margin:0px auto 0px auto;
        width:262px;
        padding-top: 54px;
    }

    .login-main{
        margin: 128px auto 0px auto;
        width:422px;
        height:292px;
        background:rgba(252,254,255,1);
        border-radius:20px;

    }

    .logo{
        margin-top: 40px;
        margin-bottom: 42px;
    }

    .at{
        margin-top: 62px;
        margin-bottom: 48px;
    }

    .el-main{
        background-color: #E9EFF2;
        min-height: 824px;
    }
</style>