(function (env) {
    'use strict';
    env.ddg_spice_keybase = function(api_result){

        if (!api_result || api_result.error) {
            return Spice.failed('keybase');
        }

        var user;

        if (api_result.them.constructor == Array) {
            user = api_result.them[0];
        } else {
            user = api_result.them;
        }

        if (user == null) {
            return Spice.failed('keybase');
        }

        Spice.add({
            id: 'keybase',
            name: 'Keybase',
            data: user,
            meta: {
                sourceName: 'keybase.io',
                sourceUrl: 'https://keybase.io/' + user.basics.username
            },
            templates: {
                group: 'base',
                options: {
                    content: Spice.keybase.content,
                    moreAt: true
                }
            },
            signal: 'high'
        });
    };
}(this));

Handlebars.registerHelper('keybase_key_fingerprint', function(fingerprint) {
    'use strict';

    var output = '';

    if (fingerprint.length != 40 || !fingerprint) {
        return output;
    }

    var pos = fingerprint.length - 16;

    for (pos; pos < fingerprint.length; pos += 4) {
        output += fingerprint.substring(pos, pos + 4).toUpperCase() + ' ';
    }

    return output;
});
