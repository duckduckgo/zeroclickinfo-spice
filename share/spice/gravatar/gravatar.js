(function(env) {
    "use strict";

    env.ddg_spice_gravatar = function(api_result) {

        // Check for errors.
        if(!api_result || !api_result.entry || api_result.entry.length === 0) {
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
                    if(!entry.name || !entry.displayName) {
                        var splitted = api_result.entry[0].profileUrl.split("/");
                        return splitted[splitted.length - 1];
                    }

                    if(entry.name.formatted) {
                        return entry.name.formatted;
                    } else if(entry.name.givenName && entry.name.familyName) {
                        return entry.name.givenName + " " + entry.name.familyName;
                    }
                    return entry.displayName;
                }

                return {
                    image: api_result.entry[0].thumbnailUrl + ".png",
                    title: getName(api_result.entry[0]),
                    currentLocation: api_result.entry[0].currentLocation,
                    accounts: api_result.entry[0].accounts,
                    aboutMe: api_result.entry[0].aboutMe
                };
            },
            templates: {
                group: 'base',
                options: {
                    content: Spice.gravatar.content,
                    moreAt: true
                }
            },
            onShow: function() {
                $(".zci--gravatar .more").click(function() {
                    $('.expanded_social').removeClass("hidden").addClass("visible");
                    $('.condensed_social').removeClass("visible").addClass("hidden");
                });
            },
        });
    };

    // Find the primary e-mail.
    Handlebars.registerHelper("Gravatar_getEmail", function(emails, options) {
        // Check if the variable exists.
        if(!emails) {
            return;
        }

        // Find the primary email.
        for(var i = 0; i < emails.length; i += 1) {
            if(emails[i].primary) {
                return options.fn(emails[i]);
            }
        }
    });

    // If we don't have any information to display, just show this.
    Handlebars.registerHelper("Gravatar_fallbackInfo", function(emails, aboutMe, currentLocation, accounts, context, options) {
        if(!emails && !aboutMe && !currentLocation && !accounts) {
            return options.fn(context);
        }
    });

    // Return the name of the domain, capitalized and without the ".com" part
    Handlebars.registerHelper("Gravatar_formatDomain", function(domain) {
        if(domain === "plus.google.com") {
            return "Google+";
        }
        if(domain.match(/.*wordpress.*/i)) {
            return "Wordpress";
        } else {
            return DDG.capitalize(domain).replace(".com", "");
        }
    });
}(this));