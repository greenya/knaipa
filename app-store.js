'use strict';

function appStore() {
    return new Vuex.Store({
        state: {
            app: {
                vars: {},
                messages: [],
            },
            api: {
                key: '1ef1243b09784242bde863a2bca76c3d',
                secret: 'uyYIUab3AgYH8SxISh6CLf3bNifLdknr',
                region: 'eu',
                locale: 'en_GB',
                realm: 'terokkar',
                guild: 'knaipa-variativ-lv'
            },
            game: {
                races: null,
                classes: null,
                specs: null,
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
                    seen: false,
                    icon: 'mdi-information'
                };

                if (payload.error) {
                    content.type = 'error';
                    content.icon = 'mdi-alert';
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
            'set-game-specs': function (state, payload) {
                state.game.specs = payload;
            },
            'set-guild-members': function (state, payload) {
                state.guild.members = payload;
            },
            'set-character-profile': function (state, payload) {
                state.character.profile[payload.name] = payload.value;
            },
            'set-character-talents': function (state, payload) {
                state.character.talents[payload.name] = payload.value;
            },
            'set-character-stats': function (state, payload) {
                state.character.stats[payload.name] = payload.value;
            },
            'set-character-items': function (state, payload) {
                state.character.items[payload.name] = payload.value;
            },
            'set-character-titles': function (state, payload) {
                state.character.titles[payload.name] = payload.value;
            },
            'set-character-reputation': function (state, payload) {
                state.character.reputation[payload.name] = payload.value;
            }
        }, // end of mutations
        actions: {
            'load-game-data': function ({ state, commit }) {
                return bnapi.auth(state.api.key, state.api.secret, state.api.region, state.api.locale).then(() => {
                    return Promise.all([
                        bnapi.wow.playableRaces(),
                        bnapi.wow.playableClasses(),
                        bnapi.wow.playableSpecializations()
                    ]).then(([ playableRaces, playableClasses, playableSpecializations ]) => {
                        var gameRaces = {};
                        playableRaces.forEach(r => {
                            gameRaces[r.id] = {
                                id:     r.id,
                                name:   r.name,
                                icon_m: 'inv_misc_questionmark',
                                icon_f: 'inv_misc_questionmark'
                            };
                        });

                        gameRaces[1].icon_m = 'race_human_male';
                        gameRaces[1].icon_f = 'race_human_female';

                        gameRaces[2].icon_m = 'race_orc_male';
                        gameRaces[2].icon_f = 'race_orc_female';

                        gameRaces[3].icon_m = 'race_dwarf_male';
                        gameRaces[3].icon_f = 'race_dwarf_female';

                        gameRaces[4].icon_m = 'race_night-elf_male';
                        gameRaces[4].icon_f = 'race_night-elf_female';

                        gameRaces[5].icon_m = 'race_undead_male';
                        gameRaces[5].icon_f = 'race_undead_female';

                        gameRaces[6].icon_m = 'race_tauren_male';
                        gameRaces[6].icon_f = 'race_tauren_female';

                        gameRaces[7].icon_m = 'race_gnome_male';
                        gameRaces[7].icon_f = 'race_gnome_female';

                        gameRaces[8].icon_m = 'race_troll_male';
                        gameRaces[8].icon_f = 'race_troll_female';

                        gameRaces[9].icon_m = 'race_goblin_male';
                        gameRaces[9].icon_f = 'race_goblin_female';

                        gameRaces[10].icon_m = 'race_blood-elf_male';
                        gameRaces[10].icon_f = 'race_blood-elf_female';

                        gameRaces[11].icon_m = 'race_draenei_male';
                        gameRaces[11].icon_f = 'race_draenei_female';

                        gameRaces[22].icon_m = 'race_worgen_male';
                        gameRaces[22].icon_f = 'race_worgen_female';

                        gameRaces[24].icon_m = 'achievement_guild_classypanda'; // Pandaren (Neutral)
                        gameRaces[24].icon_f = 'achievement_character_pandaren_female';

                        gameRaces[25].icon_m = 'achievement_guild_classypanda'; // Pandaren (Alliance)
                        gameRaces[25].icon_f = 'achievement_character_pandaren_female';

                        gameRaces[26].icon_m = 'achievement_guild_classypanda'; // Pandaren (Horde)
                        gameRaces[26].icon_f = 'achievement_character_pandaren_female';

                        gameRaces[27].icon_m = 'inv_nightbornemale';
                        gameRaces[27].icon_f = 'inv_nightbornefemale';

                        // gameRaces[28].icon = [ 'inv_misc_questionmark', 'inv_misc_questionmark' ]; // Highmountain Tauren
                        // gameRaces[29].icon = [ 'inv_misc_questionmark', 'inv_misc_questionmark' ]; // Void Elf
                        // gameRaces[30].icon = [ 'inv_misc_questionmark', 'inv_misc_questionmark' ]; // Lightforged Draenei
                        // gameRaces[31].icon = [ 'inv_misc_questionmark', 'inv_misc_questionmark' ]; // Zandalari Troll
                        // gameRaces[32].icon = [ 'inv_misc_questionmark', 'inv_misc_questionmark' ]; // Kul Tiran
                        // gameRaces[34].icon = [ 'inv_misc_questionmark', 'inv_misc_questionmark' ]; // Dark Iron Dwarf
                        // gameRaces[35].icon = [ 'inv_misc_questionmark', 'inv_misc_questionmark' ]; // Vulpera
                        // gameRaces[36].icon = [ 'inv_misc_questionmark', 'inv_misc_questionmark' ]; // Mag'har Orc
                        // gameRaces[37].icon = [ 'inv_misc_questionmark', 'inv_misc_questionmark' ]; // Mechagnome
                        // TODO: add icons for all races

                        commit('set-game-races', gameRaces);

                        var gameClasses = {};
                        playableClasses.forEach(c => {
                            gameClasses[c.id] = {
                                id:     c.id,
                                name:   c.name,
                                icon:   'inv_misc_questionmark'
                            };
                        });

                        gameClasses[1].icon = 'class_warrior';
                        gameClasses[2].icon = 'class_paladin';
                        gameClasses[3].icon = 'class_hunter';
                        gameClasses[4].icon = 'class_rogue';
                        gameClasses[5].icon = 'class_priest';
                        gameClasses[6].icon = 'class_death-knight';
                        gameClasses[7].icon = 'class_shaman';
                        gameClasses[8].icon = 'class_mage';
                        gameClasses[9].icon = 'class_warlock';
                        gameClasses[10].icon = 'class_monk';
                        gameClasses[11].icon = 'class_druid';
                        gameClasses[12].icon = 'class_demon-hunter';

                        commit('set-game-classes', gameClasses);

                        var gameSpecs = {};
                        playableSpecializations.forEach(s => {
                            gameSpecs[s.id] = {
                                id:     s.id,
                                name:   s.name,
                                icon:   'inv_misc_questionmark'
                            };
                        });

                        // gameSpecs[62].icon = ''; // arcane
                        // gameSpecs[63].icon = ''; // fire
                        // gameSpecs[64].icon = ''; // frost
                        // gameSpecs[65].icon = ''; // holy
                        // gameSpecs[66].icon = ''; // prot
                        // gameSpecs[70].icon = ''; // retri
                        // gameSpecs[71].icon = ''; // arms
                        // gameSpecs[72].icon = ''; // fury
                        // gameSpecs[73].icon = ''; // prot
                        // gameSpecs[102].icon = ''; // balance
                        // gameSpecs[103].icon = ''; // feral
                        // gameSpecs[104].icon = ''; // guardian
                        // gameSpecs[105].icon = ''; // resto
                        // gameSpecs[250].icon = ''; // blood
                        // gameSpecs[251].icon = ''; // frost
                        // gameSpecs[252].icon = ''; // unholy
                        gameSpecs[253].icon = 'ability_hunter_bestialdiscipline'; // bm
                        gameSpecs[254].icon = 'ability_hunter_focusedaim'; // mm
                        gameSpecs[255].icon = 'ability_hunter_camouflage'; // surv
                        // gameSpecs[256].icon = ''; // disc
                        // gameSpecs[257].icon = ''; // holy
                        // gameSpecs[258].icon = ''; // shadow
                        // gameSpecs[259].icon = ''; // assa
                        // gameSpecs[260].icon = ''; // outlaw
                        // gameSpecs[261].icon = ''; // sub
                        // gameSpecs[262].icon = ''; // elem
                        // gameSpecs[263].icon = ''; // enh
                        // gameSpecs[264].icon = ''; // resto
                        // gameSpecs[265].icon = ''; // affli
                        // gameSpecs[266].icon = ''; // demo
                        // gameSpecs[267].icon = ''; // destro
                        // gameSpecs[268].icon = ''; // bm
                        // gameSpecs[269].icon = ''; // ww
                        // gameSpecs[270].icon = ''; // mw
                        // gameSpecs[577].icon = ''; // havoc
                        // gameSpecs[581].icon = ''; // veng
                        // TODO: add icons for all specs

                        commit('set-game-specs', gameSpecs);
                    });
                });
            },
            'load-guild-members': function ({ state, commit }) {
                if (state.guild.members) {
                    return state.guild.members;
                }
                return new Promise((resolve, reject) => {
                    bnapi.wow.guild.roster(state.api.realm, state.api.guild).then(roster => {
                        var guildMembers = roster.map((m) => {
                            return {
                                id:     m.character.id,
                                level:  m.character.level,
                                name:   m.character.name,
                                realm:  m.character.realm.slug,
                                race:   m.character.playable_race.id,
                                class:  m.character.playable_class.id,
                                rank:   m.rank
                            };
                        });
                        commit('set-guild-members', guildMembers);
                        resolve(guildMembers);
                    }).catch((error) => {
                        commit('add-app-message', { error, text: { _: 'load-guild-members-failed' } });
                        reject(error);
                    });
                });
            },
            'load-character-profile': function ({ state, commit }, { realm, name }) {
                var key = name + '-' + realm;
                if (state.character.profile[key]) {
                    return state.character.profile[key];
                }
                return new Promise((resolve, reject) => {
                    bnapi.wow.character.profile(realm, name).then((profile) => {
                        var result = {
                            id:                 profile.id,
                            name:               profile.name,
                            gender:             profile.gender.type,
                            faction:            profile.faction.type,
                            race:               profile.race.id,
                            class:              profile.character_class.id,
                            active_spec:        profile.active_spec.id,
                            realm:              profile.realm.slug,
                            guild:              profile.guild.name,
                            level:              profile.level,
                            experience:         profile.experience,
                            achievement_points: profile.achievement_points,
                            last_login:         profile.last_login_timestamp,
                            average_ilvl:       profile.average_item_level,
                            equipped_ilvl:      profile.equipped_item_level,
                            active_title:       profile.active_title.display_string
                        };
                        commit('set-character-profile', { name: key, value: result });
                        resolve(result);
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
            /*'load-character-talents': function ({ state, commit }, { realm, name }) {
                var key = name + '-' + realm;
                if (state.character.talents[key]) {
                    return state.character.talents[key];
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
                if (state.character.stats[key]) {
                    return state.character.stats[key];
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
                if (state.character.items[key]) {
                    return state.character.items[key];
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
                if (state.character.titles[key]) {
                    return state.character.titles[key];
                }
                return new Promise((resolve, reject) => {
                    bnapi.wow.character.titles(state.bnet.apikey, state.bnet.locale, realm, name).then((titles) => {
                        var result = {};
                        titles.forEach((item) => { result[item.id] = item; });
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
                if (state.character.reputation[key]) {
                    return state.character.reputation[key];
                }
                return new Promise((resolve, reject) => {
                    bnapi.wow.character.reputation(state.bnet.apikey, state.bnet.locale, realm, name).then((reputation) => {
                        var result = {};
                        reputation.forEach((item) => { result[item.id] = item; });
                        commit('set-character-reputation', { name: key, value: result });
                        resolve(result);
                    }).catch((error) => {
                        commit('add-app-message', { error, text: 'Failed to load reputation for ' + name + ' from ' + realm });
                        reject(error);
                    });
                });
            }*/
        } // end of actions
    });
}
