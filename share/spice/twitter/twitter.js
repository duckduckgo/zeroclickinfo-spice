var ddg_spice_twitter = function(api_result) {

    if(!api_result || (!api_result.current_status && !api_result.description)) {
        return;
    }

    var bigger_picture = function(image) {
        return image.replace(/normal\.([a-zA-Z]+)$/, "bigger.$1");
    }

    // Display the plugin.
    Spice.render({
        data                     : api_result,
        header1                  : "@" + api_result.user,
        source_url               : "https://twitter.com/" + api_result.user,
        source_name              : "Twitter",
        template_normal          : "twitter",
        force_big_header         : true,
        force_no_fold            : true,
        image_url                : bigger_picture(api_result.profile_image)
    });
};

Handlebars.registerHelper("processEntities", function(text, entities) {
    var createLink = function(href, inner) {
        return "<a href='" + href + "'>" + inner + "</a>";
    };

    var replaceString = function(string, twitter) {
        // If it's a mention.
        if(twitter.screen_name) {
            return createLink("https://twitter.com/" + string.replace(/^@/, ""), string);
        }
        // If it's a link.
        if(twitter.url) {
            return createLink(twitter.url, twitter.display_url);
        }
        // If it's a picture or a video.
        if(twitter.media_url) {
            return createLink(twitter.media_url_https, twitter.display_url);
        }
        // If it's a hashtag.
        if(twitter.text) {
            return createLink("https://twitter.com/search?q=%23" + twitter.text, "&#35;" + twitter.text);
        }
        return string;
    };

    // Recursion, baby!
    var twitterSplit = function(twitter, result, final_text, original, start_index, i) {
        if(twitter.length === i || twitter.length === 0) {
            result.push(final_text);
            return result;
        } else {
            var indices = twitter[i].indices;
            result.push(original.substring(start_index, indices[0]));
            result.push(replaceString(original.substring(indices[0], indices[1]), twitter[i]));
            start_index = indices[1];
            return twitterSplit(twitter, result, original.substring(start_index, original.length), original, start_index, i + 1);
        }
    };

    // Concatenate all the entities.
    var all_entities = [];
    for(var k in entities) {
        if(entities.hasOwnProperty(k)) {
            all_entities = all_entities.concat(entities[k]);
        }
    }
    
    // Sort indices. No matter what you do, sort the damn indices!
    all_entities.sort(function(a, b) {
        if(a.indices[0] < b.indices[0]) {
            return -1;
        }
        if(a.indices[0] > b.indices[0]) {
            return 1;
        }
        return 0;
    });

    return twitterSplit(all_entities, [], text, text, 0, 0).join("");
});