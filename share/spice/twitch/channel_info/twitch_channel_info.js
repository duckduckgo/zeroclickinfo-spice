(function (env) {
    "use strict";
    
    var ID = 'twitch_channel_info';
    var STREAM_ENDPOINT = '/js/spice/twitch/stream/';
    var BASE = 'https://www.twitch.tv/';
    
    env.ddg_spice_twitch_channel_info = function(api_result) {
        // Validate the response
        if (!api_result || api_result.error) {
            return Spice.failed('twitch_channel_info');
        }
        
        var name = api_result.name.trim().toLowerCase();
        var created_at = new Date(api_result.created_at);
        var status = 'Offline';
        var playing = {
            text: "Playing " + api_result.game,
            href: "https://www.twitch.tv/directory/game/" + api_result.game
        };
                
        // Render the response
        Spice.add({
            id: ID,
            name: "Gaming",
            data: api_result,
            meta: {
                sourceName: "Twitch.tv",
                sourceUrl: BASE + name,
                sourceIconUrl: BASE + 'favicon.ico',
                rerender: ["image", "subtitle"]
            },
            normalize: function(item) {
                return {
                    url: BASE + item.name,
                    title: item.display_name,
                    image: item.video_banner,
                    description: item.status,
                    infoboxData: [
                        {
                            heading: 'Channel info'
                        },
                        {
                            label: 'Created at',
                            value: created_at.toISOString().slice(0, 10)
                        },
                        {
                            label: 'Followers',
                            value: item.followers.toLocaleString()
                        },
                        {
                            label: 'Views',
                            value: item.views.toLocaleString()
                        }
                    ]
                };
            },
            templates: {
                group: 'info'
            },
            // Check stream status after render and load preview if it's LIVE
            onItemShown: function(item) {
                $.getJSON(STREAM_ENDPOINT + name, function(data) {
                    var obj = {
                        subtitle: [
                            status
                        ]
                    };
                    // If channel game field not null
                    if(item.game){
                        obj.subtitle.push(playing);
                    }
                    if(Object.keys(data).length && data.stream){
                        obj.subtitle[0] = 'Online';

                        // Update viewers count
                        if(data.stream.viewers){
                            obj.subtitle.push("Viewers: " + DDG.commifyNumber(data.stream.viewers));
                        }

                        // Update channel preview
                        if(data.stream.preview){
                            obj.image = data.stream.preview.medium;
                        }
                    }

                    item.set(obj);
                });
            }
        });
    };
}(this));