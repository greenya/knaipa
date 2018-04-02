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
                realm: 'Terokkar',
                guild: 'Knaipa Variativ LV'
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
                talents: {},
                stats: {},
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
                    if (!item.seen) {
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
                var content = {
                    time: Date.now(),
                    seen: false
                };

                if (payload.error) {
                    content.type = 'error';
                    content.text = payload.error.message;
                    content.desc = payload.error.toString();
                    content.more = payload.error.stack;
                    delete payload.error;
                }

                state.app.messages.push({ ...content, ...payload });
            },
            'mark-all-app-messages-seen': function (state) {
                state.app.messages.forEach(i => i.seen = true);
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
            'set-character-talents': function (state, payload) {
                state.character.talents[ payload.name ] = payload.value;
            },
            'set-character-stats': function (state, payload) {
                state.character.stats[ payload.name ] = payload.value;
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
                        racesResult[ races[ i ].id ] = races[ i ];
                    }

                    racesResult[ 1 ].icon = [ 'race_human_male', 'race_human_female' ];
                    racesResult[ 2 ].icon = [ 'race_orc_male', 'race_orc_female' ];
                    racesResult[ 3 ].icon = [ 'race_dwarf_male', 'race_dwarf_female' ];
                    racesResult[ 4 ].icon = [ 'race_night-elf_male', 'race_night-elf_female' ];
                    racesResult[ 5 ].icon = [ 'race_undead_male', 'race_undead_female' ];
                    racesResult[ 6 ].icon = [ 'race_tauren_male', 'race_tauren_female' ];
                    racesResult[ 7 ].icon = [ 'race_gnome_male', 'race_gnome_female' ];
                    racesResult[ 8 ].icon = [ 'race_troll_male', 'race_troll_female' ];
                    racesResult[ 9 ].icon = [ 'race_goblin_male', 'race_goblin_female' ];
                    racesResult[ 10 ].icon = [ 'race_blood-elf_male', 'race_blood-elf_female' ];
                    racesResult[ 11 ].icon = [ 'race_draenei_male', 'race_draenei_female' ];
                    racesResult[ 22 ].icon = [ 'race_worgen_male', 'race_worgen_female' ];
                    racesResult[ 24 ].icon = [ 'achievement_guild_classypanda', 'achievement_character_pandaren_female' ]; // neutral pandaren
                    racesResult[ 25 ].icon = [ 'achievement_guild_classypanda', 'achievement_character_pandaren_female' ]; // alliance pandaren
                    racesResult[ 26 ].icon = [ 'achievement_guild_classypanda', 'achievement_character_pandaren_female' ]; // horde pandaren
                    racesResult[ 27 ].icon = [ 'inv_nightbornemale', 'inv_nightbornefemale' ];
                    racesResult[ 28 ].icon = [ 'inv_misc_questionmark', 'inv_misc_questionmark' ];
                    racesResult[ 29 ].icon = [ 'inv_misc_questionmark', 'inv_misc_questionmark' ];
                    racesResult[ 30 ].icon = [ 'inv_misc_questionmark', 'inv_misc_questionmark' ];

                    commit('set-game-races', racesResult);

                    var classesResult = {};
                    for (var i = 0; i < classes.length; ++i) {
                        classesResult[ classes[ i ].id ] = classes[ i ];
                    }

                    classesResult[ 1 ].icon = 'class_warrior';
                    classesResult[ 2 ].icon = 'class_paladin';
                    classesResult[ 3 ].icon = 'class_hunter';
                    classesResult[ 4 ].icon = 'class_rogue';
                    classesResult[ 5 ].icon = 'class_priest';
                    classesResult[ 6 ].icon = 'class_death-knight';
                    classesResult[ 7 ].icon = 'class_shaman';
                    classesResult[ 8 ].icon = 'class_mage';
                    classesResult[ 9 ].icon = 'class_warlock';
                    classesResult[ 10 ].icon = 'class_monk';
                    classesResult[ 11 ].icon = 'class_druid';
                    classesResult[ 12 ].icon = 'class_demon-hunter';

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
                        commit('add-app-message', { error, text: { key: 'load-guild-members-failed' } });
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
                            error,
                            text: { key: 'load-character-profile-failed', args: { realm, name } },
                            desc: { key: 'load-character-profile-failed-desc' }
                        });
                        reject(error);
                    });
                });
            },
            'load-character-talents': function ({ state, commit }, { realm, name }) {
                var key = name + '-' + realm;
                if (state.character.talents[ key ]) {
                    return state.character.talents[ key ];
                }
                return new Promise((resolve, reject) => {
                    bnapi.wow.character.talents(state.bnet.apikey, state.bnet.locale, realm, name).then((talents) => {
                        commit('set-character-talents', { name: key, value: talents });
                        resolve(talents);
                    }).catch((error) => {
                        commit('add-app-message', { error, text: 'Failed to load talents for ' + name + ' from ' + realm });
                        reject(error);
                    });
                });
            },
            'load-character-stats': function ({ state, commit }, { realm, name }) {
                var key = name + '-' + realm;
                if (state.character.stats[ key ]) {
                    return state.character.stats[ key ];
                }
                return new Promise((resolve, reject) => {
                    bnapi.wow.character.stats(state.bnet.apikey, state.bnet.locale, realm, name).then((stats) => {
                        commit('set-character-stats', { name: key, value: stats });
                        resolve(stats);
                    }).catch((error) => {
                        commit('add-app-message', { error, text: 'Failed to load stats for ' + name + ' from ' + realm });
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
                        commit('add-app-message', { error, text: 'Failed to load items for ' + name + ' from ' + realm });
                        reject(error);
                    });
                });
            },
        } // end of actions
    });
}