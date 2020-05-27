<template>
    <div 
    v-loading.fullscreen.lock="loading"
    class="main-box">
        <div class="title-container">
            <div class="title-div">
                {{weekInfo.week.period.replace('-','')}}期周报——{{weekInfo.mem.group}}-{{weekInfo.mem.campus}}-{{weekInfo.mem.name}}
            </div>
            <button class="back-button" @click='$router.go(-1)'>返回</button>
        </div>
        <mavon-editor 
            v-model="content" 
            ref="md" 
            style="min-height: 524px"
            :toolbarsFlag=false
            :subfield=false
             defaultOpen='preview'
        />
        <div class="score-div">
            <div class="score-title">
                打分：
                <span class="score-title-span">
                    请在每次周报截止日后24小时内及时打分，未填写内容的周报将默认记为0分，周报分数将会纳入个人考核中。
                </span>
            </div>
            <div class="star-div">
                <span class="title-span">分数:</span>
                <el-rate v-model="scored.score"></el-rate>
            </div>
            <div class="score-comment">
                <span class="title-span">点评:</span>
                <el-input
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4}"
                placeholder="请输入点评"
                maxlength="100"
                show-word-limit
                v-model="scored.comment">
                </el-input>
            </div>
            <div class="score-button-div">
                <button class="back-button score-button" @click="scoreWeekly()">
                    提交
                </button>
            </div>
        </div>
        <div class="comment-div">
            <div class="comment-s-div">
                <div class="score-title comment-title">
                    评论：
                </div>
                <el-input
                type="textarea"
                :autosize="{ minRows: 6, maxRows: 8}"
                placeholder="请输入点评"
                maxlength="100"
                show-word-limit
                v-model="comment">
                </el-input>
            </div>
            <div class="score-button-div">
                <button class="back-button score-button" @click="commentWeekly()">
                        提交
                </button>
            </div>
        </div>
    </div>
</template>

<script>

import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

import {getMessageDetail,scoreMessage,commentMessage} from '../api/user'

export default {
    name:'weeklyComment',
    components: {
        mavonEditor,
    },
    data(){
        return{
            loading:false,
            weekInfo:this.$store.getters.weekInfo,
            content:'',
            scored:{
                score:0,
                comment:'',
                WeekPublication_id:this.$store.getters.weekInfo.week.publication_id,
                author:this.$store.getters.weekInfo.mem.name
            },
            comment:'',
        }
    },
    mounted(){
        (function smoothscroll(){
            var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
            if (currentScroll > 0) {
                window.requestAnimationFrame(smoothscroll);
                window.scrollTo (0,currentScroll - (currentScroll/5));
            }
        })();
    },
    methods:{
        getWeekly(){
            this.loading=true
            getMessageDetail({
                publication_id:this.weekInfo.week.publication_id,
                author:this.weekInfo.mem.name
            }).then((res)=>{
                this.content=res.data.data
                this.loading=false
            }).catch(()=>{
                this.$router.go(-1)
            })
        },
        scoreWeekly(){
            if(this.scored.score!=0&&this.scored.comment!=''){
                scoreMessage({
                    WeekPublication_id:this.weekInfo.week.publication_id,
                    author:this.weekInfo.mem.name,
                    score:this.scored.score,
                    comment:this.scored.comment
                }).then(()=>{
                    this.$message({
                        message:'打分成功',
                        type:"success",
                        duration:5000
                    })
                }).catch(()=>{
                    this.$message({
                        message:'打分失败',
                        type:"error",
                        duration:5000
                    })
                })
            }else{
                this.$message({
                    message:'请打分并填写点评',
                    type:"error",
                    duration:5000
                })
            }
        },
        commentWeekly(){
            if(this.comment!=''){
                commentMessage({
                    week_publication_id:this.weekInfo.week.publication_id,
                    author:this.weekInfo.mem.name,
                    comment:this.comment
                }).then(()=>{
                    this.$message({
                        message:'评论成功',
                        type:"success",
                        duration:5000
                    })
                }).catch(()=>{
                    this.$message({
                        message:'评论失败',
                        type:"error",
                        duration:5000
                    })
                })
            }else{
                this.$message({
                    message:'请填写评论',
                    type:"error",
                    duration:5000
                })
            }
        }
    },
    created(){
        this.getWeekly()
    }

}
</script>

