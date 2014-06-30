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
                return {
                    image: api_result.entry[0].thumbnailUrl + ".png",
        title: getName(api_result.entry[0])
                };
            },
            templates: {
                group: 'info',
        options: {
            content: Spice.gravatar.content
        }
            },
        });
    };

    // Get the name of the user (if available).
    function getName (entry) {
        if (!entry.name || !entry.displayName) {
            return;
        }

        if (entry.name.formatted) {
            return entry.name.formatted;
        } else if (entry.name.givenName && entry.name.familyName) {
            return entry.name.givenName + " " + entry.name.familyName;
        }
        return entry.displayName;
    }

    // Find the primary e-mail.
    Handlebars.registerHelper("Gravatar_getEmail", function(emails, options) {
        // Check if the variable exists.
        if (!emails) {
            return;
        }

        // Find the primary email.
        for (var i = 0; i < emails.length; i += 1) {
            if (emails[i].primary) {
                return options.fn(emails[i]);
            }
        }
    });

    // If we don't have any information to display, just show this.
    Handlebars.registerHelper("Gravatar_fallbackInfo", function(emails, aboutMe, currentLocation, accounts, context, options) {
        if (!emails && !aboutMe && !currentLocation && !accounts) {
            return options.fn(context);
        }
    });

    // This is for favicons that don't work.
    Handlebars.registerHelper("Gravatar_checkDomain", function(domain) {
        if (domain === "plus.google.com") {
            return "google.com";
        }
        if (domain === "yelp.com") {
            return "/iu/?u=http://s3-media2.ak.yelpcdn.com/assets/2/www/img/118ff475a341/ico/favicon.ico";
        }
        return domain;
    });
}());
