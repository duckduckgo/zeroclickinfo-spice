function ddg_spice_game_info(api_result) {
    "use strict";
    if (api_result == null || api_result.error != "OK" || api_result.results == null || api_result.results.length <= 0) return;
    var datas = api_result.results;
    var query = DDG.get_query().replace("games?", "");
    var ignore = ["game", "games"];
    datas = datas.filter(function(data) { return DDG.isRelevant(data.name, ignore);});
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
            }
        },
    });
}
ddg_spice_game_info.date_info = {
    month: [
        "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
    ],
    day: [
        "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    ]
}

Handlebars.registerHelper("release_date", function() {
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
    return ddg_spice_game_info.date_info.day[date.getDay()] + " " + date.getDate() + postfix + " " + ddg_spice_game_info.date_info.month[date.getMonth()] + " " + date.getFullYear();
});