<style scoped>

    .comment-s-div{
        display: flex;
        display: -webkit-flex; /* Safari */
        flex-direction:row;
        justify-content: flex-start;
        align-items: flex-start;
        width: 100%;
    }

    .el-input__count{
        font-weight: normal!important;
    }

    .comment-title{
        width: 62px;
    }

    .comment-div{
        width: 100%;
        background:rgba(252,254,255,1);
        box-shadow:3px 3px 10px 0px rgba(0, 0, 0, 0.05), -3px -3px 10px 0px rgba(0, 0, 0, 0.05);
        border-radius:20px;
        margin-top: 50px;
        display: flex;
        display: -webkit-flex; /* Safari */
        flex-direction:column;
        justify-content: flex-start;
        align-items: flex-start;
        text-align: left;
        padding:46px 65px 46px 106px;
    }

    .score-button-div{
        display: flex;
        display: -webkit-flex; /* Safari */
        flex-direction:row;
        justify-content: flex-end;
        align-items: flex-end;
        width: 100%;
        margin-top: 18px;
    }

    .title-span{
        width:36px;
        font-size:14px;
        font-family:Microsoft YaHei;
        font-weight:bold;
        color:rgba(61,75,89,1);
        margin-right: 24px;
    }

    .score-comment{
        font-size:14px;
        font-family:Microsoft YaHei;
        font-weight:bold;
        color:rgba(61,75,89,1);
        display: flex;
        display: -webkit-flex; /* Safari */
        flex-direction:row;
        justify-content: flex-start;
        align-items: flex-start;
        margin-left: 42px;
        margin-top: 24px;
        width: 96%;
    }

    .score-comment >>> .el-input__count{
        font-weight: normal;
    }

    .star-div{
        font-size:14px;
        font-family:Microsoft YaHei;
        font-weight:bold;
        color:rgba(61,75,89,1);
        display: flex;
        display: -webkit-flex; /* Safari */
        flex-direction:row;
        justify-content: flex-start;
        align-items: flex-end;
        margin-left: 42px;
        margin-top: 24px;
    }

    .score-title-span{
        font-size:14px;
        font-family:Microsoft YaHei;
        font-weight:400;
        color:rgba(143,143,143,1);
    }

    .score-title{
        font-size:18px;
        font-family:Microsoft YaHei;
        font-weight:bold;
        color:rgba(61,75,89,1);
    }

    .score-div{
        width: 100%;
        min-height: 318px;
        background:rgba(252,254,255,1);
        box-shadow:3px 3px 10px 0px rgba(0, 0, 0, 0.05), -3px -3px 10px 0px rgba(0, 0, 0, 0.05);
        border-radius:20px;
        margin-top: 50px;
        display: flex;
        display: -webkit-flex; /* Safari */
        flex-direction:column;
        justify-content: flex-start;
        align-items: flex-start;
        text-align: left;
        padding:46px 65px 46px 106px;
    }

    

    .main-box >>> .v-show-content , .scroll-style , .scroll-style-border-radius{
        border-radius: 20px!important;
    }

    .markdown-body{
        width: 100%;
        border-radius: 20px;
    }

    .back-button:hover{
        cursor: pointer;
        background-color: #012d4f;
    }

    .back-button{
        transition: all .3s;
        width:104px;
        height:44px;
        background:rgba(2,69,122,1);
        box-shadow:3px -3px 5px 0px rgba(0, 0, 0, 0.1), -3px 3px 5px 0px rgba(0, 0, 0, 0.1), 3px 3px 5px 0px rgba(0, 0, 0, 0.1), -3px -3px 5px 0px rgba(0, 0, 0, 0.1);
        border-radius:22px;
        font-size:18px;
        font-family:Microsoft YaHei;
        font-weight:bold;
        color:rgba(252,254,255,1);
    }

    .title-div{
        font-size:30px;
        font-family:Microsoft YaHei;
        font-weight:bold;
        color:rgba(61,75,89,1);
        margin-bottom: 50px;
    }

    .title-container{
        width:100%;
        display: flex;
        display: -webkit-flex; /* Safari */
        flex-direction:row;
        justify-content: space-between;
        align-items: flex-start;
    }

    .main-box{
        min-height: 1000px;
        width: 1148px;
        margin: 76px auto 0px 24px;
        display: flex;
        display: -webkit-flex; /* Safari */
        flex-direction:column;
        justify-content: flex-start;
        align-items: flex-start;
    }

</style>