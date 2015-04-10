(function (env) {
    "use strict";
    env.ddg_spice_coderwall = function(api_result){

        // Check if API provided information
        if ($.isEmptyObject(api_result.data)) {
            return Spice.failed('coderwall');
        }

        Spice.add({
            id: "coderwall",
            name: "Coderwall",
            data: api_result.data,
            meta: {
                sourceName: "Coderwall",
                sourceUrl: 'https://coderwall.com/' + api_result.data.username
            },

            normalize: function(item) {
                // Profile URL templates: {{}} is replaced with username
                var account_url = {
                    github: 'https://github.com/{{}}'
                };
                $.each(item.accounts, function(service, name) {
                    // Check that we have a profile url template and
                    // coderwall actually provided a name instead null
                    if (account_url[service] && name) {
                        item.accounts[service] = {
                            name: name,
                            url: account_url[service].replace('{{}}', name)
                        }
                    } else {
                        delete item.accounts[service];
                    }
                });
                return {
                    accounts: item.accounts,
                    // Display 3 Badges or less
                    badges: item.badges.slice(0, (item.badges.length >= 3)
                            ? 3 : item.badges.length)
                };
            },

            templates: {
                group: 'base',
                options: {
                    content: Spice.coderwall.content,
                    moreAt: true
                }
            }
        });
    };
}(this));
