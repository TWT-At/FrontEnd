<template>
    <el-container>
        <el-header height="144px">
            <img class="logo" height="62" width="72" src="../assets/logo.png">
            <img class="at" height="36" width="46" src="../assets/at.png">
        </el-header>
        <el-main>
            <div class="login-main" v-loading="loading">
                <div class="form-container">
                    <el-form class="login-form" ref="form" :model="form" :rules="rules">
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
export default {
    data(){
        return{
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
                 this.loading=false;
                 this.$router.push('/main');
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
        height: 36px;
        width: 126px;
        background: linear-gradient(145deg, #f9ffff, #d2d7da);
        color: #000;
        border: 0;
        outline: none;
        border-radius: 18px;
        box-shadow:  7px 7px 10px #d4d9dc, 
             -7px -7px 10px #feffff;
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
        width: 440px;
        height: 310px;
        background: #fff;
        margin: 128px auto 0px auto;
        border-radius:50px;
        background: #E9EFF2;
        box-shadow:  16px 16px 32px #d4d9dc, 
             -16px -16px 32px #feffff;

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