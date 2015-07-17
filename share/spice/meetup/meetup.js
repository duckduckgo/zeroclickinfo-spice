(function (env) {
    "use strict";
    env.ddg_spice_meetup = function(api_result){
        // TODO get city name from search query for itemType
        // var searchTerm = DDG.get_query().replace(/(?: news|news ?)/i, '').trim();
        var searchTerm = DDG.get_query();

        if (!api_result || api_result.error) {
            return Spice.failed('meetup');
        }

        console.log(api_result.results);

        Spice.add({
          id: "meetup",
          name: "meetup",
          data: api_result.results,

          meta: {
              count: api_result.results.length,
              searchTerm: searchTerm,
              itemType: 'meetups',

              // primaryText: 'Primary Text',
              // secondaryText: '',


              sourceName: "Meetup.com",
              sourceUrl: 'http://www.meetup.com/'
          },

          templates: {
            group: 'text',

            // detail: false,

            options: {
              moreAt: true
            }

          },
          normalize: function(item) {

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
