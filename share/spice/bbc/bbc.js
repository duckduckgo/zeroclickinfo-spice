function ddg_spice_bbc(api_result) {
    var query = DDG.get_query(),
        broadcasts = api_result.schedule.day.broadcasts,
        programmes = [],
        now = new Date();
    
    if (query.indexOf("night") != -1)
        now.setHours(18);
    
    var date = api_result.schedule.day.date,
        fulldate = new Date(date),
        date_round = 1000 * 60 * 60 * 24,
        inPast = +fulldate < Math.floor(+now / date_round)*date_round;
    
    for (var i=0; i<broadcasts.length; i++) {
        var end = new Date(broadcasts[i].end);
        if (end > now || inPast)
            programmes.push(broadcasts[i]);
    }
    
    Spice.render({
        data           : api_result.schedule,
        header1        : api_result.schedule.service.title + (api_result.schedule.service.outlet ? " "+api_result.schedule.service.outlet.title : "") + " (TV Schedule for "+date+")",
        source_url     : "http://www.bbc.co.uk/"+api_result.schedule.service.key+"/programmes/schedules/"+(api_result.schedule.service.outlet ? api_result.schedule.service.outlet.key+"/" : "")+api_result.schedule.day.date.split("-").join("/"),
        source_name    : 'BBC',
        template_frame : "carousel",
        spice_name     : "bbc",
        template_options: {
            li_width        : 120,
            li_height       : 105,
            items           : programmes, 
            template_item   : "bbc",
            template_detail : "bbc_details"
        },
        force_big_header : true
    });
}

/*
 * time
 * 
 * Find the start and end of a programme and format appropriately
 */
Handlebars.registerHelper("time", function() {
    var to_str = function ddg_spice_bbc_to_str(num) {
        if (num == 0) {
             return "00";
        }
        var str = (num|0)+"";
        if (str.length < 2) {
            str = "0" + str;
        }
        return str;
    };
    var start = new Date(this.start);
    var end = new Date(this.end);
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
    if (hours > 0 && minutes > 0) {
        return hours + " hour"+pluralise(hours)+", "+minutes+" min"+pluralise(minutes);
    } else if (hours > 0 && minutes == 0) {
        return hours + " hour"+pluralise(hours);
    } else {
        return minutes+" min"+pluralise(minutes);
    }
});

// Find the series URL and return it, or if it is not part of a series return the normal url
Handlebars.registerHelper("programme_url", function() {
    return "http://www.bbc.co.uk/programmes/"+(this.programme.programme ? this.programme.programme : this.programme).pid;
});


// Find the programme image and return it
Handlebars.registerHelper("image", function() {
    return "http://ichef.bbci.co.uk/images/ic/272x153/" + (this.programme.image ? this.programme.image.pid :  "legacy/episode/"+this.programme.pid) + ".jpg";
});


// Check if original air date is before today
Handlebars.registerHelper("checkAirDate", function(options) {
    var d = new Date(this.programme.first_broadcast_date);
    var now = new Date();

    if (d < now) {
        return options.fn(this);
    } else {
        return false;
    }
});

// Find the programme's initial broadcast date/time and return it
Handlebars.registerHelper("initial_broadcast", function() {
    var aired = DDG.getDateFromString(this.programme.first_broadcast_date),
        days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
        months = [ 'January','February','March','April','May','June','July','August','September','October','November','December'];

    return days[aired.getDay()] + ", " + months[aired.getMonth()] + " " + aired.getDate() + ", " + aired.getFullYear()
});

// Remove all the episode info from the subtitle 
Handlebars.registerHelper("pretty_subtitle", function() {
    var seriesInfo = /series [0-9]+/ig;
    var episodeInfo = /episode [0-9]+/ig;
    var junk = /, ?/ig;
    console.log(this);
    var subtitle = this.programme.display_titles.subtitle + "";
    subtitle = subtitle.replace(seriesInfo, "").replace(episodeInfo, "").replace(junk, "");
    subtitle = $.trim(subtitle);
    if (this.programme.type == "episode" && this.programme.position !== null) {
        subtitle = subtitle.replace(this.programme.programme.title, "");
        subtitle = "Episode "+this.programme.position+(subtitle.length > 0 ? " - " + subtitle : "");
    }
    if (this.programme.programme.type == "series" && this.programme.programme.position !== null) {
        subtitle = this.programme.programme.title+", "+subtitle;
    }
    return subtitle;
});