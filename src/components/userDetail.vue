<template>
    <div class="main-box">
        <div class="first-line-box">
            <div class="info-title-box">
                <div class="title-word">
                    个人信息
                    <span class="title-detail">个人信息修改前请联系组长</span>
                </div>
                <div class="user-info-main">
                    <div class="userinfo-left">
                        <div class="left-line head-line">
                            <div class="head-title-word">头像</div>
                            <img class="head-img" :src="head">
                            <div class="">
                                <el-upload
                                    class="upload-head"
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
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import head from '../assets/vue.png'
import {getHead,uploadHead} from '../api/user'

export default {
    name: "userDetail",
    data() {
        return {
            head,
            file:[],
            userInfo:this.$store.getters.userInfo,
            };
    },
    methods:{
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

    .upload-head:hover{
        cursor: pointer;
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