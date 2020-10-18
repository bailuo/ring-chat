import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Login from '@/views/login/index.vue';
import Chat from '@/views/chat/index.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
    {
        path: '/login',
        component: Login,
        meta: {
            title: 'RingChat-Login'
        }
    },
    {
        path: '/chat',
        name: 'Chat',
        component: Chat,
        meta: {
            title: 'RingChat-Chat'
        }
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

router.beforeEach((to, from, next) => {
    document.title = to.meta.title
    next()
})

export default router;
