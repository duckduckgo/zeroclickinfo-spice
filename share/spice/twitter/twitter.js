var ddg_spice_twitter = function(api_result) {
    // Display the plugin.
    Spice.render({
        data                     : api_result.current_status,
        header1                  : "@" + api_result.user,
        source_url               : "https://twitter.com/" + api_result.user,
        source_name              : "Twitter",
        template_normal          : "twitter",
        force_big_header         : true,
        force_no_fold            : true,
        image_url                : api_result.profile_image
    });
};

Handlebars.registerHelper("processEntities", function(text, entities, options) {
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
            return createLink(twitter.media_url_https, display_url);
        }
        // If it's a hashtag.
        if(twitter.text) {
            return createLink("https://twitter.com/search?q=%23" + twitter.text, "#" + text);
        }
        return string;
    }

    var twitterSplit = function(twitter, result, final, original, start_index, i) {
        if(twitter.length === i || twitter.length === 0) {
            result.push(final);
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
        all_entities = all_entities.concat(entities[k]);
    }
    
    return twitterSplit(all_entities, [], text, text, 0, 0).join("");
});