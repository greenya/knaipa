Vue.mixin({
    created: function () {
        if (!this.$options.name || !this.$options.name.startsWith('app-')) {
            return;
        }

        this.$text = function (text) {
            return typeof text === 'object' ? this.$t(text.key, text.args) : text;
        };

        if (this.$options.vars) {
            this.$options.vars.forEach((variable) => {
                var key = this.$options.name + '-' + variable;
                var value = this.$store.state.app.vars[ key ];
                if (value !== undefined) {
                    this[ variable ] = value;
                }
    
                this.$watch(variable, function (value) {
                    this.$store.commit('set-app-var', { key, value });
                });
            });
        }
    }
});