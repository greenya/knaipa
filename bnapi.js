bnapi = {};

bnapi.parseError = function (status, body) {
    var error = status.code + ' ' + status.text;
    if (body.indexOf('{') === 0) {
        var body = JSON.parse(body);
        if (body.reason) {
            error += ': ' + body.reason;
        } else if (body.detail) {
            error += ': ' + body.detail;
        }
    }
    return new Error(error);
};

bnapi.wow = {};

bnapi.wow.data = {};

bnapi.wow.data.characterRaces = function (apikey, locale) {
    return new Promise((resolve, reject) => {
        ajax.get('https://eu.api.battle.net/wow/data/character/races', { apikey, locale }, function (status, body) {
            if (status.code === 200) {
                resolve(JSON.parse(body).races);
            } else {
                reject(bnapi.parseError(status, body));
            }
        });
    });
};

bnapi.wow.data.characterClasses = function (apikey, locale) {
    return new Promise((resolve, reject) => {
        ajax.get('https://eu.api.battle.net/wow/data/character/classes', { apikey, locale }, function (status, body) {
            if (status.code === 200) {
                resolve(JSON.parse(body).classes);
            } else {
                reject(bnapi.parseError(status, body));
            }
        });
    });
};

bnapi.wow.character = {};

bnapi.wow.character.profile = function (apikey, locale, realm, characterName) {
    return new Promise((resolve, reject) => {
        ajax.get('https://eu.api.battle.net/wow/character/' + realm + '/' + characterName, { apikey, locale }, function (status, body) {
            if (status.code === 200) {
                resolve(JSON.parse(body));
            } else {
                reject(bnapi.parseError(status, body));
            }
        });
    });
};

bnapi.wow.character.items = function (apikey, locale, realm, characterName) {
    return new Promise((resolve, reject) => {
        ajax.get('https://eu.api.battle.net/wow/character/' + realm + '/' + characterName, { apikey, locale, fields: 'items' }, function (status, body) {
            if (status.code === 200) {
                resolve(JSON.parse(body).items);
            } else {
                reject(bnapi.parseError(status, body));
            }
        });
    });
};

bnapi.wow.guild = {};

bnapi.wow.guild.members = function (apikey, locale, realm, guild) {
    return new Promise((resolve, reject) => {
        ajax.get('https://eu.api.battle.net/wow/guild/' + realm + '/' + guild, { apikey, locale, fields: 'members' }, function (status, body) {
            if (status.code === 200) {
                resolve(JSON.parse(body).members);
            } else {
                reject(bnapi.parseError(status, body));
            }
        });
    });
};