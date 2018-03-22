Vue.mixin({
    created: function () {
        if (!this.$options.vars) {
            return;
        }

        this.$options.vars.forEach((variable) => {
            var value = this.$store.state.var[ this.$options.name + ':' + variable ];
            if (value !== undefined) {
                this[ variable ] = value;
            }

            this.$watch(variable, function (value) {
                this.$store.commit('set-var', { name: this.$options.name + ':' + variable, value });
            });
        });
    }
});