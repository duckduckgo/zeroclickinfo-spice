(function(env) {
    "use strict";
    env.ddg_spice_gravatar = function(api_result) {

        if (!(api_result && api_result.entry && api_result.entry[0].id && api_result.entry[0].preferredUsername)) {
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
                // Get the proper name of the user
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
                    } else {
                        return "No location specified";
                    }
                }
                // Get preferred username in profile
                function getUsername(entry) {
                    if (entry.preferredUsername) {
                        return entry.preferredUsername;
                    }
                }

                // Get array of social media accounts
                function getAccounts(entry) {
                    var accounts = [];
                    var maxAccounts = 4;
                    if (entry.accounts) {
                        $.each(entry.accounts, function() {
                            accounts.push({
                                text: DDG.capitalize(this.shortname),
                                href: this.url
                            });
                        });
                    }

                    if (accounts.length < maxAccounts + 1) {
                        return accounts;
                    } else {
                        accounts.length = maxAccounts;
                        accounts.push({
                            text: (entry.accounts.length - maxAccounts) + " more",
                            href: entry.profileUrl
                        });
                        return accounts;
                    }
                }

                return {
                    image: api_result.entry[0].thumbnailUrl + ".png",
                    title: getName(api_result.entry[0]),
                    subtitle: [getUsername(api_result.entry[0]), getCurrentLocation(api_result.entry[0])],
                    altSubtitle: getAccounts(api_result.entry[0]),
                    description: DDG.unescape(api_result.entry[0].aboutMe)
                };
            },

            templates: {
                group: 'icon',
                options: {
                    moreAt: true
                },
                variants: {
                    iconTitle: 'medium',
                    iconImage: 'medium'
                }
            }
        });
    };
}(this));
