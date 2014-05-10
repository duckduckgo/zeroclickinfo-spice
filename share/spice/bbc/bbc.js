(function(env) {
    "use strict";

    env.ddg_spice_bbc = function(api_result) {
        var query = DDG.get_query(),
            broadcasts = api_result.schedule.day.broadcasts,
            programmes = [],
            now = new Date();

        if (query.match(/night|evening/)){
            now.setHours(18);
        }

        var date = api_result.schedule.day.date,
            fulldate = new Date(date),
            date_round = 1000 * 60 * 60 * 24,
            inPast = +fulldate < Math.floor(+now / date_round)*date_round,
            header_date,
            header_service_type,
            re = /today|tomorrow|yesterday|tonight|last/,
            match;

        if (re.test(query)){
            match = query.match(re)[0];
            header_date = match.charAt(0).toUpperCase() + match.slice(1);
            
            re = /\b(night|evening)\b/
            if (re.test(query)){
                match = query.match(re)[0];
                header_date += " " + match.charAt(0).toUpperCase() + match.slice(1);
            }
        } else {
            header_date = "Today";
        }

        for (var i=0; i<broadcasts.length; i++) {
            var end = new Date(broadcasts[i].end);
            if (end > now || inPast) {
                programmes.push(broadcasts[i]);
            }
        }

        header_service_type = api_result.schedule.service.type == "radio" ? "Radio" : "TV";

        Spice.add({
            id: 'bbc',
            name: 'BBC Shows',
            data: programmes,
            signal: 'high',
            meta: {
                sourceName: 'BBC',
                sourceUrl: 'http://www.bbc.co.uk',
                itemType: 'Programmes'
            },
            normalize: function(item) {
                var subtitle = item.programme.display_titles.subtitle;
                return {
                    title: item.programme.display_titles.title,
                    heading: item.programme.display_titles.title + (subtitle ? ' - ' + subtitle : ''),
                    description: item.programme.short_synopsis,
                    abstract: item.programme.short_synopsis,
                    ratingText: start_end(item),
                    image: image(item, false),
                    img: image(item, true),
                    rating: "Unrated",
                    brand: 'Run Time: '+duration(item),
                    url: programme_url(item)
                };
            },
            templates: {
                group: 'products_simple',
                options: {
                    variant: "video",
                    buy: Spice.bbc.buy,
                    brandAndPrice: false,
                    rating: false
                }
            }
        });
    };
    
    // Format a given time
    function format_time(time) {
        var hour = time.getHours() % 12,
            ampm = hour < 12 ? "AM" : "PM";
        if(hour == 0) {
            hour = 12;
        }
        var min = ((time.getMinutes() > 9) ? time.getMinutes() : "0" + time.getMinutes());
        return hour + ":" + min + (time.getHours() > 12 ? "PM" : "AM");
    }

    // Find the start and end of a programme and format appropriately
    function start_end(item) {
        var start = new Date(item.start),
            end = new Date(item.end);
        return format_time(start) + " - " + format_time(end);
    }

    // Find the duration of a programme and return it
    function duration(item) {
        var pluralise = function(n) {
            return n > 1 ? "s" : "";
        };
        var dur = item.duration,
            hours = Math.floor(dur / (60 * 60));

        dur -= hours * 60 * 60;
        var minutes = Math.floor(dur / 60);
            item.duration -= minutes * 60;
        if (hours > 0 && minutes > 0) {
            return hours + " hour"+pluralise(hours)+", "+minutes+" min"+pluralise(minutes);
        } else if (hours > 0 && minutes == 0) {
            return hours + " hour"+pluralise(hours);
        } else {
            return minutes+" min"+pluralise(minutes);
        }
    }

    // Find the series URL and return it, or if it is not part of a series return the normal url
    function programme_url(item) {
        var programme = item.programme;
        while(programme.programme != null && programme.programme.pid != null) {
            programme = programme.programme;
        }
        return "http://bbc.co.uk/" + (programme.pid == null ? "" : "programmes/"+programme.pid);
    }


    // Find the programme image and return it
    function image(item, big) {
        var size = big ? (is_mobile ? "304x171" : "512x288") : "224x126"; // note: they accept any 16:9 size
        return "http://ichef.bbci.co.uk/images/ic/"+size+"/" + (item.programme.image ? item.programme.image.pid :  "legacy/episode/"+item.programme.pid) + ".jpg";
    }
}(this));
