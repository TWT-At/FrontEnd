import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store';
import {removeToken} from '../utils/auth'

Vue.use(VueRouter)

  const routes = [
    {path: '/' , redirect: '/main/home'},
    {path: '/main' , redirect: '/main/home'},
    {path: '/main/projMain' , redirect: '/main/projMain/project'},
    {name:'login' ,path:'/login',component:() => import('../views/login')},
    {name:'main' ,path:'/main',component:() => import('../components/main'),
      children:[
        {
          name:'home',path:'home',component:() => import('../components/home')
        },
        {
          name:'messagePage',path:'messagePage',component:() => import('../components/messagePage')
        },
        {
          name:'userDetail',path:'userDetail',component:() => import('../components/userDetail')
        },
        {
          name:'grouper',path:'grouper',component:() => import('../components/grouper')
        },
        {
          name:'projMain',path:'projMain',component:() => import('../components/projMain'), 
          children:[
            {
              name:'project',path:'project',component:() => import('../components/project')
            },
            {
              name:'projDetail',path:'projDetail',component:() => import('../components/projDetail')
            }
          ]
        }
      ]},
      {name:'adminMain' ,path:'/adminMain',component:() => import('../components/admin/adminMain'),
        children:[
            {
                name:'adminHome',path:'adminHome',component:() => import('../components/admin/adminHome')
            }
        ]}
]

const router = new VueRouter({
  routes
});

router.beforeEach((to,from,next) =>{
  if(to.name === 'login') {
    next()
  }else if(!store.getters.token) {
    next('/login')
  }else if (!store.getters.userInfo) {
    store.dispatch('user/getInfo').then(() => {
        next()
    }).catch(() => {
      next()
    })
  }else{
    next()
  }
});

export default router

export function toLogin(){
  router.push('/login');
  removeToken()
}
