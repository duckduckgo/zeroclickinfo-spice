(function (env) {
    "use strict";
    env.ddg_spice_twitch_streams = function(api_result){

        if (!api_result || api_result.error) {
            return Spice.failed('twitch_streams');
        }
        
        var streams = [];
        if (!($.isArray(api_result.streams))) {
            streams = [api_result.streams];
        } else {
            streams = api_result.streams;
        }  
        
        //Get query, as per documentation
        var script = $('[src*="/js/spice/twitch_streams/"]')[0],
            source = $(script).attr("src"),
            query = source.match(/twitch_streams\/([^\/]+)/)[1],
            decodedQuery = decodeURIComponent(query);
        //Replace spaces with +
        var moreAt = decodedQuery.replace(/ /g,"+");
        
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
