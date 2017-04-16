(function(env) {
    "use strict";
    env.ddg_spice_events_in_space = function(api_result){
        if (!api_result) {
          return Spice.failed("events_in_space");
        }

        var dom = $.parseHTML(api_result);
        var lists = [];
        $.each(dom, function(i, e) {
            if (e.tagName === "UL") {
                lists.push(e);
            }
        });

        var data = [];
        var months = {"Jan":0,"Feb":1,"Mar":2,"Apr":3,"May":4,"Jun":5,"Jul":6,"Aug":7,"Sep":8,"Oct":9,"Nov":10,"Dec":11};
        var month_names = ["Jan.","Feb.","Mar.","Apr.","May","Jun.","Jul.","Aug.","Sep.","Oct.","Nov.","Dec."];
        var today = Date();

        var done = false;   //use this flag to terminate loops early
        for (var i = 1; i < lists.length; i++) {   //start at 1 because the 0th is table of contents
            var year = "20" + lists[i].previousSibling.name.substring(0, 2);    //YYMM is in lists[i].previousSibling.name

            for (var ii = 0; ii < lists[i].childNodes.length; ii++) {
                var item = lists[i].childNodes[ii];
                if (item.tagName !== "LI") {
                    continue;
                }

                var temp = item.innerHTML.split(/ -[ <]/);   //split the date from the item text
                //javascript's split() splits on every occurrence, even if a limit is specified
                //so we need to recombine all the parts except the first
                var text = temp.slice(1).join(" - ");

                //Some of the items have a little image at the front. Remove it.
                if (text.substring(0, 7) === "img src") {
                    text = text.replace(/.*?] /, "");
                }

                if (ii === 1) {     //Due to questionable HTML in the source, the second date has some junk at the front
                    temp[0] = temp[0].substring(15);
                }

                var date1, date2;   //start and end dates
                //the date could be " mmm dd", " mmm dd-dd", or " mmm dd-mmm dd" (note the leading space)
                var match = /^ (?:([A-Za-z]{3}) (\d\d)$|([A-Za-z]{3}) (\d\d)-(\d\d)$|([A-Za-z]{3}) (\d\d)-([A-Za-z]{3}) (\d\d)$)/.exec(temp[0]);
                if (match === null) {
                    continue;   //Some of the items have no date. We'll just leave them out of the result.
                }

                //javascript creates an element in match for every group, regardless of whether the group matched
                //so we can't use match.length to test how many groups matched
                //instead, look for the elements not undefined
                if (match[1] !== undefined) {   //first 2 groups matched
                    date1 = new Date(year, months[match[1]], match[2], 0, 0, 0, 0);
                    date2 = date1;
                } else if (match[3] !== undefined) {    //middle 3 groups matched
                    date1 = new Date(year, months[match[3]], match[4], 0, 0, 0, 0);
                    date2 = new Date(year, months[match[3]], match[5], 0, 0, 0, 0);
                } else if (match[6] !== undefined) {    //last 4 groups matched
                    date1 = new Date(year, months[match[6]], match[7], 0, 0, 0, 0);
                    date2 = new Date(year, months[match[8]], match[9], 0, 0, 0, 0);
                } else {
                    continue;   //shouldn't happen, but skip it just in case
                }

                //TODO I really want to localize these dates
                var date1_print, date2_print;
                date1_print = month_names[date1.getMonth()] + " " + date1.getDate() + ", " + date1.getFullYear();
                if (date1 !== date2) {
                    date2_print = month_names[date2.getMonth()] + " " + date2.getDate() + ", " + date2.getFullYear();
                } else {
                    date2_print = null;
                }

                data.push({"date1":date1_print, "date2":date2_print, "text":text});

                //end after 15 items or more than 3 days in the future, whichever comes first
                if (data.length > 15 || (date1 - today) > 3) {
                    done = true;
                    break;
                }
            }
            if (done) {
                break;
            }
        }

        Spice.add({
            id: "events_in_space",
            name: "Answer",
            meta: {
                itemType: "Events",
                sourceName: "NASA JPL Space Calendar",
                sourceUrl: "http://www.jpl.nasa.gov/calendar/"
            },
            data: {"data":data},
            templates: {
                group: "text",
                options:{
                    content: Spice.events_in_space.content,
                    moreAt: true
                }
            }
        });
    };
}(this));
