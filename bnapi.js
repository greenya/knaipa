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

bnapi.wow.guild = {};

bnapi.wow.guild.getMembers = function (apikey, locale, realm, guild) {
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

bnapi.wow.data = {};

bnapi.wow.data.getCharacterRaces = function (apikey, locale) {
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

bnapi.wow.data.getCharacterClasses = function (apikey, locale) {
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