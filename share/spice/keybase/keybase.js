(function (env) {
    "use strict";
    env.ddg_spice_keybase = function(api_result){

        if (api_result.error) {
            return Spice.failed('keybase');
        }

        var user = api_result.them[0];

        Spice.add({
            id: "keybase",
            name: "Keybase",
            data: user,
            meta: {
                sourceName: "keybase.io",
                sourceUrl: 'https://keybase.io/' + user.basics.username
            },
            templates: {
                group: 'info',
                detail: 'basic_info_detail',
            },
            normalize: function(item) {
                return {
                    image: user.pictures ? user.pictures.primary.url : 'https://keybase.io/images/no_photo.png',
                    title: user.profile.full_name,
                    description: user.public_keys.primary.bundle,
                };
            }
        });
    };
}(this));
