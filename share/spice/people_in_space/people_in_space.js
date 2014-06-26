(function(env) {
    "use strict";
    env.ddg_spice_people_in_space = function(api_result){

        if (!api_result || api_result.number === undefined) {
          return Spice.failed('people_in_space');
        }

        var today = new Date();

        var people = api_result["people"];
        for (var i in people) {
            if (people[i]["country"] == "usa") {    //make USA all uppercase
                people[i]["country"] = "USA";
            } else {                                //first letter uppercase
                people[i]["country"] = people[i]["country"][0].toUpperCase() + people[i]["country"].substring(1)
            }

            //compute number of days in space
            var elapsed = today - (new Date(people[i]["launchdate"]));
            people[i]["elapsed"] = Math.floor(elapsed / 86400000);  // 1000ms * 60s * 60m * 24h
        }

        people = people.sort(function(a, b){
            var a_lastname = a["name"].split(" ").reverse()[0]
            var b_lastname = b["name"].split(" ").reverse()[0]
            return a_lastname < b_lastname ? -1 : (a_lastname > b_lastname ? 1 : 0);
        });

        Spice.add({
            id: "people_in_space",
            name: "Answer",
            data: api_result.people,
            meta: {
                sourceName: "www.howmanypeopleareinspacerightnow.com",
                sourceUrl: "http://www.howmanypeopleareinspacerightnow.com/"
            },
            normalize: function(item) {
                var a = {
                    url: item.bio,
                    title: item.name,
                    subtitle: item.title
                };
                return a;
            },
            templates: {
                group: "text",
                options:{
                    footer: Spice.people_in_space.footer,
                    moreAt: true
                }
            }
        });
    }
}(this));
