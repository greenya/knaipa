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

bnapi.wow.playableSpecializations = function () {
    return bnapi.get('data/wow/playable-specialization/index', { namespace: 'static' }).then(data => data.character_specializations);
};

bnapi.wow.guild = {};

bnapi.wow.guild.roster = function (realm, guild) {
    return bnapi.get('data/wow/guild/' + realm + '/' + guild + '/roster', { namespace: 'profile' }).then(data => data.members);
};

bnapi.wow.character = {};

bnapi.wow.character.profile = function (realm, characterName) {
    var char = characterName.toLowerCase();
    return bnapi.get('profile/wow/character/' + realm + '/' + char, { namespace: 'profile' });
};

bnapi.wow.character.media = function (realm, characterName) {
    var char = characterName.toLowerCase();
    return bnapi.get('profile/wow/character/' + realm + '/' + char + '/character-media', { namespace: 'profile' });
};

bnapi.wow.character.reputation = function (realm, characterName) {
    var char = characterName.toLowerCase();
    return bnapi.get('profile/wow/character/' + realm + '/' + char + '/reputations', { namespace: 'profile' }).then(data => data.reputations);
};
