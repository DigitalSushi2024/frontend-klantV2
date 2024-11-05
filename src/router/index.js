import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/App.vue';
import OrderPage from '@/components/OrderPage.vue';

const routes = [
    { path: '/', name: 'Home', component: HomePage },
    { path: '/order', name: 'order', component: OrderPage }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;