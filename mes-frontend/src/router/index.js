import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '../components/Dashboard.vue';
import ProductionTracking from '../components/ProductionTracking.vue';
import QualityControl from '../components/QualityControl.vue';


const routes = [
  { path: '/', component: Dashboard },
  { path: '/production-tracking', component: ProductionTracking },
  { path: '/quality-control', component: QualityControl },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
