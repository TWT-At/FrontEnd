<template>
  <div v-loading="loading" class="main-box">
      <div class="title-div">
          <div class="main-title">第{{getIssue()}}期周报
              <span class="title-span">{{getDay()}}</span>
          </div>
          <div>
          <button class="title-button" @click="subMarkDown()">提交</button>
          <button class="title-button" @click="$router.go(-1)">返回</button>
          </div>
      </div>
      <div class="des-title">
          以下模板仅供参考，你可以自己决定在周报中记录什么。 文档编辑器采用markdown语法，语法参考请点击：
          <a target="_blank" href="https://www.runoob.com/markdown/md-tutorial.html">语法参考</a>
      </div>
       <mavon-editor 
            v-model="content" 
            ref="md" 
            @change="change" 
            style="min-height: 524px"
            :toolbars=toolbars
        />
  </div>
</template>

<script>
import {getMessageDetail,sendMessage} from '../api/user'

import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

export default {
    name:'weeklyWrite',
    components: {
        mavonEditor,
    },
    data(){
        return{
            loading:false,
            myWeek:this.$store.getters.myWeek,
            content:'# 本周做的事有xxxx\n\n\n\n\n\n# 下周的计划是xxxx\n\n\n\n\n\n# 需要的帮助有xxxxx', // 输入的markdown
            html:'',    // 及时转的html
            toolbars:{
                    bold: true, // 粗体
                    italic: true, // 斜体
                    header: true, // 标题
                    underline: true, // 下划线
                    strikethrough: true, // 中划线
                    mark: true, // 标记
                    superscript: true, // 上角标
                    subscript: true, // 下角标
                    quote: true, // 引用
                    ol: true, // 有序列表
                    ul: true, // 无序列表
                    link: true, // 链接
                    //imagelink: true, // 图片链接
                    code: true, // code
                    table: true, // 表格
                    //fullscreen: true, // 全屏编辑
                    readmodel: true, // 沉浸式阅读
                    htmlcode: true, // 展示html源码
                    //help: true, // 帮助
                    /* 1.3.5 */
                    undo: true, // 上一步
                    redo: true, // 下一步
                    trash: true, // 清空
                    //save: true, // 保存（触发events中的save事件）
                    /* 1.4.2 */
                    //navigation: true, // 导航目录
                    /* 2.1.8 */
                    alignleft: true, // 左对齐
                    aligncenter: true, // 居中
                    alignright: true, // 右对齐
                    /* 2.2.1 */
                    subfield: true, // 单双栏模式
                    preview: true, // 预览
            }
        }
    },
    methods:{
        getIssue(){
            let date=new Date;
            let year=date.getFullYear();
            let beginDate = new Date(date.getFullYear(), 0, 1);
            return `${year}${Math.ceil((parseInt((date - beginDate) / (24 * 60 * 60 * 1000)) + 1 + beginDate.getDay()) / 7)}`
        },
        getDay(){
            let nowTemp = new Date();//当前时间
            let oneDayLong = 24*60*60*1000 ;//一天的毫秒数
            let c_time = nowTemp.getTime() ;//当前时间的毫秒时间
            let c_day = nowTemp.getDay()||7;//当前时间的星期几
            let m_time = c_time - (c_day-1)*oneDayLong;//当前周一的毫秒时间
            let monday = new Date(m_time);//设置周一时间对象
            let m_year = monday.getFullYear();
            let m_month = monday.getMonth()+1;
            let m_date = monday.getDate();
            return `${m_year+'/'+m_month+'/'+m_date}~${m_year+'/'+m_month+'/'+(m_date+6)}`
        },
        change(value, render){
            // render 为 markdown 解析后的结果[html]
            this.html = render;
        },
        getMyWeekly(){
            this.loading=true
            getMessageDetail({
                publication_id:this.myWeek.WeekPublication[0].publication_id,
                author:this.$store.getters.userInfo.name
            }).then((res)=>{
                if(res.data.data){
                    this.content=res.data.data
                }
                if(this.$store.getters.markDown!=''){
                    this.content=this.$store.getters.markDown
                }
                this.loading=false
            })
        },
        subMarkDown(){
            sendMessage({
                message:this.content
            }).then(()=>
            {
                this.$store.dispatch('user/setMarkDown','')
                this.$message({
                    message:'上传成功',
                    type:"success",
                    duration:5000
                })
            }).catch(()=>
            {
                 this.$message({
                    message:'上传失败',
                    type:"error",
                    duration:5000
                })
            })
        }
    },
    created(){
        this.getMyWeekly()
    },
    watch:{
        content:{
            handler(val){
                this.$store.dispatch('user/setMarkDown',val)
            }
        }
    }
}
</script>

<style scoped>

    .markdown-body{
        width: 100%;
    }

    .des-title{
        width: 40%;
        text-align: left;
        margin-bottom: 48px;
    }

    .title-span{
        font-size:16px;
        font-family:Microsoft YaHei;
        font-weight:400;
        color:rgba(51,52,53,1);
        margin-left: 36px;
    }

    .title-button:hover{
        background-color: #012d4f;
        cursor: pointer;
    }

    .title-button{
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
        outline: none;
        margin-left: 38px;
    }

    .main-title{
        font-size:30px;
        font-family:Microsoft YaHei;
        font-weight:bold;
        color:rgba(61,75,89,1);
    }

    .title-div{
        width: 100%;
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