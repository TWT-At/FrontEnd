<template>
    <el-container direction="vertical">
        <cloud-header></cloud-header>
        <el-container>
            <el-aside width="240px">
                <div @mouseover="showNav()" @mouseleave="invisyNav()" class="el-menu-box">
                <el-menu :default-active="defaultUrl" class="el-menu" :collapse="isCollapse" :router="true">
                    <el-menu-item index="/main/home">
                        <img class="my-icon" :src="home">
                        <span class="menu-title">首页</span>
                    </el-menu-item>
                    <el-menu-item index="/main/messagePage">
                        <img :src="message" class="my-icon">
                        <span class="menu-title">消息</span>
                    </el-menu-item>
                    <el-menu-item index="3">
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
                    <el-menu-item index="6">
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
                <router-view/>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import cloudHeader from './cloudHeader'

import check from '../assets/check.png'
import cloudpan from '../assets/cloudpan.png'
import discussion from '../assets/discussion.png'
import logout from '../assets/logout.png'
import meeting from '../assets/meeting.png'
import message from '../assets/message.png'
import more from '../assets/more.png'
import project from '../assets/project.png'
import weekly from '../assets/weekly.png'
import home from '../assets/home.png'

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
                this.defaultUrl = this.$route.path
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
            let href = window.location.href
            this.defaultUrl = href.split('#')[1]
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
        width:60px;
        height:54px;
        font-size:24px;
        font-family:Microsoft YaHei;
        font-weight:bold;
        color:rgba(61,75,89,1);
        margin-left: 48px;
    }

    .my-icon{
        width:26px;
        height: 26px;
        padding-left: 20px;
    }

    .el-menu-item{
        height: 54px;
        display: flex;
        display: -webkit-flex;
        flex-direction: row;
        justify-content:start;
        align-items:center;
    }

    .el-menu{
        box-shadow:3px 3px 10px 0px rgba(0, 0, 0, 0.05), -3px -3px 10px 0px rgba(0, 0, 0, 0.05);
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
    }

    .el-aside{
        min-height: 1136px;
        background:#E9EFF2;
    }

</style>