var ddg_spice_game_info_date_meta = {
    day: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    month: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
}
function ddg_spice_game_info(api_result) {
    if (api_result == null || api_result.error != 'OK') return;
    var main = api_result.results[0];
    if(main == null || !DDG.isRelevant(main.name, ["game", "games"]))
        return;
    console.log(main.description);
    Spice.render({
        data                     : main,
        image_url                : main.image.small_url,
        header1                  : main.name + ' (Games)',
        source_url               : main.site_detail_url,
        source_name              : "GameBomb",
        template_normal          : 'game_info',
        force_big_header         : true
    });
}
Handlebars.registerHelper("release", function() {
    "use strict";
    var meta = ddg_spice_game_info_date_meta;
    if(this.expected_release_day && this.expected_release_month && this.expected_release_year) {
        var release = new Date(this.expected_release_year, this.expected_release_month, this.expected_release_day);
        return "<br>"+(release < Date.now() ? "Released":"Releasing on") + " " + meta.day[release.getDay()] + " " + release.getDate() + " " + meta.month[release.getMonth()] + " " + release.getFullYear();
    } else {
        return "";
    }
});
Handlebars.registerHelper("platforms", function() {
    "use strict";
    if(this.platforms.length == 0)
        return "Not currently available";
    var buf = "", max = this.platforms.length;
    for(var i=0;i<max;i++) {
        var curr = this.platforms[i];
        buf += "<a href=\""+curr.site_detail_url+"\">"+curr.name+"</a>";
        buf += i == max - 1 ? "" : (i == max - 2 ? " and " : ", ");
    }
    return "Available on "+buf;
});