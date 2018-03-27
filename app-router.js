function appRouter() {
    return new VueRouter({
        routes: [
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
                redirect: { name: 'member-profile' },
                component: Vue.component('app-member'),
                children: [
                    {
                        name: 'member-profile',
                        path: 'profile',
                        component: Vue.component('app-member-profile')
                    },
                    {
                        name: 'member-titles',
                        path: 'titles',
                        component: Vue.component('app-member-titles', { template: '<span>placeholder for app-member-titles component</span>' })
                    },
                    {
                        name: 'member-reputation',
                        path: 'reputation',
                        component: Vue.component('app-member-reputation', { template: '<span>placeholder for app-member-reputation component</span>' })
                    }
                ]
            },
            {
                path: '/',
                redirect: { name: 'home' }
            },
            {
                path: '*',
                component: Vue.component('app-page-not-found')
            }
        ]
    });
}