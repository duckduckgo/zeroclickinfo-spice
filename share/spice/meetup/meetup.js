(function (env) {
    "use strict";
    env.ddg_spice_meetup = function(api_result){

        if (!api_result || api_result.error || !api_result.results) {
            return Spice.failed('meetup');
        }

        Spice.add({
          id: "meetup",
          name: "meetup",
          data: api_result.results,

          meta: {
              count: api_result.results.length,
              itemType: 'meetups',
              sourceName: "Meetup.com",
              sourceUrl: 'http://www.meetup.com/'
          },

          templates: {
            group: 'text',
            options: {
              moreAt: true
            }

          },
          normalize: function(item) {
            // not sure if we want to include a photo
            // var meetupIcon = !item.group_photo ? '' : item.group_photo.photo_link;
            var meetupDescription = DDG.strip_html(item.description).substring(0,500) + '...';

            return {
              // icon: meetupIcon,
              // image: meetupIcon,
              title: item.name,
              subtitle: item.members + ' ' + item.who,
              description: meetupDescription,
              url: item.link
            };
          }
        });

    };
}(this));
