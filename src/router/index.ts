import { createRouter, createWebHistory } from '@ionic/vue-router'
import { RouteRecordRaw } from 'vue-router'

import AuthPage from '../views/AuthPage.vue'
import ChatPage from '../views/ChatPage.vue'

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		redirect: '/auth',
	},
	{
		path: '/auth',
		name: 'auth',
		component: AuthPage,
	},
	{
		path: '/chat',
		name: 'chat',
		component: ChatPage,
	},
]

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
})

export default router
