import { createRouter, createWebHistory } from 'vue-router';
import RegisterComponent from '../components/Register.vue';
import LoginComponent from '../components/Login.vue';
import HomeComponent from '../components/Home.vue';

const routes = [
  {
    path: '/',
    name: 'Register',
    component: RegisterComponent,
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginComponent,
  },
  {
    path: '/home',
    name: 'Home',
    component: HomeComponent,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
