(function(env) {
    "use strict";

    env.ddg_spice_bbc = function(api_result) {

        if (!api_result) {
            return Spice.failed('bbc');
        }

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
            source_url,
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

        // Build a 'More at' link for this schedule - this can be the same
        // as the JSON URL minus the extension, but given the information
        // we have, it's easier to use a full date instead of 'today' etc.
        source_url = 'http://www.bbc.co.uk/'
            + api_result.schedule.service.key
            + '/programmes/schedules';

        if ("outlet" in api_result.schedule.service) {
            source_url += '/' + api_result.schedule.service.outlet.key;
        }

        source_url += '/' + fulldate.getFullYear()
            + '/' + ("0" + (fulldate.getMonth() + 1)).slice(-2)
            + '/' + ("0" + fulldate.getDate()).slice(-2);

        // Adding this URL fragment to schedules not in the past will take
        // the user to the right part of the page.
        if (!inPast) {
            source_url += '#on-now';
        }

        Spice.add({
            id: 'bbc',
            name: header_service_type,
            data: programmes,
            meta: {
                sourceName: 'BBC',
                sourceUrl: source_url,
                itemType: 'Programmes'
            },
            normalize: function(item) {
                return {
                    title: item.programme.display_titles.title,
                    ratingText: time(item),
                    image: image(item),
                    img: image(item),
                    img_m: image(item),
                    heading: item.programme.display_titles.title,
                    rating: "Unrated",
                    duration: duration(item),
                    url: programme_url(item),
                    abstract: item.programme.short_synopsis
                };
            },
            templates: {
                group: 'media',
                detail: 'products_detail',
                item_detail: 'products_item_detail',
                options: {
                    buy: Spice.bbc.buy,
                    subtitle_content: Spice.bbc.subtitle_content
                },
                variants: {
                    tile: "video"
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
