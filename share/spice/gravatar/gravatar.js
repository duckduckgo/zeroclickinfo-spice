(function(env) {
    "use strict";
    env.ddg_spice_gravatar = function(api_result) {

        if(!api_result || !api_result.entry || api_result.entry.length === 0) {
            return Spice.failed('gravatar');
        }

        Spice.add({
            data: api_result,
            id: "gravatar",
            name: "Avatar",

            meta: {
                sourceName: "Gravatar",
                sourceUrl: api_result.entry[0].profileUrl,
                sourceIconUrl: 'http://gravatar.com/favicon.ico'
            },

            normalize: function() {
                // Get the name of the user.
                function getName(entry) {
                    if (!entry.name || !entry.displayName) {
                        var splitted = api_result.entry[0].profileUrl.split("/");
                        return splitted[splitted.length - 1];
                    }
                    if (entry.name.formatted) {
                        return entry.name.formatted;
                    } else if (entry.name.givenName && entry.name.familyName) {
                        return entry.name.givenName + " " + entry.name.familyName;
                    }
                    return entry.displayName;
                }
                // Get current location
                function getCurrentLocation(entry) {
                    if (entry.currentLocation) {
                        return entry.currentLocation;
                    }
                }
                // Get array of social media accounts
                function getAccounts(entry) {
                    var accounts = [];
                    if (entry.accounts) {
                        $.each(entry.accounts, function() {
                            accounts.push({
                                text: DDG.capitalize(this.shortname),
                                href: this.url
                            });
                        });
                    }
                    return accounts;
                }

                return {
                    image: api_result.entry[0].thumbnailUrl + ".png",
                    title: getName(api_result.entry[0]),
                    subtitle: getCurrentLocation(api_result.entry[0]),
                    altSubtitle: getAccounts(api_result.entry[0]),
                    description: api_result.entry[0].aboutMe
                };
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
            }
        });
    };
}(this));