Vue.mixin({
    created: function () {
        if (!this.$options.vars) {
            return;
        }

        this.$options.vars.forEach((variable) => {
            var value = this.$store.state.app.vars[ this.$options.name + ':' + variable ];
            if (value !== undefined) {
                this[ variable ] = value;
            }

            this.$watch(variable, function (value) {
                this.$store.commit('set-app-var', { name: this.$options.name + ':' + variable, value });
            });
        });
    }
});