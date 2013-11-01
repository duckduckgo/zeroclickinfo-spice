function ddg_spice_game_info(api_result) {
    if(!$.isPlainObject(api_result) || api_result.error !== "OK" || !$.isArray(api_result.results) || api_result.results.length === 0)
        return;
    var ignore = ["game", "games", "giantbomb"];
    var datas = api_result.results;
    var query = DDG.get_query();
    for(var i = 0; i < ignore.length; i++) {
        query = query.replace(ignore[i], "");
    }
    query = $.trim(query);
    // filter out irrelevant and malformed results
    datas = $.grep(datas, function(data, ind) {
        return data.name != null && data.image != null && data.image.thumb_url != null && (DDG.isRelevant(data.name, ignore) || (data.aliases != null && DDG.isRelevant(data.aliases, ignore)));
    });

    if(datas.length == 0)
        return;
    Spice.render({
        data                     : api_result,
        source_url               : "http://www.giantbomb.com/search/?q="+encodeURI(query),
        spice_name               : "game_info",
        source_name              : "GiantBomb",
        template_frame           : "carousel",
        template_options         : {
            items                : datas,
            template_item        : "game_info",
            template_detail      : "game_info_details",
            single_item_handler  : function(obj) {            // gets called in the event of a single result
                var data = obj.data.results[0];
                obj.header1 = data.name;         // set the header
                obj.image_url = data.image.thumb_url;    // set the image
                obj.source_url = data.site_detail_url; // set the source
                data.name = null;
            }
        }
    });
}
/**
 * release_date
 *
 * Find the release date for a game
 */
Handlebars.registerHelper("release_date", function() {
    var date_info = {
        month: [
            "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
        ],
        day: [
            "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
        ]
    };
    var release = this.original_release_date.split(" ")[0];
    var parts = release.split("-");
    var date = new Date(parts[0], parts[1] - 1, parts[2]);
    var postfix = null;
    switch(parts[2] % 10) {
        case 1: postfix = "st"; break;
        case 2: postfix = "nd"; break;
        case 3: postfix = "rd"; break;
        default: postfix = "th";
    }
    if(parts[2] > 10 && parts[2] < 20) {
        postfix = "th";
    }
    return date_info.day[date.getDay()] + " " + date.getDate() + postfix + " " + date_info.month[date.getMonth()] + " " + date.getFullYear();
});
/** 
 * platform_summary
 *
 * Summarise the platforms a game is available on
 */
Handlebars.registerHelper("platform_summary", function(platforms, options) {
    options.hash.sep = ", ";
    options.hash.conj = " and ";
    if(platforms.length > 4) {
        platforms = [platforms[0], platforms[1], platforms[2], {name: (platforms.length - 3) + " more"}]
    }
    return Handlebars.helpers.concat(platforms, options);
});
