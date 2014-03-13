// Description:
// Shows information about a Gravatar user.
//
// Dependencies:
// None.
//
// Commands:
// gravatar gravatar@duckduckgo.com - shows information about the e-mail address.
// gravatar matt - shows information about a user.

function ddg_spice_gravatar (api_result) {
    "use strict";

    // Check for errors.
    if(!api_result || !api_result.entry || api_result.entry.length === 0) {
        return;
    }

    // Get the name of the user (if available).
    var getName = function(entry) {
        if(!entry.name || !entry.displayName) {
            return;
        }

        if(entry.name.formatted) {
            return entry.name.formatted;
        } else if(entry.name.givenName && entry.name.familyName) {
            return entry.name.givenName + " " + entry.name.familyName;
        }
        return entry.displayName;
    };

    // Display the spice plugin.
    Spice.render({
        data              : api_result,
        header1           : getName(api_result.entry[0]) + " (Gravatar)",
        force_big_header  : true,
        source_name       : "Gravatar",
        source_url        : api_result.entry[0].profileUrl,
        image_url         : api_result.entry[0].thumbnailUrl + ".png",
        template_normal   : "gravatar",
        force_favicon_url : 'http://gravatar.com/favicon.ico'
    });
}

// Find the primary e-mail.
Handlebars.registerHelper("getEmail", function(emails, options) {
    "use strict";

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
Handlebars.registerHelper("fallbackInfo", function(emails, aboutMe, currentLocation, accounts, context, options) {
    "use strict";

    if(!emails && !aboutMe && !currentLocation && !accounts) {
        return options.fn(context);
    }
});

// This is for favicons that don't work.
Handlebars.registerHelper("checkDomain", function(domain) {
    "use strict";

    if(domain === "plus.google.com") {
        return "google.com";
    }
    if(domain === "yelp.com") {
        return "/iu/?u=http://s3-media2.ak.yelpcdn.com/assets/2/www/img/118ff475a341/ico/favicon.ico";
    }
    return domain;
});
