<template>
    <div direction="vertical">
        <cloud-header></cloud-header>
        <el-container>
            <el-aside width="240px">
                <div @mouseover="showNav()" @mouseleave="invisyNav()" class="el-menu-box">
                <el-menu :default-active="defaultUrl" class="el-menu-vertical-demo" :collapse="isCollapse" :router="true">
                    <el-menu-item index="/main/home">
                        <img class="my-icon" :src="home">
                        <span class="menu-title">首页</span>
                    </el-menu-item>
                    <el-menu-item index="/main/messagePage">
                        <img :src="message" class="my-icon">
                        <span class="menu-title">消息</span>
                    </el-menu-item>
                    <el-menu-item index="/main/weeklyAll">
                        <img :src="weekly" class="my-icon">
                        <span class="menu-title">周报</span>
                    </el-menu-item>
                    <el-menu-item index="4">
                        <img :src="meeting" class="my-icon">
                        <span class="menu-title">会议</span>
                    </el-menu-item>
                    <el-menu-item index="5">
                        <img :src="check" class="my-icon">
                        <span class="menu-title">考勤</span>
                    </el-menu-item>
                    <el-menu-item index="/main/projMain">
                        <img :src="project" class="my-icon">
                        <span class="menu-title">项目</span>
                    </el-menu-item>
                    <el-menu-item index="7">
                        <img :src="cloudpan" class="my-icon">
                        <span class="menu-title">云盘</span>
                    </el-menu-item>
                    <el-menu-item index="8">
                        <img :src="discussion" class="my-icon">
                        <span class="menu-title">讨论</span>
                    </el-menu-item>
                    <el-menu-item index="9">
                        <img :src="more" class="my-icon">
                        <span class="menu-title">更多</span>
                    </el-menu-item>
                    <el-menu-item index="10">
                        <img :src="logout" class="my-icon">
                        <span class="menu-title">登出</span>
                    </el-menu-item>
                </el-menu>
                </div>
            </el-aside>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </div>
</template>

<script>
import cloudHeader from './cloudHeader'

import check from '../assets/check2x.png'
import cloudpan from '../assets/cloudpan2x.png'
import discussion from '../assets/discussion2x.png'
import logout from '../assets/logout2x.png'
import meeting from '../assets/meeting2x.png'
import message from '../assets/message2x.png'
import more from '../assets/more2x.png'
import project from '../assets/project2x.png'
import weekly from '../assets/weekly2x.png'
import home from '../assets/home2x.png'

export default {
    components:{
        "cloud-header":cloudHeader
    },
    data(){
        return{
            check:check,
            cloudpan:cloudpan,
            discussion:discussion,
            logout:logout,
            meeting:meeting,
            message:message,
            more:more,
            project:project,
            weekly:weekly,
            home:home,

            isCollapse: true,
            defaultUrl: "/main/home",
        }
    },
    methods: {
        getPath() {
                let href = window.location.href
                //this.defaultUrl = href.split('#')[1]
                switch (href.split('#')[1].split('/')[2]){
                case "userDetail" : 
                    this.defaultUrl="/main/home";
                    break;
                case "grouper" :
                    this.defaultUrl="/main/home";
                    break;
                case'weeklyWrite':
                    this.defaultUrl='/main/weeklyAll'
                    break;
                case 'weeklyComment':
                    this.defaultUrl='/main/weeklyAll'
                    break;
                default:
                    this.defaultUrl="/main/"+href.split('#')[1].split('/')[2];
                }
            },
        click(){
            this.isCollapse=false;
        },
        showNav(){
            this.isCollapse=false;
        },
        invisyNav(){
            this.isCollapse=true;
        }
    },
    mounted() {
            /*let href = window.location.href
            //this.defaultUrl = href.split('#')[1]
            switch (href.split('#')[1]){
                case "/main/userDetail" : 
                    this.defaultUrl="/main/home";
                    break;
                default:
                    this.defaultUrl=href.split('#')[1];
            }*/
            this.getPath()
        },
        watch: {
            '$route': 'getPath'
        },
        props: {
            title: String,
        }
}
</script>

<style scoped>

    .el-menu-box{
        height: 100%;
    }

    .is-active >>> img {
        -webkit-filter:brightness(100);
        filter: brightness(100);
    }

    .el-menu-item:hover{
        background-color: #CCD1D6;
    }

    .is-active >>> .menu-title{
        color: #FCFEFF!important;
    }

    .is-active{
        background-color: #3B4C5D!important;
    }

    .menu-title{
        height:54px;
        font-size:24px;
        font-family:Microsoft YaHei;
        font-weight:bold;
        color:rgba(61,75,89,1);
        margin-left: 48px;
    }

    .my-icon{
        height: 26px!important;
        padding-left: 20px;
    }

    .el-menu-item{
        height: 54px;
        display: flex;
        display: -webkit-flex;
        flex-direction: row;
        justify-content:flex-start;
        align-items:center;
    }

    .el-menu{
        box-shadow:3px 3px 10px 0px rgba(0, 0, 0, 0.05), -3px -3px 10px 0px rgba(0, 0, 0, 0.05)!important;
    }

    .el-menu--collapse{
        width: 104px;
        box-shadow:3px 3px 10px 0px rgba(0, 0, 0, 0.05), -3px -3px 10px 0px rgba(0, 0, 0, 0.05);
    }

    .el-menu{
        height: 100%;
    }

    .el-main{
        background-color: #E9EFF2;
        margin-top: 142px;
        margin-left: 240px;
    }

    .el-aside{
        height: 100%;
        background:#E9EFF2;
        margin-top: 142px;
        position: fixed;
        z-index: 1000;
    }

    .el-menu-box >>>  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 240px;
    min-height: 400px;
  }

</style>

<style scoped>

</style>