(function(env) {
    "use strict";
    env.ddg_spice_people_in_space = function(api_result){

        if (!api_result || api_result.number === undefined) {
          return Spice.failed('people_in_space');
        }

        var people = api_result["people"];
        for (var i in people) {
            if (people[i]["country"] == "usa") {    //make USA all uppercase
                people[i]["country"] = "USA";
            } else {                                //first letter uppercase
                people[i]["country"] = people[i]["country"][0].toUpperCase() + people[i]["country"].substring(1)
            }
        }

        people = people.sort(function(a, b){
            var a_lastname = a["name"].split(" ").reverse()[0]
            var b_lastname = b["name"].split(" ").reverse()[0]
            return a_lastname < b_lastname ? -1 : (a_lastname > b_lastname ? 1 : 0);
        });

        Spice.add({
            id: "people_in_space",
            name: "Answer",
            data: api_result,
            meta: {
                sourceName: "www.howmanypeopleareinspacerightnow.com",
                sourceUrl: "http://www.howmanypeopleareinspacerightnow.com/"
            },
            templates: {
                group: "text",
                options:{
                    content: Spice.people_in_space.content,
                    moreAt: true
                }
            }
        });
    }
}(this));
