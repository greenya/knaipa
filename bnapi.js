bnapi = {};

bnapi.error = function (status, body) {
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

bnapi.wow.get = function (service, params) {
    return new Promise((resolve, reject) => {
        ajax.get('https://eu.api.battle.net/wow/' + service, params, function (status, body) {
            if (status.code === 200) {
                resolve(JSON.parse(body));
            } else {
                reject(bnapi.error(status, body));
            }
        });
    });
}

bnapi.wow.data = {};

bnapi.wow.data.characterRaces = function (apikey, locale) {
    return bnapi.wow.get('data/character/races', { apikey, locale }).then(data => data.races);
};

bnapi.wow.data.characterClasses = function (apikey, locale) {
    return bnapi.wow.get('data/character/classes', { apikey, locale }).then(data => data.classes);
};

bnapi.wow.character = {};

bnapi.wow.character.profile = function (apikey, locale, realm, characterName, fields = []) {
    return bnapi.wow.get('character/' + realm + '/' + characterName, { apikey, locale, fields: fields.join(',') });
};

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

bnapi.wow.guild = {};

bnapi.wow.guild.members = function (apikey, locale, realm, guild) {
    return bnapi.wow.get('guild/' + realm + '/' + guild, { apikey, locale, fields: 'members' }).then(data => data.members);
};