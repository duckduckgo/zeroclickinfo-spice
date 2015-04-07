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
            minItemsForModeSwitch: 3,
            id: "twitch_streams",
            name: "Twitch Streams",
            data: api_result.streams,
            meta: {
                sourceName: "twitch.tv",
                sourceUrl: 'http://www.twitch.tv/search?query=' + moreAt,
                itemType: "Twitch Streams"
            },
            templates: {
                group: 'base',
                detail: false,
                item_detail: false,
                item: 'videos_item',
                moreAt: true,
            },
            normalize: function(stream) {
                if(stream.channel.status == null){
                    var title = "Untitled Broadcast";
                } else {
                    var title = stream.channel.status;
                }
                var title = stream.channel.display_name + ": " + stream.channel.status;
                
                return {
                    url: stream.channel.url,
                    viewCount: stream.viewers,
                    images: stream.preview,
                    title: title,
                    duration: stream.game
                };
            }
        });
    };
}(this));
