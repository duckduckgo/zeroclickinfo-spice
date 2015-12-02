(function (env) {
    'use strict';
    env.ddg_spice_keybase = function(api_result){

        if (!api_result || api_result.error || api_result.status.code != 0) {
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

        // Retrieve 64-bit version of fingerprint
        function keybase_key_fingerprint(fingerprint) {
            var output = '';

            if (fingerprint.length != 40 || !fingerprint) {
                return output;
            }

            var pos = fingerprint.length - 16;

            for (pos; pos < fingerprint.length; pos += 4) {
                output += fingerprint.substring(pos, pos + 4).toUpperCase() + ' ';
            }

            return output;
        }

        Spice.add({
            id: 'keybase',
            name: 'Keybase',
            data: user,
            meta: {
                sourceName: 'keybase.io',
                sourceUrl: 'https://keybase.io/' + user.basics.username
            },
            normalize: function(item) {
                var userAccounts = [];
                userAccounts.push({
                        text: keybase_key_fingerprint(item.public_keys.primary.key_fingerprint),
                        href: 'https://keybase.io/' + item.basics.username + '/key.asc'});
                
                var filteredSummary = $.grep( item.proofs_summary.all , function( account, i ) {
                  return account.presentation_group === 'github' || 
                         account.presentation_group === 'reddit' || 
                         account.presentation_group === 'twitter';
                });
   
                $.each(filteredSummary, function(index, account){
                    userAccounts.push({
                        text: DDG.capitalize(account.presentation_group),
                        href: account.service_url
                    });
                });
                
                return {
                    image: item.pictures.primary.url,
                    title: item.profile.full_name,
                    url: 'https://keybase.io/' + item.basics.username,
                    subtitle: item.profile.location,
                    altSubtitle: userAccounts,
                    description: item.profile.bio
                }
            },
            templates: {
                group: 'icon',
                options: {
                    moreAt: true
                },
                variants: {
                    iconTitle: 'large',
                    iconImage: 'large'
                }
            },
            signal: 'high'
        });
    };
}(this));
