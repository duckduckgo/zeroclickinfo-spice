(function(env) {
    "use strict";
    env.ddg_spice_people_in_space = function(api_result){

        if (!api_result || api_result.number === undefined) {
          return Spice.failed('people_in_space');
        }

        var today = new Date();
        var codes = {       //We'll need these to map the full names returned by the source to the two-letter codes used by the DDG flag images
            "canada":"ca",
            "china":"cn",
            "denmark":"dk",
            "france":"fr",
            "germany":"de",
            "italy":"it",
            "japan":"jp",
            "netherlands":"nl",
            "russia":"ru",
            "spain":"sp",
            "sweden":"se",
            "uk":"uk",
            "usa":"us"};
        var months = ["Jan.","Feb.","Mar.","Apr.","May","Jun.","Jul.","Aug.","Sep.","Oct.","Nov.","Dec."];


        var people = api_result["people"];

        people = people.sort(function(a, b){
            //Sort by launch date. The dates are YYYY-MM-DD, so we can just use alpha sort.
            return a.launchdate < b.launchdate ? -1 : (a.launchdate > b.launchdate ? 1 : 0);
        });

        for (var i in people) {
            //add 2-letter country code
            people[i]["country_code"] = codes[people[i]["country"]];

            //compute number of days in space
            var launchyear = people[i].launchdate.substring(0, 4);
            var launchmonth = people[i].launchdate.substring(5, 7) - 1; //subtract 1 because month is zero-indexed
            var launchday = people[i].launchdate.substring(8, 10);
            var launchdate = new Date(launchyear, launchmonth, launchday, 0, 0, 0, 0);

            var elapsed = today - launchdate;
            people[i]["elapsed"] = Math.floor(elapsed / 86400000);  // 1000ms * 60s * 60m * 24h

            //format launchdate per locale
            //people[i]["launchdate"] = launchdate.toLocaleDateString("", {year: "numeric", month: "short", day: "numeric"});
            people[i]["launchdate"] = months[launchdate.getMonth()] + " " + launchdate.getDate() + ", " + launchdate.getFullYear();

            //rename title because it conflicts with template
            people[i]["position"] = people[i]["title"];
        }

        //The icon template group won't show anything if there are zero items, but we want to show "no one is in space" in that case
        //So we'll build an object conditionally with either "icon" or "text" template groups, and then call Spice.add()
        var o = {
            id: "people_in_space",
            name: "Answer",
            meta: {
                itemType: (api_result.number == 1 ? "Person" : "People"),
                sourceName: "How Many People Are In Space Right Now?",
                sourceUrl: "http://www.howmanypeopleareinspacerightnow.com/"
            }
        };
        if (people.length > 0) {
            o.data = people;
            o.normalize = function(item) {
                return {
                    url: item.bio,
                    title: item.name,
                    icon: "https://duckduckgo.com/assets/flags/20/" + item.country_code + ".png"
                };
            };
            o.templates = {
                group: "icon",
                detail: false,
                item_detail: false,
                options:{
                    footer: Spice.people_in_space.footer,
                    moreAt: true
                }
            };
        } else {
            o.data = api_result;
            o.templates = {
                group: "text",
                options:{
                    content: Spice.people_in_space.content,
                    moreAt: true
                }
            };
        }

        Spice.add(o);
    }
}(this));
