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
            name: 'TV',
            data: programmes,
            meta: {
                sourceName: 'BBC',
                sourceUrl: 'http://www.bbc.co.uk',
                itemType: 'Programmes'
            },
            normalize: function(item) {
                return {
                    title: item.programme.display_titles.title,
                    ratingText: time(item),
                    image: image(item),
                    rating: "Unrated",
                    duration: duration(item),
                    programme_url: programme_url(item)
                };
            },
            templates: {
                item: 'basic_image_item',
                detail: Spice.bbc.detail,
                options: {
                    variant: "video"
                }
            }
        });
    };

    // Find the start and end of a programme and format appropriately
    function time(item) {
        var start = new Date(item.start),
            end = new Date(item.end);

        function standard_time(time) {
            var hour = time.getHours() % 12,
                ampm = hour < 12 ? "AM" : "PM";
            if(hour == 0) {
                hour = 12;
            }
            var min = ((time.getMinutes() > 9) ? time.getMinutes() : "0" + time.getMinutes());
            return hour + ":" + min + (time.getHours() > 12 ? "PM" : "AM");
        }

        return standard_time(start) + " - " + standard_time(end);
    }

    //Find the duration of a programme and return it
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
    function image(item) {
        return "http://ichef.bbci.co.uk/images/ic/272x153/" + (item.programme.image ? item.programme.image.pid :  "legacy/episode/"+item.programme.pid) + ".jpg";
    }

    // Check if original air date is before today
    Handlebars.registerHelper("BBC_checkAirDate", function(options) {
        var d = new Date(this.programme.first_broadcast_date),
            now = new Date();

        return (d < now) ? options.fn(this) : false;
    });

    // Find the programme's initial broadcast date/time and return it
    Handlebars.registerHelper("BBC_initial_broadcast", function() {
        var aired = DDG.getDateFromString(this.programme.first_broadcast_date),
            days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
            months = [ 'January','February','March','April','May','June','July','August','September','October','November','December'];

        return days[aired.getDay()] + ", " + months[aired.getMonth()] + " " + aired.getDate() + ", " + aired.getFullYear();
    });
}(this));
