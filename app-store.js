function appStore() {
    return new Vuex.Store({
        state: {
            app: {
                vars: {},
                messages: [],
            },
            bnet: {
                apikey: 'rt5ajdz37zrmecdtrxwgyyyxhqujkayw',
                region: 'EU', // not used
                locale: 'en_GB',
                realm: 'Terokkar',
                guild: 'Knaipa Variativ LV'
            },
            game: {
                races: null,
                classes: null,
                factions: [
                    {
                        title: 'Legion',
                        members: { any: [ 1828, 1859, 1883, 1888, 1894, 1900, 1947, 1948, 1975, 1989, 2018, 2045, 2135, 2165, 2170 ] },
                        groups: [
                            { title: 'The Fishing Masters', members: { any: [ 2097, 2098, 2099, 2100, 2101, 2102 ] } }
                        ]
                    },
                    {
                        title: 'Warlords of Draenor',
                        members: { any: [ 1515, 1520, 1711, 1732, 1849, 1850 ], 0: [ 1682, 1710, 1731, 1847 ], 1: [ 1445, 1681, 1708, 1848 ] },
                        groups: [
                            { title: 'Barracks Bodyguards', members: { any: [ 1736, 1737, 1741 ], 0: [ 1733, 1738 ], 1: [ 1739, 1740 ] } }
                        ]
                    },
                    {
                        title: 'Mists of Pandaria',
                        members: { any: [ 1216, 1228, 1269, 1270, 1271, 1337, 1341, 1345, 1351, 1359, 1435, 1440, 1492 ], 0: [ 1242, 1376, 1387 ], 1: [ 1375, 1388 ] },
                        groups: [
                            { title: 'The Anglers', members: { any: [ 1358 ] } },
                            { title: 'The Tillers', members: { any: [ 1273, 1275, 1276, 1277, 1278, 1279, 1280, 1281, 1282, 1283 ] } }
                        ]
                    },
                    {
                        title: 'Cataclysm',
                        members: { any: [ 1135, 1158, 1171, 1173, 1204 ], 0: [ 1174, 1177 ], 1: [ 1172, 1178 ] }
                    },
                    {
                        title: 'Wrath of the Lich King',
                        members: { any: [ 1073, 1090, 1091, 1098, 1106, 1119, 1156 ] },
                        groups: [
                            { title: 'Alliance Vanguard', members: { 0: [ 1050, 1068, 1094, 1126 ] } },
                            { title: 'Horde Expedition', members: { 1: [ 1064, 1067, 1085, 1124 ] } },
                            { title: 'Sholazar Basin', members: { any: [ 1104, 1105 ] } }
                        ]
                    },
                    {
                        title: 'The Burning Crusade',
                        members: { any: [ 933, 942, 967, 970, 989, 990, 1012, 1015, 1038 ], 0: [ 946, 978 ], 1: [ 922, 941, 947 ] },
                        groups: [
                            { title: 'Shattrath City', members: { any: [ 932, 934, 935, 1011, 1031, 1077 ] } }
                        ]
                    },
                    {
                        title: 'Classic',
                        members: { any: [ 59, 70, 87, 92, 93, 270, 349, 529, 576, 609, 749, 809, 909, 910 ] },
                        groups: [
                            { title: 'Alliance', members: { 0: [ 47, 54, 69, 72, 930, 1134, 1353 ] } },
                            { title: 'Alliance Forces', members: { 0: [ 509, 730, 890, 2011 ] } },
                            { title: 'Horde', members: { 1: [ 68, 76, 81, 530, 911, 1133, 1352 ] } },
                            { title: 'Horde Forces', members: { 1: [ 510, 729, 889, 2010 ] } },
                            { title: 'Steamwheedle Cartel', members: { any: [ 21, 577, 369, 470 ] } }
                        ]
                    },
                    {
                        title: 'Guild',
                        members: { any: [ 1168 ] }
                    }
                ], // end of factions
                standings: [
                    [
                        { text: 'standing-hated', color: 'red' },
                        { text: 'standing-hostile', color: 'red' },
                        { text: 'standing-unfriendly', color: 'yellow darken-2' },
                        { text: 'standing-neutral', color: 'yellow darken-2' },
                        { text: 'standing-friendly', color: 'green' },
                        { text: 'standing-honored', color: 'green' },
                        { text: 'standing-revered', color: 'green' },
                        { text: 'standing-exalted', color: 'teal lighten-2' }
                    ],
                    [
                        { text: 'standing-stranger', color: 'deep-orange darken-2' },
                        { text: 'standing-pal', color: 'yellow darken-2' },
                        { text: 'standing-buddy', color: 'green' },
                        { text: 'standing-friend', color: 'green' },
                        { text: 'standing-good-friend', color: 'green' },
                        { text: 'standing-best-friend', color: 'teal lighten-2' }
                    ]
                ] // end of standings
            },
            guild: {
                members: null
            },
            character: {
                profile: {},
                talents: {},
                stats: {},
                items: {},
                titles: {},
                reputation: {}
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
                //      text: string | { _: string, ... },
                //      desc: undefined | string | { _: string, ... },          /* HTML formatting */
                //      more: undefined | string                                /* CODE formatting */
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
            },
            'set-character-titles': function (state, payload) {
                state.character.titles[ payload.name ] = payload.value;
            },
            'set-character-reputation': function (state, payload) {
                state.character.reputation[ payload.name ] = payload.value;
            }
        }, // end of mutations
        actions: {
            'load-game-data': function ({ state, commit }) {
                return Promise.all([
                    bnapi.wow.data.characterRaces(state.bnet.apikey, state.bnet.locale),
                    bnapi.wow.data.characterClasses(state.bnet.apikey, state.bnet.locale)
                ]).then(([ races, classes ]) => {
                    var racesResult = {};
                    races.forEach((item) => { racesResult[ item.id ] = item; });

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
                    classes.forEach((item) => { classesResult[ item.id ] = item; });

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
                        commit('add-app-message', { error, text: { _: 'load-guild-members-failed' } });
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
                            text: { _: 'load-character-profile-failed', realm, name },
                            desc: { _: 'load-character-profile-failed-desc' }
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
            'load-character-titles': function ({ state, commit }, { realm, name }) {
                var key = name + '-' + realm;
                if (state.character.titles[ key ]) {
                    return state.character.titles[ key ];
                }
                return new Promise((resolve, reject) => {
                    bnapi.wow.character.titles(state.bnet.apikey, state.bnet.locale, realm, name).then((titles) => {
                        var result = {};
                        titles.forEach((item) => { result[ item.id ] = item; });
                        commit('set-character-titles', { name: key, value: result });
                        resolve(result);
                    }).catch((error) => {
                        commit('add-app-message', { error, text: 'Failed to load titles for ' + name + ' from ' + realm });
                        reject(error);
                    });
                });
            },
            'load-character-reputation': function ({ state, commit }, { realm, name }) {
                var key = name + '-' + realm;
                if (state.character.reputation[ key ]) {
                    return state.character.reputation[ key ];
                }
                return new Promise((resolve, reject) => {
                    bnapi.wow.character.reputation(state.bnet.apikey, state.bnet.locale, realm, name).then((reputation) => {
                        var result = {};
                        reputation.forEach((item) => { result[ item.id ] = item; });
                        commit('set-character-reputation', { name: key, value: result });
                        resolve(result);
                    }).catch((error) => {
                        commit('add-app-message', { error, text: 'Failed to load reputation for ' + name + ' from ' + realm });
                        reject(error);
                    });
                });
            }
        } // end of actions
    });
}