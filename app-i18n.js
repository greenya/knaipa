function appI18n() {
    return new VueI18n({
        messages: {
            en: {
                'guild-title':          'Knaipa Variativ',
                'guild-location':       'Ukrainian guild on EU Terokkar',
                'home':                 'Home',
                'roster':               'Roster',
                'settings':             'Settings',
                'total-members-shown': '{shown} of {total} members shown',
                'language':             'Language',
                'loading':              'Loading...',
                'theme':                'Theme',
                'theme-light':          'Light',
                'theme-dark':           'Dark',
            },
            ua: {
                'guild-title':          'Кнайпа Варʼятів',
                'guild-location':       'Українська гільдія на сервері EU Terokkar',
                'home':                 'Головна',
                'roster':               'Реєстр',
                'settings':             'Налаштування',
                'total-members-shown': '{shown} з {total} варʼятів відображено',
                'language':             'Мова',
                'loading':              'Завантаження...',
                'theme':                'Оформлення',
                'theme-light':          'Світле',
                'theme-dark':           'Темне',
            }
        }
    });
}