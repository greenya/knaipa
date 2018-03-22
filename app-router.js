function appRouter() {
    return new VueRouter({
        routes: [
            {
                path: '/',
                redirect: { name: 'home' }
            },
            {
                name: 'home',
                path: '/home',
                component: Vue.component('app-home')
            },
            {
                name: 'settings',
                path: '/settings',
                component: Vue.component('app-settings')
            },
            {
                name: 'members',
                path: '/members',
                component: Vue.component('app-members')
            },
            {
                name: 'member',
                path: '/members/:realm/:name',
                component: Vue.component('app-member')
            },
            {
                path: '*',
                component: Vue.component('app-page-not-found')
            }
        ]
    });
}