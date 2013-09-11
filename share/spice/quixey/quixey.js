// spice callback function
function ddg_spice_quixey (api_result) {

    if (api_result.result_count == 0) return;

    var q = api_result.q.replace(/\s/g, '+');
    var relevants = getRelevant(api_result.results);

    if (!relevants) return;

    Spice.render({
        data: api_result,
        source_name: 'Quixey',
        source_url: 'https://www.quixey.com/search?q=' + q,
        header1: api_result.q + ' (App Search)',
        force_big_header: true,
        more_logo: "quixey_logo.png",
        template_frame: "carousel",
        template_normal: "quixey",
        carousel_css_id: "quixey",
        carousel_template_detail: "quixey_detail",
        carousel_items: relevants
    });

    // Check for relevant app results
    function getRelevant (results) {
        var res,
            apps = [],
            backupApps = [],
            categories = [
                "developer tools",
                "action",
                "adventure",
                "arcade",
                "board",
                "business",
                "casino",
                "design",
                "dice",
                "education",
                "educational",
                "entertainment",
                "family",
                "finance",
                "graphics",
                "graphics and design",
                "health and fitness",
                "kids",
                "lifestyle",
                "medical",
                "music",
                "networking",
                "news",
                "photography",
                "productivity",
                "puzzle",
                "racing",
                "role playing",
                "simulation",
                "social networking",
                "social",
                "sports",
                "strategy",
                "travel",
                "trivia",
                "utilities",
                "video",
                "weather"],
            skip_words = [
                "google play store",
                "windows phone 8",
                "apple app store",
                "windows mobile",
                "windows phone",
                "applications",
                "release data",
                "application",
                "google play",
                "blackberry",
                "ipod touch",
                "downloaded",
                "apple app",
                "playbook",
                "download",
                "android",
                "release",
                "iphone",
                "search",
                "droid",
                "apps",
                "free",
                "ipod",
                "ipad",
                "ios",
                "app"
            ],
            app;

        categories = new RegExp(categories.join("|"), "i");
        for (var i = 0; i < results.length; i++) {

            app = results[i];

            // check if this app result is relevant
            if (DDG.isRelevant(app.name.toLowerCase(), skip_words) && app.icon_url) {
                apps.push(app);
            } else if (app.hasOwnProperty("short_desc") &&
                       DDG.isRelevant(app.short_desc.toLowerCase(), skip_words) && app.icon_url) {
                            backupApps.push(app);
            } else if (app.custom && app.custom.hasOwnProperty("category") &&
                       DDG.isRelevant(app.custom.category.toLowerCase(), skip_words) && app.icon_url) {
                            backupApps.push(app);
            } else{
                continue;
            }
        }

        // Return highly relevant results
        if (apps.length > 0) {
            res = apps;
        }

        // Return mostly relevant results
        else if (backupApps.length > 0) {
            res = backupApps;
        }

        else {

            // No relevant results,
            // check if it was a categorical search
            // Eg."social apps for android"
            var q = DDG.get_query();
            res = q.match(categories) ? results : null;
        }
        return res;
    }
}

// format a price
// p is expected to be a number
function qprice(p) {
    if (p == 0) {    // == type coercion is ok here
        return "FREE";
    }

    return "$" + (p/100).toFixed(2).toString();
}

// template helper for price formatting
// {{price x}}
Handlebars.registerHelper("price", function(obj) {
    return qprice(obj);
});

// template helper to format a price range
Handlebars.registerHelper("pricerange", function() {

    if (!this.editions)
        return "";

    var low  = this.editions[0].cents;
    var high = this.editions[0].cents;
    var tmp, range, lowp, highp;

    for (var i in this.editions) {
        tmp = this.editions[i].cents;
        if (tmp < low) low = tmp;
        if (tmp > high) high = tmp;
    }

    lowp = qprice(low);

    if (high > low) {
       highp = qprice(high);
       range = lowp + " - " + highp;
       this.hasPricerange = true;
    } else {
        range = lowp;
    }

    return range;
});

// template helper to replace iphone and ipod icons with
// smaller 'Apple' icons
Handlebars.registerHelper("platform_icon", function(icon_url) {
    if (this.id === 2004 || this.id === 2015) {
        return "https://icons.duckduckgo.com/i/itunes.apple.com.ico";
    }

    return "/iu/?u=" + icon_url + "&f=1";
});

// template helper that returns and unifies platform names
Handlebars.registerHelper("platform_name", function() {
    var name;
    var platforms = this.platforms;

    name = platforms[0].name;

    if (platforms.length > 1) {
        switch (platforms[0].name) {
            case "iPhone" :
            case "iPad" :
                name = "iOS";
                break;

            case "Blackberry":
            case "Blackberry 10":
                name = "Blackberry";
                break;
        }
    }

    return name;
});

// template helper to give url for star icon
Handlebars.registerHelper("quixey_star", function() {
    return DDG.get_asset_path("quixey", "star.png").replace("//", "/");
});
