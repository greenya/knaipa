function appStore() {
    return new Vuex.Store({
        state: {
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
            prefs: {
                lang: localStorage.lang === 'ua' ? 'ua' : 'en',
                theme: localStorage.theme === 'dark' ? 'dark' : 'light'
            }
        },
        mutations: {
            'set-game-races': function (state, races) {
                state.game.races = races;
            },
            'set-game-classes': function (state, classes) {
                state.game.classes = classes;
            },
            'set-guild-members': function (state, members) {
                state.guild.members = members;
            },
            'set-prefs-lang': function (state, lang) {
                localStorage.lang = state.prefs.lang = lang;
            },
            'set-prefs-theme': function (state, theme) {
                localStorage.theme = state.prefs.theme = theme;
            }
        },
        actions: {
            'load-game-data': ({ state, commit }) => {
                return Promise.all([
                    bnapi.wow.data.getCharacterRaces(state.bnet.apikey, state.bnet.locale),
                    bnapi.wow.data.getCharacterClasses(state.bnet.apikey, state.bnet.locale)
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
            'load-guild-members': ({ state, commit }) => {
                return bnapi.wow.guild.getMembers(state.bnet.apikey, state.bnet.locale, state.bnet.realm, state.bnet.guild).then((members) => {
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
                    return result;
                });
            }
        }
    });
}