(function(env) {
    "use strict";

    env.ddg_spice_gravatar = function(api_result) {

        // Check for errors.
        if (!api_result || !api_result.entry || api_result.entry.length === 0) {
            return Spice.failed('gravatar');
        }


        // Display the spice plugin.
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

                function getCurrentLocation(entry) {
                    if (entry.currentLocation) {
                        return entry.currentLocation;
                    } else {
                        return "No Location Specified";
                    }
                }

                function getAccounts(entry) {
                    var accounts = [];
                    if (entry.accounts) {
                        $.each(entry.accounts, function() {
                            accounts.push({
                                text: DDG.capitalize(this.shortname),
                                href: this.url
                            });
                        });
                    } else {
                        accounts = ["Additional Information Unavailable"];
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
                group: 'icon'
            }
        });
    };
}(this));