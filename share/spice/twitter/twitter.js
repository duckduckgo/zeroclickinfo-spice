var ddg_spice_twitter = function(api_result) {

    if(!api_result || (!api_result.current_status && !api_result.description)) {
        return;
    }

    var bigger_picture = function(image) {
        return image.replace(/_normal\./, "_bigger.");
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

Handlebars.registerHelper("findLinks", function(text, entities, options) {
    // Chop the string so that we can surreptitiously insert links.
    var twitterSplit = function(twitter, result, final_text, original, start_index, i) {
        if(twitter.length === i || twitter.length === 0) {
            result.push({text: final_text});
            return result;
        } else {
            var indices = twitter[i].indices;
            // Text only.
            result.push({
                text: original.substring(start_index, indices[0])
            });
            // Text with link.
            result.push({
                text: original.substring(indices[0], indices[1]), 
                link: twitter[i]
            });
            start_index = indices[1];
            return twitterSplit(twitter, result, original.substring(start_index, original.length), original, start_index, i + 1);
        }
    };

    // Concatenate all the entities. (It's easier this way.)
    var all_entities = [];
    for(var k in entities) {
        if(entities.hasOwnProperty(k)) {
            all_entities = all_entities.concat(entities[k]);
        }
    }
    
    // Sort indices. (These things have to be in order.)
    all_entities.sort(function(a, b) {
        if(a.indices[0] < b.indices[0]) {
            return -1;
        }
        if(a.indices[0] > b.indices[0]) {
            return 1;
        }
        return 0;
    });

    return options.fn(twitterSplit(all_entities, [], text, text, 0, 0));
});

Handlebars.registerHelper("makeLinks", function(results) {
    window.r = results;

    var createLink = function(href, inner) {
        return "<a href='" + href + "'>" + inner + "</a>";
    };

    var output = "";
    for(var i = 0; i < results.length; i += 1) {
        if(!results[i].link) {
            output += results[i].text;
        } else {
            var twitter = results[i].link;
            // If it's a mention.
            if(twitter.screen_name) {
                output += createLink("https://twitter.com/" + results[i].text.replace(/^@/, ""), results[i].text);
            }
            // If it's a link.
            if(twitter.url) {
                output += createLink(twitter.url, twitter.display_url);
            }
            // If it's a picture or a video.
            if(twitter.media_url) {
                output += createLink(twitter.media_url_https, twitter.display_url);
            }
            // If it's a hashtag.
            if(twitter.text) {
                output += createLink("https://twitter.com/search?q=%23" + twitter.text, "&#35;" + twitter.text);
            }
        }
    }

    return output;
});