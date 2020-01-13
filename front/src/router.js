import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export default new VueRouter({
    mode: 'history',

    routes: [
        {
            path: '/account',
            component: () => import('@/pages/AccountPage.vue')
        },
        {
            path: '/wall',
            component: () => import('@/pages/Wall.vue')
        },
        {
            path: '/post/create',
            component: () => import('@/pages/PostCreator.vue')
        },
        {
            path: '/post/:id/edit',
            component: () => import('@/pages/PostEditor.vue')
        },
        {
            path: '*',
            redirect: '/wall'
        }
    ]
})