import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store';
import {removeToken} from '../utils/auth'

Vue.use(VueRouter)

  const routes = [
    {path: '/' , redirect: '/main/home'},
    {path: '/main' , redirect: '/main/home'},
    {name:'login' ,path:'/login',component:() => import('../views/login')},
    {name:'main' ,path:'/main',component:() => import('../components/main'),
      children:[
        {
          name:'home',path:'home',component:() => import('../components/home')
        },
        {
          name:'messagePage',path:'messagePage',component:() => import('../components/messagePage')
        }
      ]},
]

const router = new VueRouter({
  routes
});

router.beforeEach((to,from,next) =>{
  if(to.name === 'login') {
    next()
  }else if(!store.getters.token) {
    next('/login')
  }else{
    next()
  }
});

export default router

export function toLogin(){
  router.push('/login');
  removeToken()
}
