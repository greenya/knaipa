function appStore() {
    return new Vuex.Store({
        state: {
            app: {
                vars: {},
                messages: [],
            },
            bnet: {
                apikey: 'rt5ajdz37zrmecdtrxwgyyyxhqujkayw',
                locale: 'en_GB',
                realm:  'Terokkar',
                guild:  'Knaipa Variativ LV'
            },
            game: {
                races: null,
                classes: null
            },
            guild: {
                members: null
            },
            character: {
                profile: {},
                items: {},
            },
            pref: {
                lang: localStorage.lang === 'ua' ? 'ua' : 'en',
                theme: localStorage.theme === 'dark' ? 'dark' : 'light'
            }
        },
        getters: {
            'unseen-app-messages-count': function (state) {
                var count = 0;
                state.app.messages.forEach((item) => {
                    if (item.unseen) {
                        count++;
                    }
                });
                return count;
            }
        },
        mutations: {
            'set-app-var': function (state, payload) {
                state.app.vars[ payload.key ] = payload.value;
            },
            'add-app-message': function (state, payload) {
                // payload: {
                //      type: 'info' | 'error' | 'warning',
                //      text: string | { key: string, args: undefined | {} },
                //      desc: undefined | string | { key: string, args: undefined | {} },       /* HTML formatting */
                //      more: undefined | string                                                /* CODE formatting */
                // }
                state.app.messages.push({ ...payload, time: Date.now(), unseen: true });
            },
            'mark-all-app-messages-seen': function (state) {
                state.app.messages.forEach(i => i.unseen = false);
            },
            'set-pref-lang': function (state, payload) {
                localStorage.lang = state.pref.lang = payload;
            },
            'set-pref-theme': function (state, payload) {
                localStorage.theme = state.pref.theme = payload;
            },
            'set-game-races': function (state, payload) {
                state.game.races = payload;
            },
            'set-game-classes': function (state, payload) {
                state.game.classes = payload;
            },
            'set-guild-members': function (state, payload) {
                state.guild.members = payload;
            },
            'set-character-profile': function (state, payload) {
                state.character.profile[ payload.name ] = payload.value;
            },
            'set-character-items': function (state, payload) {
                state.character.items[ payload.name ] = payload.value;
            }
        }, // end of mutations
        actions: {
            'load-game-data': function ({ state, commit }) {
                return Promise.all([
                    bnapi.wow.data.characterRaces(state.bnet.apikey, state.bnet.locale),
                    bnapi.wow.data.characterClasses(state.bnet.apikey, state.bnet.locale)
                ]).then(([ races, classes ]) => {
                    var racesResult = {};
                    for (var i = 0; i < races.length; ++i) {
                        if (races[ i ].side === 'alliance') {
                            racesResult[ races[ i ].id ] = races[ i ].name;
                        }
                    }
                    commit('set-game-races', racesResult);

                    var classesResult = {};
                    for (var i = 0; i < classes.length; ++i) {
                        classesResult[ classes[ i ].id ] = classes[ i ].name;
                    }
                    commit('set-game-classes', classesResult);
                });
            },
            'load-guild-members': function ({ state, commit }) {
                if (state.guild.members) {
                    return state.guild.members;
                }

                return new Promise((resolve, reject) => {
                    bnapi.wow.guild.members(state.bnet.apikey, state.bnet.locale, state.bnet.realm, state.bnet.guild).then((members) => {
                        var result = members.map(i => i.character);
                        commit('set-guild-members', result);
                        resolve(result);
                    }).catch((error) => {
                        commit('add-app-message', {
                            type: 'error',
                            text: { key: 'load-guild-members-failed' },
                            desc: error.toString(),
                            more: error.stack
                        });
                        reject(error);
                    });
                });
            },
            'load-character-profile': function ({ state, commit }, { realm, name }) {
                var key = name + '-' + realm;
                if (state.character.profile[ key ]) {
                    return state.character.profile[ key ];
                }

                return new Promise((resolve, reject) => {
                    bnapi.wow.character.profile(state.bnet.apikey, state.bnet.locale, realm, name).then((profile) => {
                        commit('set-character-profile', { name: key, value: profile });
                        resolve(profile);
                    }).catch((error) => {
                        commit('add-app-message', {
                            type: 'error',
                            text: { key: 'load-character-profile-failed', args: { realm, name } },
                            desc: { key: 'load-character-profile-failed-desc' },
                            more: error.stack
                        });
                        reject(error);
                    });
                });
            },
            'load-character-items': function ({ state, commit }, { realm, name }) {
                var key = name + '-' + realm;
                if (state.character.items[ key ]) {
                    return state.character.items[ key ];
                }

                return new Promise((resolve, reject) => {
                    bnapi.wow.character.items(state.bnet.apikey, state.bnet.locale, realm, name).then((items) => {
                        commit('set-character-items', { name: key, value: items });
                        resolve(items);
                    }).catch((error) => {
                        commit('add-app-message', {
                            type: 'error',
                            text: { key: 'load-character-items-failed', args: { realm, name } },
                            desc: error.toString(),
                            more: error.stack
                        });
                        reject(error);
                    });
                });
            },
        } // end of actions
    });
}