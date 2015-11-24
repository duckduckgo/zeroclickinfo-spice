(function (env) {
    "use strict";
    env.ddg_spice_coursebuffet = function(api_result){
        if (api_result == null || api_result["error"]) {
            return Spice.failed('coursebuffet');
        };

        // Get original query.
        var script = $('[src*="/js/spice/coursebuffet/"]')[0],
            source = $(script).attr("src"),
            query = decodeURIComponent(source.match(/coursebuffet\/([^\/]+)/)[1]);

        Spice.add({
            id: 'coursebuffet',
            name: 'Online Courses',
            data: api_result["courses"],
            meta: {
                itemType: "Courses",
                searchTerm: query,
                sourceName: "CourseBuffet",
                sourceUrl: "https://www.coursebuffet.com"+api_result["more_link"]
            },
            normalize: function(item) {
                name = item.name;
                if (name.length > 50) {
                    name = item.name.substr(0, 50) + "...";
                };
                var professors = "Instructors: ";
                if(item.show_professors==null || item.show_professors.length==0) {
                    professors = professors + "Not available";
                }
                else {
                    professors = professors + item.show_professors;
                };
                return {
                    title: name,
                    description: professors,
                    url: "https://www.coursebuffet.com"+item.create_new_link,
                    image: "https://www.coursebuffet.com"+item.course_image,
//                     rating: item.cb_sub_level_display,
                    ratingText: item.offeredvia
                };
            },
            templates: {
                group: "products_simple",
                item_detail: false,
                detail: false,
                options: {
                    moreAt: true
                },
                variants: {
                    tile: 'video'
                }
            }
//             relevancy: {
//                 type: 'primary',
//                 skip_words: [
//                     'course',
//                     'courses',
//                     'coursera',
//                     'edx',
//                     'udacity',
//                     'saylor',
//                     'novoed',
//                     'futurelearn',
//                     'iversity',
//                     'open2study',
//                     'openuped'
//                 ],
//                 primary: [
//                     { key: 'name', strict: false }
//                 ]
//             }
        });
    };
}(this));
