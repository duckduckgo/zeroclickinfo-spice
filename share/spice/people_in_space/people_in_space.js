(function(env) {
    "use strict";
    env.ddg_spice_people_in_space = function(api_result){

        if (!api_result || api_result.number === undefined) {
          return Spice.failed('people_in_space');
        }

        var today = new Date();
<<<<<<< HEAD
=======

        var months = ["Jan.","Feb.","Mar.","Apr.","May","Jun.","Jul.","Aug.","Sep.","Oct.","Nov.","Dec."];
>>>>>>> c9ee12589ffcc2a8796cf0c89fa215e1445c0d64

<<<<<<< HEAD
        var people = api_result.people;

        for (var i = 0; i < people.length; i++) {
<<<<<<< HEAD
            //add 2-letter country code
            people[i].country_code = codes[people[i].country.toLowerCase()];
=======
        var months = ["Jan.","Feb.","Mar.","Apr.","May","Jun.","Jul.","Aug.","Sep.","Oct.","Nov.","Dec."];

        var people = api_result.people;

        for (var i = 0; i < people.length; i++) {
>>>>>>> People In Space: Use New Template Group. Display Bio Information.
=======
>>>>>>> c9ee12589ffcc2a8796cf0c89fa215e1445c0d64

            //compute number of days in space
            var launchdate = people[i].launchdate.split("-");
            var launchyear = launchdate[0];
            var launchmonth = launchdate[1] - 1; //subtract 1 because month is zero-indexed
            var launchday = launchdate[2];
            var launchdate = new Date(launchyear, launchmonth, launchday, 0, 0, 0, 0);

            var elapsed = today - launchdate;
            people[i].elapsed = Math.floor(elapsed / 86400000);  // 1000ms * 60s * 60m * 24h

            //format launchdate per locale
            //people[i]["launchdate"] = launchdate.toLocaleDateString("", {year: "numeric", month: "short", day: "numeric"});
            people[i].launchdate = months[launchdate.getMonth()] + " " + launchdate.getDate() + ", " + launchdate.getFullYear();

            //rename title because it conflicts with template
            people[i].position = people[i].title;
        }

        //The icon template group won't show anything if there are zero items, but we want to show "no one is in space" in that case
        //So we'll build an object conditionally with either "icon" or "text" template groups, and then call Spice.add()
        var o = {
            id: "people_in_space",
            name: "Answer",
            meta: {
                itemType: (api_result.number === 1 ? "Person" : "People"),
                sourceName: "People in Space",
                sourceUrl: "http://www.howmanypeopleareinspacerightnow.com/"
            }
        };
        if (people.length > 0) {
            o.data = people;
            console.log(people);
            o.normalize = function(item) {
                return {
                    url: item.biolink,
                    title: item.name,
                    image: item.biophoto,
                    img_m: item.biophoto,
                    abstract: item.bio
                };
            };
            o.sort_fields = {
                launchdate: function(a, b) {
                    //The dates are YYYY-MM-DD strings, so we can just use alpha sort.
                    return a.launchdate < b.launchdate ? -1 : (a.launchdate > b.launchdate ? 1 : 0);
                }
            }
            o.sort_default = "launchdate";
           o.templates = {
                group: 'products_simple',            
                item_detail: false,
                detail: false,
                options: {
                    variant: 'narrow'
                }
            }
        } else {
            o.data = api_result;
            o.templates = {
                group: "base",
                options:{
                    content: Spice.people_in_space.none,
                    moreAt: true
                }
            };
        }

        Spice.add(o);
    };
}(this));