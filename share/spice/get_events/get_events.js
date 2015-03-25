(function (env) {
    "use strict";
    

    function buildUrl(id) {
        return 'https://getevents.co/events/preview/'+id;
        //For testing
        // return 'https://staging.getevents.co/events/preview/'+id;
    }
    
    // callback
    env.ddg_spice_get_events = function(api_result){
        if (api_result.error) {
            return Spice.failed('get_events');
        }
        
        DDG.require('moment.js', function(){
            Spice.add({
                id: "get_events",
                name: "Events",
                data: api_result.events,
                meta: {
                    sourceName: "GetEvents",
                    sourceUrl: 'http://getevents.co',
                    itemType: "Upcoming Events"
                },
                normalize: function(item) {
                    return {
                        url: buildUrl(item.id),
                        description: '',
                        title: item.name,
                        place: item.venue.name,
                        img: item.image_small_url,
                        month: moment(item.start_date).format('MMM'),
                        day: moment(item.start_date).format('D')
                    };
                },
                templates: {
                    group: 'text',
                    detail: false,
                    item_detail: false,
                    options: {
                        footer: Spice.get_events.footer,
                        moreAt: true,
                        rating: false
                    },
                    variants: {
                        tileTitle: '3line-small',
                        tileFooter: '4line'
                    }
                }
            });
        });
        
        
   };
}(this));