(function (env) {
    "use strict";
    env.ddg_spice_get_events = function(api_result){
        if (api_result.error) {
            return Spice.failed('get_events');
        }
	var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

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
		function getDate(date) {
			if (date) {
				date = date.replace(/T.*/, '');
				var remix_date = date.split("-");
				date = remix_date[1] + "/" + remix_date[2] + "/" + remix_date[0];
				
				date = new Date(date);
				return date; 		
			}
			return ;
		}

		function getMonth(date) {
			if (date) {
				var month = months[parseInt(date.getMonth())];
				return month.toUpperCase();
			}
			return;
		}

		function getDay(date) {
			if (date) {
				var day = date.getDate();
				return day
			}
			return ;
		}
                
        function buildUrl(id) {
            return 'https://getevents.co/events/preview/'+id;
        }
                return {
                    url: buildUrl(item.id),
                    title: item.name,
                    place: item.venue.name,
                    img: item.image_small_url,
                    month: getMonth(getDate(item.start_date)),
                    day: getDay(getDate(item.start_date))
                };
            },
            templates: {
                group: 'products',
                item: Spice.get_events.item,
                detail: false,
                item_detail: false,
                options:{
                    moreAt: true,
                    rating: false
                }
            }
        });
    };
}(this));                                                                                                                                              
                                                                                                                                                                                                                                                                                             
                                                                                                                                                                         
