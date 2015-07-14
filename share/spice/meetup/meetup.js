(function (env) {
    "use strict";
    env.ddg_spice_meetup = function(api_result){

        if (!api_result || api_result.error) {
            return Spice.failed('meetup');
        }  

        Spice.add({
          id: "meetup",
          name: "meetup",
          data: api_result.results,
          meta: {
              sourceName: "Meetup.com",
              sourceUrl: 'http://www.meetup.com/'
          },
          templates: {
            group: 'base',
            options: {
                content: Spice.meetup.content,
                moreAt: true
            }
          }
        });

    };
}(this));
