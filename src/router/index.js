import Vue from 'vue'
import VueRouter from 'vue-router'
import Student from '../views/Student'
import Home from '../views/Home'
import Login from '../views/Login'
import Teacher from '../views/Teacher'
import homepage from "../views/HomePage";

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'homepage',
    component: homepage,
    hidden: true
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    hidden: true
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    hidden: true
  },
  // {
  //   path: '/home',
  //   name: '导航一',
  //   component: Home,
  //   children:[
  //     {
  //       path: '/student',
  //       name: '管理学生',
  //       component: Student
  //     },
  //     {
  //       path: '/teacher',
  //       name: '管理教师',
  //       component: Teacher
  //     }
  //   ]
  // }
]

const router = new VueRouter({
  routes
})

export default router
