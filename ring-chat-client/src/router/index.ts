import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Login from '@/views/login/index.vue';
import Chat from '@/views/chat/index.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
    {
        path: '/',
        name: 'Login',
        component: Login,
    },
    {
        path: '/chat',
        name: 'Chat',
        component: Chat,
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});
// router.beforeEach(from, to, next) {

// }

export default router;
