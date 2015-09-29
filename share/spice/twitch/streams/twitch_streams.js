(function (env) {
    "use strict";
    env.ddg_spice_twitch_streams = function(api_result){

        if (!api_result || !api_result.streams || api_result.streams.length === 0 || api_result.error) {
            return Spice.failed('twitch_streams');
        }
        
        //Get query, split into an array on space, append query to the end for moreat
        var script = $('[src*="/js/spice/twitch/streams/"]')[0],
            source = $(script).attr("src"),
            query = source.match(/twitch\/streams\/([^\/]+)/)[1],
            decodedQuery = decodeURIComponent(query),
            moreAt = decodedQuery.replace(/ /g,"+");
        
        Spice.add({
            id: "twitch_streams",
            name: "Gaming",
            data: api_result.streams,
            meta: {
                sourceName: "Twitch",
                sourceUrl: 'http://www.twitch.tv/search?query=' + moreAt,
                itemType: "Twitch Streams"
            },
            templates: {
                group: 'videos',
                detail: false,
                item_detail: false,
                moreAt: true,
            },
            normalize: function(item) {
                var title = "Untitled Broadcast";
                if(DDG.getProperty(item, 'channel.status')){
                    var display_name = DDG.getProperty(item, 'channel.display_name');
                    var status = DDG.getProperty(item,'channel.status');
                    title = display_name + ": " + status;
                }
                
                return {
                    url: DDG.getProperty(item, 'channel.url'),
                    viewCount: DDG.getProperty(item, 'viewers'),
                    images: DDG.getProperty(item, 'preview'),
                    title: title,
                    duration: DDG.getProperty(item, 'game')
                };
            }
        });
    };
}(this));
