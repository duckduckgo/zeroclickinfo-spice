function ddg_spice_game_info(api_result) {
    "use strict";
    if (api_result == null || api_result.error != "OK" || api_result.results == null || api_result.results.length != 1) return;
    var data = api_result.results[0];
    var ignore = ["game"];
    if(!DDG.isRelevant(data.name, ignore)) return;
    Spice.render({
        data                     : data,
        image_url                : data.image.thumb_url,
        header1                  : data.name + ' (Game)',
        source_url               : data.site_detail_url,
        source_name              : "GiantBomb",
        template_normal          : 'game_info',
        force_big_header         : true,
        force_no_fold            : 1
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

// Provide up to 2 game ratings
Handlebars.registerHelper("ratings", function(){
    var r = this.original_game_rating;
    if(r == null || r.length == 0)
        return "N/A";
    var max = r.length > 2 ? 2 : r.length;
    var s = "";
    for(var i=0; i<max; i++) {
        var curr = r[i];
        if(i > 0)
            s += i == max -1 ? " and " : ", ";
        s += curr.name;
    }
    return s;
});

// Provide up to 3 platforms
Handlebars.registerHelper("platforms", function(){
    var ps = this.platforms;
    if(ps == null || ps.length == 0)
        return "N/A";
    var max = ps.length > 2 ? 2 : ps.length;
    var s = "";
    for(var i=0; i<max; i++) {
        var curr = ps[i];
        if(i > 0)
            s += ", ";
        s += curr.name;
    }
    if(max < ps.length)
        s += " and "+(ps.length - max)+" more";
    return s;
});

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
})
