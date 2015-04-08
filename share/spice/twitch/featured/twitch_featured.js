(function (env) {
    "use strict";
    env.ddg_spice_twitch_featured = function(api_result){

        if (!api_result || !api_result.featured || api_result.featured.length === 0 ||api_result.error) {
            return Spice.failed('twitch_featured');
        }
        
        Spice.add({
            minItemsForModeSwitch: 3,
            id: "twitch_featured",
            name: "Twitch Featured Streams",
            data: api_result.featured,
            meta: {
                sourceName: "twitch.tv",
                sourceUrl: "http://www.twitch.tv/",
                itemType: "Twitch Featured"
            },
            templates: {
                group: 'base',
                detail: false,
                item_detail: false,
                item: 'videos_item',
                moreAt: true,
            },
            normalize: function(featuredStream) {
                var title = "Untitled Broadcast";
                if(item.stream.channel.status != null) {
                    title = featuredStream.stream.channel.display_name + ": " + featuredStream.stream.channel.status;
                }
                
                return {
                    url: featuredStream.stream.channel.url,
                    viewCount: featuredStream.stream.viewers,
                    images: featuredStream.stream.preview,
                    title: title,
                    duration: featuredStream.stream.game
                };
            }
        });
    };
}(this));
