import { createRouter, createWebHistory } from 'vue-router';
import HomeComponent from '../components/Home.vue';
import DropComponent from '../components/Drop.vue';


const routes = [
    {
      path: '/',
      name: 'Drop',
      component: DropComponent,
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
  