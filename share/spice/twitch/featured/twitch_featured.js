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
                sourceName: "Twitch",
                sourceUrl: "http://www.twitch.tv/",
                itemType: "Featured Streams"
            },
            templates: {
                group: 'base',
                detail: false,
                item_detail: false,
                item: 'videos_item',
                moreAt: true,
            },
            normalize: function(item) {
                var title = "Untitled Broadcast";
                if(DDG.getProperty(item, 'stream.channel.status')){
                    var display_name = DDG.getProperty(item, 'stream.channel.display_name');
                    var status = DDG.getProperty(item,'stream.channel.status');
                    title = display_name + ": " + status;
                }
                
                return {
                    url: DDG.getProperty(item, 'stream.channel.url'),
                    viewCount: DDG.getProperty(item, 'stream.viewers'),
                    images: DDG.getProperty(item, 'stream.preview'),
                    title: title,
                    duration: DDG.getProperty(item, 'stream.game')
                };
            }
        });
    };
}(this));
