'use strict';

var bnapi = {
    region: false,
    locale: false,
    token: false,
};

bnapi.error = function (x) {
    var error = x.status + ' ' + x.statusText;
    if (x.responseText.indexOf('{') === 0) {
        var body = JSON.parse(x.responseText);
        if (body.reason) {
            error += ': ' + body.reason;
        } else if (body.detail) {
            error += ': ' + body.detail;
        }
    }
    return new Error(error);
};

bnapi.auth = function (apiKey, apiSecret, region, locale) {
    return new Promise((resolve, reject) => {
        var x = new XMLHttpRequest();
        x.open('POST', 'https://' + region + '.battle.net/oauth/token', true);
        x.setRequestHeader('Authorization', 'Basic ' + btoa(apiKey + ':' + apiSecret));
        x.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        x.onreadystatechange = function () {
            if (x.readyState === 4) {
                if (x.status >= 200 && x.status <= 299) {
                    bnapi.region = region;
                    bnapi.locale = locale;
                    bnapi.token = JSON.parse(x.responseText).access_token;
                    resolve();
                } else {
                    reject(bnapi.error(x));
                }
            }
        };
        x.send('grant_type=client_credentials');
    });
}

bnapi.request = function (url, params = {}) {
    return new Promise((resolve, reject) => {
        var q = [];
        for (var key in params) {
            q.push(encodeURIComponent(key) + '=' + encodeURIComponent(params[key]));
        }
        var x = new XMLHttpRequest();
        x.open('GET', url + (q.length ? '?' + q.join('&') : ''), true);
        x.onreadystatechange = function () {
            if (x.readyState === 4) {
                if (x.status >= 200 && x.status <= 299) {
                    resolve(JSON.parse(x.responseText));
                } else {
                    reject(bnapi.error(x));
                }
            }
        };
        x.send();
    });
}

bnapi.get = function (service, params = {}) {
    if (params.namespace) {
        params.namespace += '-' + bnapi.region;
    }
    params.locale = bnapi.locale;
    params.access_token = bnapi.token;
    return bnapi.request('https://' + bnapi.region + '.api.blizzard.com/' + service, params);
};

bnapi.wow = {};

bnapi.wow.playableRaces = function () {
    return bnapi.get('data/wow/playable-race/index', { namespace: 'static' }).then(data => data.races);
};

bnapi.wow.playableClasses = function () {
    return bnapi.get('data/wow/playable-class/index', { namespace: 'static' }).then(data => data.classes);
};

bnapi.wow.guild = {};

bnapi.wow.guild.roster = function (realm, guild) {
    return bnapi.get('data/wow/guild/' + realm + '/' + guild + '/roster', { namespace: 'profile' }).then(data => data.members);
};

bnapi.wow.character = {};

bnapi.wow.character.profile = function (realm, characterName) {
    return bnapi.get('profile/wow/character/' + realm + '/' + characterName.toLowerCase(), { namespace: 'profile' });
};

/*
bnapi.wow.character.achievements = function (apikey, locale, realm, characterName) {
    return bnapi.wow.character.profile(apikey, locale, realm, characterName, [ 'achievements' ]).then(data => data.achievements);
}

bnapi.wow.character.appearance = function (apikey, locale, realm, characterName) {
    return bnapi.wow.character.profile(apikey, locale, realm, characterName, [ 'appearance' ]).then(data => data.appearance);
}

bnapi.wow.character.feed = function (apikey, locale, realm, characterName) {
    return bnapi.wow.character.profile(apikey, locale, realm, characterName, [ 'feed' ]).then(data => data.feed);
}

bnapi.wow.character.guild = function (apikey, locale, realm, characterName) {
    return bnapi.wow.character.profile(apikey, locale, realm, characterName, [ 'guild' ]).then(data => data.guild);
}

bnapi.wow.character.hunterPets = function (apikey, locale, realm, characterName) {
    return bnapi.wow.character.profile(apikey, locale, realm, characterName, [ 'hunterPets' ]).then(data => data.hunterPets);
}

bnapi.wow.character.items = function (apikey, locale, realm, characterName) {
    return bnapi.wow.character.profile(apikey, locale, realm, characterName, [ 'items' ]).then(data => data.items);
}

bnapi.wow.character.mounts = function (apikey, locale, realm, characterName) {
    return bnapi.wow.character.profile(apikey, locale, realm, characterName, [ 'mounts' ]).then(data => data.mounts);
}

bnapi.wow.character.pets = function (apikey, locale, realm, characterName) {
    return bnapi.wow.character.profile(apikey, locale, realm, characterName, [ 'pets' ]).then(data => data.pets);
}

bnapi.wow.character.petSlots = function (apikey, locale, realm, characterName) {
    return bnapi.wow.character.profile(apikey, locale, realm, characterName, [ 'petSlots' ]).then(data => data.petSlots);
}

bnapi.wow.character.professions = function (apikey, locale, realm, characterName) {
    return bnapi.wow.character.profile(apikey, locale, realm, characterName, [ 'professions' ]).then(data => data.professions);
}

bnapi.wow.character.progression = function (apikey, locale, realm, characterName) {
    return bnapi.wow.character.profile(apikey, locale, realm, characterName, [ 'progression' ]).then(data => data.progression);
}

bnapi.wow.character.pvp = function (apikey, locale, realm, characterName) {
    return bnapi.wow.character.profile(apikey, locale, realm, characterName, [ 'pvp' ]).then(data => data.pvp);
}

bnapi.wow.character.quests = function (apikey, locale, realm, characterName) {
    return bnapi.wow.character.profile(apikey, locale, realm, characterName, [ 'quests' ]).then(data => data.quests);
}

bnapi.wow.character.reputation = function (apikey, locale, realm, characterName) {
    return bnapi.wow.character.profile(apikey, locale, realm, characterName, [ 'reputation' ]).then(data => data.reputation);
}

bnapi.wow.character.statistics = function (apikey, locale, realm, characterName) {
    return bnapi.wow.character.profile(apikey, locale, realm, characterName, [ 'statistics' ]).then(data => data.statistics);
}

bnapi.wow.character.stats = function (apikey, locale, realm, characterName) {
    return bnapi.wow.character.profile(apikey, locale, realm, characterName, [ 'stats' ]).then(data => data.stats);
}

bnapi.wow.character.talents = function (apikey, locale, realm, characterName) {
    return bnapi.wow.character.profile(apikey, locale, realm, characterName, [ 'talents' ]).then(data => data.talents);
}

bnapi.wow.character.titles = function (apikey, locale, realm, characterName) {
    return bnapi.wow.character.profile(apikey, locale, realm, characterName, [ 'titles' ]).then(data => data.titles);
}
*/
