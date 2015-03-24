(function (env) {
    "use strict";
    env.ddg_spice_twitch_streams = function(api_result){

        if (api_result.error) {
            return Spice.failed('twitch_streams');
        }
        
        var streams = [];
        if (!($.isArray(api_result.streams))) {
            streams = [api_result.streams];
        } else {
            streams = api_result.streams;
        }  
        
        //Get query, split into an array on space, append query to the end for moreat
        var query = DDG.get_query().split(" ");
        var moreAt = '';
        for (var i = 2; i < query.length; i++) {
            moreAt = moreAt + query[i];
            if(i != query.length - 1){
                moreAt += '+';
            }
        }
        
        //Push results into an array for display
        var results = [];
        
        for (var i = 0; i < streams.length; i++) {
            var url = streams[i].channel.url;
            var displayName = streams[i].channel.display_name;
            if(streams[i].channel.logo != null){
                var logo = streams[i].channel.logo;
            } else {
                var logo = 'http://static-cdn.jtvnw.net/jtv-static/404_preview-300x300.png';
            }
            var viewers = streams[i].viewers;
            
             results.push({
                 url: url,
                 displayName: displayName,
                 logo: logo,
                 viewers: viewers
             });
        }
        
        Spice.add({
            minItemsForModeSwitch: 3,
            id: "twitch_streams",
            name: "Twitch Streams",
            data: results,
            meta: {
                sourceName: "twitch.tv",
                sourceUrl: 'http://www.twitch.tv/search?query=+' + moreAt,
            },
            templates: {
                group: 'base',
                detail: false,
                moreAt: true,
                options: {
                    content: Spice.twitch_streams.content,
                },
                variants: {
                    tile: 'xwide'
                }
            },
        });
    };
}(this));
