'use strict';

Vue.mixin({
    created: function () {
        if (!this.$options.name || !this.$options.name.startsWith('app-')) {
            return;
        }

        if (this.$options.vars) {
            this.$options.vars.forEach((variable) => {
                var key = this.$options.name + '-' + variable;
                var value = this.$store.state.app.vars[key];
                if (value !== undefined) {
                    this[variable] = value;
                }
    
                this.$watch(variable, function (value) {
                    this.$store.commit('set-app-var', { key, value });
                });
            });
        }

        this.$app = {};

        this.$app.text = (text) => {
            return typeof text === 'object' ? this.$t(text._, text) : text;
        };

        this.$app.avatar = ({ thumbnail, race, gender }) => {
            return 'https://render-eu.worldofwarcraft.com/character/' + thumbnail + '?alt=/wow/static/images/2d/avatar/' + race + '-' + gender + '.jpg';
        }

        this.$app.icon = ({ icon, size = 'large' }) => {
            size = size === 'large' ? 56 : size === 'medium' ? 36 : 18;
            return 'https://render-eu.worldofwarcraft.com/icons/' + size + '/' + icon + '.jpg';
        }
    }
});
