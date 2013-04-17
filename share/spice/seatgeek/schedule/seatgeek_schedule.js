var ddg_spice_seatgeek_schedule = function(api_result) {
    var query = "";

    // Get the original query.
    // We're going to pass this to the More at SoundCloud link.
    var matched, result;
    $("script").each(function() {
        matched = $(this).attr("src");
        if(matched) {
            result = matched.match(/\/js\/spice\/sound_cloud\/(.+)/);
            if(result) {
                query = result[1];
            }
        }
    });

    Spice.render({
        data              : api_result,
        header1           : "Concert Schedules (SeatGeek)",
        force_big_header  : true,
        source_name       : "SeatGeek",
        source_url        : "http://seatgeek.com/search?search=" + query,
        template_normal   : "seatgeek_schedule"
    });

    $(".zero_click_snippet").attr("style", "margin-left: 0px !important; display: block;");
};

Handlebars.registerHelper("date", function(date, tbd) {
    if(tbd) {
        return "TBD";
    }
    var parse = date.match(/([\d]{4})\-([\d]{2})\-([\d]{2})/);
    return new Date(parse[1], parse[2] - 1, parse[3]).toDateString();
});

// Make sure we only display five venues.
Handlebars.registerHelper("list", function(items, options) {
    var out = "";
    for(var i = 0; i < items.length && i < 5; i += 1) {
        out += options.fn(items[i]);
    }
    return out;
});