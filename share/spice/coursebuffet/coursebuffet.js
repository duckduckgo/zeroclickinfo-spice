(function (env) {
  "use strict";
  env.ddg_spice_coursebuffet = function(api_result){
    if (api_result["error"]) {
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
      signal: 'high',
      normalize: function(item) {
        return {
            title: item.name,
            subtitle: item.cb_sub_level_display + " / " + item.offeredvia,
            url: "http://www.coursebuffet.com"+item.create_new_link
        };
      },
      templates: {
        group: 'text',
        detail: false,
        item_detail: false,
        options: {
          moreAt: true
        }
      }
    });
    
  };
}(this));