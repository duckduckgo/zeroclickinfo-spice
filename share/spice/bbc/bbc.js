function ddg_spice_bbc(api_result) {
    "use strict";
    var query = DDG.get_query();
    var broadcasts = api_result.schedule.day.broadcasts;
    var programmes = [];
    var now = new Date(Date.now());
    if(query.indexOf("night") != -1)
        now.setHours(18);
    var date = api_result.schedule.day.date;
    var fulldate = Date.parse(date);
    var date_round = 1000 * 60 * 60 * 24;
    var inPast = +fulldate < Math.floor(+now / date_round)*date_round;
    for(var i=0;i<broadcasts.length;i++) {
        var end = Date.parse(broadcasts[i].end);
        if(end > now || inPast)
            programmes.push(broadcasts[i]);
    }
    Spice.render({
        data             : api_result.schedule,
        header1          : api_result.schedule.service.title + (api_result.schedule.service.outlet ? " "+api_result.schedule.service.outlet.title : "") + " (TV Schedule for "+date+")",
        source_url       : "http://www.bbc.co.uk/"+api_result.schedule.service.key+"/programmes/schedules/"+(api_result.schedule.service.outlet ? api_result.schedule.service.outlet.key+"/" : "")+api_result.schedule.day.date.split("-").join("/"),
        source_name      : 'BBC',
        template_frame   : "carousel",
        template_options: {
            items: programmes, 
            template_item: "bbc",
            template_detail: "bbc_details",
        },
        force_big_header : true,
        force_no_fold: true,
        spice_name       : "bbc",
    });
}
/*
 * time
 * 
 * Find the start and end of a programme and format appropriately
 */
Handlebars.registerHelper("time", function() {
    "use strict";
    function toStr(num, digs) {
        var str = new Number(num|0).toString();
        while(str.length < digs) {
            str = "0" + str;
        }
        return str;
    }
    var start = new Date(Date.parse(this.start));
    var end = new Date(Date.parse(this.end));
    return toStr(start.getHours(),2) + ":" + toStr(start.getMinutes(), 2) + " - " + toStr(end.getHours(), 2) + ":" + toStr(end.getMinutes(), 2);
});
/*
 * duration
 * 
 * Find the duration of a programme and return it
 */
Handlebars.registerHelper("duration", function() {
    "use strict";
    function pluralise(n) {
        return n > 1 ? "s" : "";
    }
    var dur = this.duration;
    var hours = Math.floor(dur / (60 * 60));
    dur -= hours * 60 * 60;
    var minutes = Math.floor(dur / 60);
    this.duration -= minutes * 60;
    if(hours > 0 && minutes > 0) {
        return hours + " hour"+pluralise(hours)+", "+minutes+" min"+pluralise(minutes);
    } else if(hours > 0 && minutes == 0) {
        return hours + " hour"+pluralise(hours);
    } else {
        return minutes+" min"+pluralise(minutes);
    }
});
/*
 * full_title
 * 
 * Find the full displayable title of a programme and return it
 */
Handlebars.registerHelper("full_title", function() {
    "use strict";
    return this.programme.display_titles.title;
});
/*
 * subtitle
 * Find the subtitle (if any) of a programme and return it
 */
Handlebars.registerHelper("subtitle", function() {
    return this.programme.display_titles.subtitle;
});
/*
 * title
 * 
 * Find the displayable title of a programme and return it
 */
Handlebars.registerHelper("title", function() {
    "use strict";
    return this.programme.display_titles.title;
});
/*
 * programme_url
 * 
 * Find the series URL and return it, or if it is not part of a series return the normal url
 */
Handlebars.registerHelper("programme_url", function() {
    return "http://www.bbc.co.uk/programmes/"+(this.programme.programme ? this.programme.programme : this.programme).pid;
});
/*
 * url
 * 
 * Find the programme URL and return it
 */
Handlebars.registerHelper("url", function() {
    return "http://www.bbc.co.uk/programmes/"+this.programme.pid;
});
/*
 * image
 *
 * Find the programme image and return it
 */
Handlebars.registerHelper("image", function() {
    "use strict";
    return this.programme.image ? "http://ichef.bbci.co.uk/images/ic/144x81/" + this.programme.image.pid + ".jpg" :  "http://ichef.bbci.co.uk/images/ic/144x81/legacy/episode/"+this.programme.pid+".jpg?nodefault=true";
});
/*
 * image
 *
 * Find the programme's big image and return it
 */
Handlebars.registerHelper("big_image", function() {
    "use strict";
    return this.programme.image ? "http://ichef.bbci.co.uk/images/ic/272x153/" + this.programme.image.pid + ".jpg" :  "http://ichef.bbci.co.uk/images/ic/272x153/legacy/episode/"+this.programme.pid+".jpg?nodefault=true";
})
/*
 * synopsis
 *
 * Find the programme synopsis and return it
 */
Handlebars.registerHelper("synopsis", function() {
    "use strict";
    return this.programme.short_synopsis;
});