<template>
    <div class="main-box">
        <div class="first-line-box">
            <div class="info-title-box">
                <div class="title-word">
                    个人信息
                    <span class="title-detail">个人信息修改前请联系组长</span>
                </div>
            </div>
            <div class="user-info-main">
                <div class="userinfo-left">
                    <div class="left-line head-line">
                        <div class="head-title-word">头像</div>
                        <img class="head-img" :src="head">
                        <div class="upload-div">
                            <el-upload
                                class="upload"
                                action="#"
                                name="avatar"
                                :multiple="false"
                                :http-request="handleUpload"
                                :file-list="file"
                                :auto-upload="true"
                                :on-exceed="handleExceed"
                                :show-file-list="false">
                                <button class="upload-head" size="small" type="primary">更改>></button>
                            </el-upload>
                        </div>
                    </div>
                    <div class="left-line">
                        账号
                        <span class="left-span">{{userInfo.student_id}}</span>
                    </div>
                    <div class="left-line">
                        姓名
                        <span class="left-span">{{userInfo.name}}</span>
                    </div>
                    <div class="left-line">
                        组别
                        <span class="left-span">{{userInfo.group}}</span>
                    </div>
                    <div class="left-line">
                        角色
                        <span class="left-span">{{userInfo.group_role}}</span>
                    </div>
                    <div class="left-line">
                        电话
                        <span class="left-span">110</span>
                    </div>
                </div>
                <div class="userinfo-right">
                    <div class="userinfo-right-title">时间统计</div>
                    <div class="userinfo-right-detail">
                        使用登记了 Mac 地址的设备，连接工作室 Wi-Fi 网络，即可开始计算在线时长。以下统计将用于工作室的钥匙发放、固定工位分配的参考。
                    </div>
                    <div class="userinfo-info">
                        今天是你加入天外天的第 <span class="blue-word">{{userInfo.date}}</span> 天<br/>
                        你已在工作室累计工作时长 <span class="blue-word">{{userInfo.hour}}</span> 小时<br/>
                        本周工作时长 <span class="blue-word">{{99999}}</span> 小时
                    </div>
                </div>
            </div>
        </div>
        <div class="second-line-box">
            <div class="info-title-box">
                <div class="title-word">
                    修改密码
                </div>
            </div>
            <div class="changepassword-main">
                <el-form :hide-required-asterisk="true" :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="166px" >
                    <el-form-item label="新密码" prop="pass">
                        <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
                    </el-form-item>
                    <div class="pass-explain">
                        为确保信息安全，请养成良好的密码使用习惯，不得使用弱密码，尽量避免同一密码多处使用。<br/>
                        请设置最少 8 位的密码，建议包含 大、小写字母，数字，符号 中的至少三种。
                    </div>
                    <el-form-item label="确认密码" prop="checkPass">
                        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <button type="primary" class="changePass-button" @click="handleSub('ruleForm')">保存修改</button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div class="third-line-box">
             <div class="info-title-box">
                <div class="title-word">
                    @twt.edu.cn
                </div>
            </div>
            <div class="emailchangepass-main">
                <el-form 
                :hide-required-asterisk="true" 
                :model="emailForm" status-icon 
                :rules="emailRules" 
                ref="emailForm" label-width="166px" >
                    <el-form-item label="邮箱地址">
                        <div class="email-div">xxx@twt.edu.cn</div>
                    </el-form-item>
                    <el-form-item label="新密码" prop="pass">
                        <el-input type="password" v-model="emailForm.pass" autocomplete="off"></el-input>
                    </el-form-item>
                    <div class="pass-explain">
                        邮箱账号独立于其他内网系统，如您未激活过账号，可直接在此重置密码进行激活。<br/>
                        登录时，Username 为包含 @twt.edu.cn 的完整地址。
                    </div>
                    <el-form-item label="确认密码" prop="checkPass">
                        <el-input type="password" v-model="emailForm.checkPass" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <button type="primary" class="changePass-button" @click="handleSubEmail('emailForm')">保存修改</button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import head from '../assets/vue.png'
import {getHead,uploadHead,changePassword} from '../api/user'

