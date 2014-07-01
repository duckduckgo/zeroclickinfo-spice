(function(env) {
    "use strict";
    env.ddg_spice_people_in_space = function(api_result){

        if (!api_result || api_result.number === undefined) {
          return Spice.failed('people_in_space');
        }

        var today = new Date();
        var codes = {
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
        for (var i in people) {
            //add 2-letter country code
            people[i]["country_code"] = codes[people[i]["country"]];

            //compute number of days in space
            var launchdate = new Date(people[i]["launchdate"]);
            var elapsed = today - launchdate;
            people[i]["elapsed"] = Math.floor(elapsed / 86400000);  // 1000ms * 60s * 60m * 24h

            //format launchdate per locale
            //people[i]["launchdate"] = launchdate.toLocaleDateString("", {year: "numeric", month: "short", day: "numeric"});
            people[i]["launchdate"] = months[launchdate.getMonth()] + " " + launchdate.getDate() + ", " + launchdate.getFullYear();

            //rename title because it conflicts with template
            people[i]["position"] = people[i]["title"];
        }

        people = people.sort(function(a, b){
            var a_lastname = a["name"].split(" ").reverse()[0]
            var b_lastname = b["name"].split(" ").reverse()[0]
            return a_lastname < b_lastname ? -1 : (a_lastname > b_lastname ? 1 : 0);
        });

        var o = {
            id: "people_in_space",
            name: "Answer",
            meta: {
                itemType: "People",
                sourceName: "www.howmanypeopleareinspacerightnow.com",
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
