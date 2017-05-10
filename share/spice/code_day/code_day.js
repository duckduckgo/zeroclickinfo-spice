(function (env) {
    "use strict";
    env.ddg_spice_code_day = function(api_result){
        if (!api_result || api_result.length === 0) {
            return;
        }

        DDG.require(['maps', 'moment.js'], function(){
            Spice.add({
                id: "code_day",
                name: "Events",
                data: api_result,
                model: "Place",
                view: "Places",
                normalize: function(event){
                    if(!event.current_event) return null;
                    var venue = event.current_event.venue,
                        startDate = moment(event.current_event.starts_at * 1000), // convert from unix epoch
                        endDate = moment(event.current_event.ends_at * 1000),
                        currentEvent = event.current_event;
                    
                    return {
                        id: event.id,
                        data_front: {
                            showPin: true,
                            title: "CodeDay " + event.name,
                            altSubtitle: startDate.format("MMM Do") + " - " + endDate.format("Do") + ", noon - noon",
                            titleClass: 'tile__title--3 tx--16 tx--bold mg--none',
                            altSubClass: 'tx--13 tx-clr--grey',
                            city: venue.address.city,
                            state: venue.address.state,
                            subtitle: currentEvent.registration_info.max + " tickets remaining",
                            
                            footer_content: Spice.code_day.footer_front
                        },
                        data_back: {
                            title: "CodeDay " + event.name,
                            url: currentEvent.urls.home,
                            description: venue.address.line_1 + "; " + venue.address.city + ", " + venue.address.state,
                            
                            footer_content: Spice.code_day.footer_back,

                            titleClass: 'tile__title--1 tx--16 tx--bold'
                        },
                        address: venue.address.line_1,
                        city: venue.address.city,
                        state: venue.address.state,
                        lat: parseFloat(event.location.lat),
                        lon: parseFloat(event.location.lng)
                    };
                },
                meta: {
                    sourceName: "CodeDay.org",
                    sourceUrl: 'https://codeday.org/',
                    primaryText: "Matching CodeDay events"
                },
                templates: {
                    group: 'places',
                    item: 'basic_flipping_item',
                    variants: {
                        tileSnippet: 'large'
                    },
                    elClass: {
                        tileSnippet: 'tx-clr--slate-light tx--13'
                    }
                }
            });
        });
    };
}(this));
