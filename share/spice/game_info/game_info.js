function ddg_spice_game_info(api_result) {
    if (api_result == null || api_result.error != "OK" || api_result.results == null || api_result.results.length <= 0) return;
    var datas = api_result.results;
    var query = DDG.get_query().replace("games", "").replace("game", "").replace("giantbomb", "").trim();
    var ignore = ["game", "games", "giantbomb"];
    // filter out irrelevant and malformed results
    datas = datas.filter(function(data) { return data.name != null && data.image != null && data.image.thumb_url != null && (DDG.isRelevant(data.name, ignore) || (data.aliases != null && DDG.isRelevant(data.aliases, ignore)));});
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
                obj.header1 = obj.data.results[0].name;         // set the header
                obj.image_url = obj.data.results[0].image.thumb_url;    // set the image
                obj.source_url = obj.data.results[0].site_detail_url; // set the source
            }
        },
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
Handlebars.registerHelper("platform_summary", function() {
    var ps = this.platforms;
    var max = Math.min(ps.length, 3);
    var isCut = max < ps.length;
    var s = "";
    for(var i = 0; i < max; i++) {
        if(i > 0 && i == max - 1 && !isCut) {
            s += " and ";
        } else if(i > 0) {
            s += ", ";
        }
        s += "<a href="+ps[i].site_detail_url+">"+ps[i].name+"</a>";
    }
    if(isCut) {
        s += " and "+(ps.length - max)+" more";
    }
    return s;
});
