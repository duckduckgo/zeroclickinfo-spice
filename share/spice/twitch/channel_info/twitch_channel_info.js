(function (env) {
    "use strict";
    env.ddg_spice_twitch_channel_info = function(api_result) {
        // Validate the response (customize for your Spice)
        if (!api_result || api_result.error) {
            return Spice.failed('twitch_channel_info');
        }

        // Render the response
        Spice.add({
            id: "twitch_channel_info",

            // Customize these properties
            name: "Games",
            data: api_result,
            meta: {
                sourceName: "Twitch",
                sourceUrl: 'https://www.twitch.tv/' + api_result.name,
                sourceIconUrl: 'https://www.twitch.tv/favicon.ico',
                itemType: "Twitch Channel",
            },
            normalize: function(item) {
                return {
                    image: item.video_banner,
                    views: item.views.toLocaleString(),
                    followers: item.followers.toLocaleString()  
                };
            },
            templates: {
                group: 'media',
                options: {
                    content: Spice.twitch_channel_info.twitch_channel_info,
                }
            },
            onItemShown: function(item) {
                $.ajaxSetup({ cache: true });
                $.getJSON('https://api.twitch.tv/kraken/streams/' + item.name, function(data) {
                    if(data && data.stream && data.stream.preview){
                        var src = 'https://images.duckduckgo.com/iu/?f=1&u=' + encodeURIComponent(data.stream.preview.medium);
                        var $img = $('<img src="' + src + '" class="c-info__img  js-detail-img">').on('load', function(){
                            $('.zci--twitch_channel_info').find('.c-info__img-wrap').addClass('channel__live');
                            $('.zci--twitch_channel_info').find('.c-info__img-wrap__in').html($img); 
                        });
                    }
                });
            }
        });
    };
}(this));