export default {
    name: "userDetail",
    data() {
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
        return {
            head,
            file:[],
            userInfo:this.$store.getters.userInfo,
            ruleForm:{
                pass: '',
                checkPass: '',
            },

            emailForm:{
                 pass: '',
                checkPass: ''
            },

            rules: {
                pass: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/, message: '密码必须包含数字和字母，长度为 8 - 16位' }
                ],
                checkPass: [
                    { validator: validatePass2, trigger: 'blur' }
                ]
            },
            emailRules: {
                pass: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/, message: '密码必须包含数字和字母，长度为 8 - 16位' }
                ],
                checkPass: [
                    { validator: validatePass2, trigger: 'blur' }
                ]
            }
        };
    },
    methods:{
        handleSubEmail(){
            this.$message({
                message: "该功能暂未开放",
                type: "error",
                duration:5000
            });
        },
        handleSub(ruleForm){
            this.$refs[ruleForm].validate((valid) => {
                if (valid) {
                    changePassword({
                        id:this.userInfo.id,
                        password:this.ruleForm.pass
                    }).then(res =>{
                        if(res.status === 200){
                            this.$message({
                                message: "修改成功",
                                type: "success",
                                duration:5000
                            });
                        }
                    })
                } else {
                   this.$message({
                        message: "密码不符合要求",
                        type: "error",
                        duration:5000
                    });
                    return false;
                }
            });
        },
        handleExceed(){
            this.$message({
                    message: "请上传单个文件",
                    type: "error",
                    duration:5000
            });
        },
        handleUpload(query){
            const isJPG = query.file.type === 'image/jpeg';
            const isPNG = query.file.type === 'image/png';
            const isLt10M = query.file.size / 1024 / 1024 < 10;
            if((!isJPG)&&(!isPNG)){
                this.$message.error('格式错误');
            }
            if(!isLt10M){
                this.$message.error('图片过大');
            }
            if((isJPG||isPNG)&&isLt10M){
                window.console.log(query.file)
                let data = new FormData();
                data.append('avatar', query.file);
                data.append('id',this.userInfo.id);
                uploadHead(data).then(res =>{
                    if(res.status=== 200){
                        this.$message({
                            message: "上传成功",
                            type: "success",
                            duration:5000
                        });
                        this.$router.go(0);
                    }else{
                        this.$message.error('上传失败了');
                    }
                }).catch(error => {
                    this.$message.error('上传失败'+error);
                })
            }
        }
    },
    mounted(){
        getHead().then(res => {
            return 'data:image/png;base64,' + btoa(
                new Uint8Array(res.data)
                  .reduce((data, byte) => data + String.fromCharCode(byte), '')
            );
        }).then(data => {
            this.head=data;
        })
            }
};
</script>
<style scoped>

    .email-div{
        font-size:14px;
        font-family:Microsoft YaHei;
        font-weight:400;
        color:rgba(0,0,0,1);
    }

    .emailchangepass-main{
        width:100%;
        height:380px;
        background:rgba(252,254,255,1);
        box-shadow:3px 3px 10px 0px rgba(0, 0, 0, 0.05), -3px -3px 10px 0px rgba(0, 0, 0, 0.05);
        border-radius:20px;
        margin-top: 22px;
        margin-bottom:100px;
        padding-top: 40px;
        padding-left: 64px;
        padding-right: 64px;
    }

    .third-line-box{
        min-height: 364px;
        width: 100%;
        margin-top: 52px;
    }

    .changePass-button:hover,.changePass-button:focus{
        cursor: pointer;
        background:#13283C;
    }

    .changePass-button{
        transition: all .2s;
        outline: none;
        border: none;
        width:167px;
        height:45px;
        background:rgba(59,76,93,1);
        box-shadow:3px -3px 5px 0px rgba(0, 0, 0, 0.1), -3px 3px 5px 0px rgba(0, 0, 0, 0.1), 3px 3px 5px 0px rgba(0, 0, 0, 0.1), -3px -3px 5px 0px rgba(0, 0, 0, 0.1);
        border-radius:23px;
        font-size:18px;
        font-family:Microsoft YaHei;
        font-weight:bold;
        color:rgba(252,254,255,1);
        line-height:24px;
        margin-top: 8px;
    }

    .changepassword-main >>> .el-form-item__content,.emailchangepass-main >>> .el-form-item__content{
        text-align: left;
    }

    .pass-explain{
        font-size:12px;
        font-family:Microsoft YaHei;
        font-weight:400;
        color:rgba(0,0,0,1);
        line-height:24px;
        margin-bottom: 18px;
        text-align: left;
        margin-left: 166px;
    }

    .changepassword-main >>> .el-input__inner,.emailchangepass-main >>> .el-input__inner{
        border-radius: 16px;
        height: 32px;
        line-height: 32px;
        background:rgba(233,239,242,1);
        box-shadow:2px 2px 3px 0px rgba(4,0,0,0.05), -2px -2px 3px 0px rgba(4,0,0,0.05);
    }

    .changepassword-main >>> .el-form-item__label,.emailchangepass-main >>> .el-form-item__label{
        font-size:18px;
        font-family:Microsoft YaHei;
        font-weight:bold;
        color:rgba(65,79,92,1);
        text-align: left;
    }

    .changepassword-main{
        padding-top: 40px;
        padding-left: 64px;
        padding-right: 64px;
    }

    .changepassword-main{
        width:100%;
        height:314px;
        background:rgba(252,254,255,1);
        box-shadow:3px 3px 10px 0px rgba(0, 0, 0, 0.05), -3px -3px 10px 0px rgba(0, 0, 0, 0.05);
        border-radius:20px;
        margin-top: 22px;
    }

    .second-line-box{
        min-height: 364px;
        width: 100%;
        margin-top: 52px;
    }

    .blue-word{
        font-family: MicrosoftYaHei-Bold;
        font-size: 18px;
        font-weight: bold;
        color: #03A3EA;
    }

    .userinfo-info{
        text-align: left;
        font-family: MicrosoftYaHei;
        font-size: 14px;
        font-weight: normal;
        color: #333435;
        margin-top: 56px;
        line-height: 32px;
    }

    .userinfo-right-detail{
        max-width: 422px;
        font-size:12px;
        font-family:Microsoft YaHei;
        font-weight:400;
        color:rgba(0,0,0,1);
        text-align: left;
        margin-top: 28px;
        line-height: 26px;
    }

    .userinfo-right-title{
        font-size:18px;
        font-family:Microsoft YaHei;
        font-weight:bold;
        color:rgba(65,79,92,1);
        margin-top: 48px;
    }

    .userinfo-right{
        height: 100%;
        width: 572px;
        display: -webkit-flex; /* Safari */
        display: flex;
        flex-direction:column;
        justify-content: flex-start;
        align-items: flex-start;
    }

    .upload-head:hover{
        cursor: pointer;
        text-decoration:underline;
    }

    .upload-head{
        outline: none;
        border: none;
        background-color: #fff;
        font-size:14px;
        font-family:Microsoft YaHei;
        font-weight:400;
        color:rgba(3,163,234,1);
    }

    .head-line{
        display: -webkit-flex; /* Safari */
        display: flex;
        flex-direction:row;
        justify-content: left;
        align-items: center;
    }

    .head-title-word{
        display: inline-block;
    }

    .upload-head{
        margin-left: 76px;
    }

    .head-img{
        height: 60px;
        width: 60px;
        margin-left: 128px;
        border-radius: 50%;
    }

    .left-span{
        font-size:14px;
        font-family:Microsoft YaHei;
        font-weight:400;
        color:rgba(0,0,0,1);
        margin-left: 128px;
    }

    .left-line{
        text-align: left;
        font-size:18px;
        font-family:Microsoft YaHei;
        font-weight:bold;
        color:rgba(65,79,92,1);
        height: 60px;
        line-height: 60px;
    }

    .userinfo-left{
        width: 352px;
        margin-left: 64px;
        height: 100%;
        padding-top: 24px;
        display: -webkit-flex; /* Safari */
        display: flex;
        flex-direction:column;
        justify-content: space-around;
        align-items: flex-start;
    }

    .userinfo-left{
        width: 568px;
        height: 100%;
    }

    .user-info-main{
        width:1140px;
        height:442px;
        background:rgba(252,254,255,1);
        box-shadow:3px 3px 10px 0px rgba(0, 0, 0, 0.05), -3px -3px 10px 0px rgba(0, 0, 0, 0.05);
        border-radius:20px;
        margin-top: 22px;
        display: -webkit-flex; /* Safari */
        display: flex;
        flex-direction:row;
        justify-content: flex-start;
        align-items: flex-start;
    }

    .title-detail{
        font-size:16px;
        font-family:Microsoft YaHei;
        font-weight:400;
        color:rgba(51,52,53,1);
        margin-left: 38px;
    }

    .title-word{
        font-size:30px;
        font-family:Microsoft YaHei;
        font-weight:bold;
        color:rgba(61,75,89,1);
        text-align: left;
    }

    .first-line-box{
        height: 492px;
        width: 1140px;
    }

    .main-box{
        min-height: 1000px;
        width: 1148px;
        margin: 76px auto 0px 24px;
        display: -webkit-flex; /* Safari */
        display: flex;
        flex-direction:column;
        justify-content: flex-start;
        align-items: flex-start;
    }
</style>