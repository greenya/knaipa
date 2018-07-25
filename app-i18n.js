'use strict';

function appI18n() {
    var localization = {
        'achievement-points':                       { en: 'Achievement points', ua: 'Очок досягнень' },
        'average-equipped-item-level':              { en: 'Average equipped item level', ua: 'Середній рівень вдягнених предметів' },
        'character-level':                          { en: 'Character level', ua: 'Рівень варʼята' },
        'close':                                    { en: 'Close', ua: 'Закрити' },
        'guild-title':                              { en: 'Knaipa Variativ', ua: 'Кнайпа Варʼятів' },
        'guild-location':                           { en: 'Ukrainian guild on EU Terokkar', ua: 'Українська гільдія на сервері EU Terokkar' },
        'home':                                     { en: 'Home', ua: 'Головна' },
        'language':                                 { en: 'Language', ua: 'Мова' },
        'libraries':                                { en: 'Libraries', ua: 'Бібліотеки' },
        'list-is-empty':                            { en: 'List is empty', ua: 'Список порожній' },
        'load-guild-members-failed':                { en: 'Failed to load guild members', ua: 'Не вдалося завантажити варʼятів гільдії' },
        'load-character-profile-failed':            { en: 'Failed to load profile for {name} from {realm}', ua: 'Не вдалося завантажити профіль для {name} із {realm}' },
        'load-character-profile-failed-desc':       { en: 'This character profile could not be displayed, possibly for one of the following reasons:<br>1. The character has been inactive for long time.<br>2. The character is undergoing a process such as a realm transfer or faction change.<br>3. The character is below level 10 and thus cannot be displayed.',
                                                        ua: 'Профіль варʼята не може бути відображений, можливо через одну з наступних причин:<br>1. Варʼят був неактивний занадто довго.<br>2. Варʼят проходить процес realm-трасферу або зміни фракції.<br>3. Рівень варʼята нижче 10 і тому не може бути відображений.' },
        'loading...':                               { en: 'Loading...', ua: 'Завантаження...' },
        'members':                                  { en: 'Members', ua: 'Варʼяти' },
        'messages':                                 { en: 'Messages', ua: 'Повідомлення' },
        'page-not-found':                           { en: 'Page Not Found', ua: 'Сторінку не знайдено' },
        'page-not-found-text':                      { en: 'The page you are looking for could not be found.', ua: 'Сторінки, яку ви запитуєте, більше не існує.' },
        'profile':                                  { en: 'Profile', ua: 'Профіль' },
        'reputation':                               { en: 'Reputation', ua: 'Репутація' },
        'selected-character-title':                 { en: 'Active title', ua: 'Активне звання' },
        'settings':                                 { en: 'Settings', ua: 'Налаштування' },
        'standing-hated':                           { en: 'Hated', ua: 'Ненависний' },
        'standing-hostile':                         { en: 'Hostile', ua: 'Ворожий' },
        'standing-unfriendly':                      { en: 'Unfriendly', ua: 'Недружелюбний' },
        'standing-neutral':                         { en: 'Neutral', ua: 'Нейтральний' },
        'standing-friendly':                        { en: 'Friendly', ua: 'Дружелюбний' },
        'standing-honored':                         { en: 'Honored', ua: 'Почесний' },
        'standing-revered':                         { en: 'Revered', ua: 'Шанований' },
        'standing-exalted':                         { en: 'Exalted', ua: 'Величний' },
        'standing-stranger':                        { en: 'Stranger', ua: 'Незнайомець' },
        'standing-pal':                             { en: 'Pal', ua: 'Знайомий' },
        'standing-buddy':                           { en: 'Buddy', ua: 'Приятель' },
        'standing-friend':                          { en: 'Friend', ua: 'Друг' },
        'standing-good-friend':                     { en: 'Good Friend', ua: 'Хороший друг' },
        'standing-best-friend':                     { en: 'Best Friend', ua: 'Найкращий друг' },
        'theme':                                    { en: 'Theme', ua: 'Оформлення' },
        'theme-dark':                               { en: 'Dark', ua: 'Темне' },
        'theme-light':                              { en: 'Light', ua: 'Світле' },
        'titles':                                   { en: 'Titles', ua: 'Звання' },
        'total-members-shown':                      { en: '{shown} of {total} members shown', ua: '{shown} із {total} варʼятів відображено' },
        'version':                                  { en: 'Version', ua: 'Версія' }
    };

    var messages = {};
    Object.keys(localization).forEach((key) => {
        Object.keys(localization[ key ]).forEach((locale) => {
            if (!messages[ locale ]) {
                messages[ locale ] = {};
            }
            messages[ locale ][ key ] = localization[ key ][ locale ];
        });
    });

    return new VueI18n({
        messages
    });
}