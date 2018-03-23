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
                state.app.vars[ payload.name ] = payload.value;
            },
            'add-app-message': function (state, payload) {
                state.app.messages.push({ ...payload, timestamp: Date.now(), unseen: true });
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
            'set-character-items': function (state, payload) {
                state.character.items[ payload.name ] = payload.value;
            }
        },
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
                    commit('add-app-message', { type: 'info', text: 'Game data successfuly loaded', desc: 'It is!' }); // debug
                });
            },
            'load-guild-members': function ({ state, commit }) {
                return bnapi.wow.guild.members(state.bnet.apikey, state.bnet.locale, state.bnet.realm, state.bnet.guild).then((members) => {
                    var result = [];
                    for (var i = 0; i < members.length; ++i) {
                        var c = members[ i ].character;
                        result.push({
                            ...c,
                            _race: state.game.races[ c.race ],
                            _class: state.game.classes[ c.class ],
                            _grank: members[ i ].rank,
                            _levelmaxed: c.level === 110,
                            _thumbnail: 'https://render-eu.worldofwarcraft.com/character/' + c.thumbnail
                                + '?alt=/wow/static/images/2d/avatar/' + c.race + '-' + c.gender + '.jpg',
                            //_specicon: c.spec ? 'https://render-eu.worldofwarcraft.com/icons/18/' + c.spec.icon + '.jpg' : null,
                            //_armory: 'https://worldofwarcraft.com/' + state.bnet.locale + '/character/' + c.realm + '/' + c.name,
                            //_wowprogress: 'https://www.wowprogress.com/character/eu/' + c.realm +  '/' + c.name,
                            //_raiderio: 'https://raider.io/characters/eu/' + c.realm +  '/' + c.name,
                        });
                    }
                    commit('set-guild-members', result);
                    commit('add-app-message', { type: 'warning', text: { key: 'list-is-empty' } }); // debug
                    return result;
                });
            },
            'load-character-items': function ({ state, commit }, { realm, name }) {
                var key = name + '@' + realm;
                if (state.character.items[ key ]) {
                    return state.character.items[ key ];
                }

                return new Promise((resolve, reject) => {
                    bnapi.wow.character.items(state.bnet.apikey, state.bnet.locale, realm, name + '123').then((items) => {
                        commit('set-character-items', { name: key, value: items })
                        resolve(items);
                    }).catch((error) => {
                        commit('add-app-message', { type: 'error', text: error.toString(), desc: { key: 'load-character-items-failed', args: { realm, name } } });
                        reject(error);
                    });
                });
            },
        }
    });
}