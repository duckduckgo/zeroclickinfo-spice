function ddg_spice_bbc(api_result) {
    var query = DDG.get_query();
    var broadcasts = api_result.schedule.day.broadcasts;
    var programmes = [];
    var now = new Date();
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
            li_width: 120,
            li_height: 110
        },
        force_big_header : true,
        force_no_fold: true,
        spice_name       : "bbc"
    });
}
/*
 * time
 * 
 * Find the start and end of a programme and format appropriately
 */
Handlebars.registerHelper("time", function() {
    var to_str = function ddg_spice_bbc_to_str(num) {
        if(num == 0) {
             return "00";
        }
        var str = (num|0)+"";
        if(str.length < 2) {
            str = "0" + str;
        }
        return str;
    };
    var start = new Date(Date.parse(this.start));
    var end = new Date(Date.parse(this.end));
    return to_str(start.getHours()) + ":" + to_str(start.getMinutes()) + " - " + to_str(end.getHours()) + ":" + to_str(end.getMinutes());
});
/*
 * duration
 * 
 * Find the duration of a programme and return it
 */
Handlebars.registerHelper("duration", function() {
    var pluralise = function(n) {
        return n > 1 ? "s" : "";
    };
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
    return this.programme.image ? "http://ichef.bbci.co.uk/images/ic/272x153/" + this.programme.image.pid + ".jpg" :  "http://ichef.bbci.co.uk/images/ic/272x153/legacy/episode/"+this.programme.pid+".jpg?nodefault=true";
});
/*
 * initial_broadcast
 *
 * Find the programme's initial broadcast date/time and return it
 */
Handlebars.registerHelper("initial_broadcast", function() {
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var d = new Date(Date.parse(this.programme.first_broadcast_date));
    console.log(d);
    return d.getDate() + " " + months[d.getMonth()] + " " + (1900 + d.getYear());
});
