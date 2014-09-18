(function (env) {
    "use strict";
    env.ddg_spice_coursebuffet = function(api_result){
        if (api_result == null || api_result["error"]) {
            return Spice.failed('coursebuffet');
        };

        Spice.add({
            id: 'coursebuffet',
            name: 'Online Courses',
            data: api_result["courses"],
            meta: {
                itemType: "Courses",
                sourceName: "CourseBuffet",
                sourceUrl: "http://www.coursebuffet.com"+api_result["more_link"]
            },
            normalize: function(item) {
                name = item.name;
                if (name.length > 50) {
                    name = item.name.substr(0, 50) + "...";
                };
                return {
                    title: name,
                    description: item.show_professors,
                    url: "http://www.coursebuffet.com"+item.create_new_link
                };
            },
            templates: {
                group: 'text',
                detail: false,
                item_detail: false,
                options: {
                    moreAt: true,
                    footer: Spice.coursebuffet.footer
                }
            },
            relevancy: {
                type: 'primary',
                skip_words: [
                    'course',
                    'courses',
                    'coursera',
                    'edx',
                    'udacity',
                    'saylor',
                    'novoed',
                    'futurelearn',
                    'iversity',
                    'open2study',
                    'openuped'
                ],
                primary: [
                    { key: 'name', strict: false }
                ]
            }
        });
    };
}(this));
