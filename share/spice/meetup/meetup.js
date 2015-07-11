(function (env) {
    "use strict";
    env.ddg_spice_meetup = function(api_result){

        if (!api_result || api_result.error) {
            return Spice.failed('meetup');
        }
        console.log(api_result);
        // We don't want all of the meetup information
        // Only take what we will use in the template
        // We'll build a new object that looks like this
        // meetupContent: {

        // }÷
        // var meetupContent = {},
        //     meetupContent[meetups] = [],
        //     meetupContent[queryResults] = api_result.meta.total_count,




        // meetup: {
        //   name: 'name',
        //   category: category.name,
        //   members: members,
        //   nextEvent: next_event.name
        // }

        // function buildNewResultsArray(array){
        //   array.forEach(function(){
        //     var newMeetup = {};
        //     // element, index, array
        //     newMeetup[name] = element.name;
        //     newMeetup[category] = element.category.name;
        //     newMeetup[members] = element.members;
        //     newMeetup[nextEvent] = element.next_event.name;
        //     meetupContent.meetups.push(newMeetup);
        //   });
        // }




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
