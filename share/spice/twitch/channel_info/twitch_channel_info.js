(function (env) {
    "use strict";
    
    var ID = 'twitch_channel_info';
    var STREAM_ENDPOINT = '/js/spice/twitch/stream/';
    
    env.ddg_spice_twitch_channel_info = function(api_result) {
        // Validate the response
        if (!api_result || api_result.error) {
            return Spice.failed('twitch_channel_info');
        }
        
        var name = api_result.name.trim().toLowerCase();
        
        // Render the response
        Spice.add({
            id: ID,
            name: "Streaming",
            data: api_result,
            meta: {
                sourceName: "Twitch",
                sourceUrl: 'https://www.twitch.tv/' + name,
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
            // Check stream status after render and load preview if it's LIVE
            onShow: function() {
                $.ajaxSetup({ cache: true });
                Spice.getDOM(ID).find('.c-info__img-wrap').addClass('channel__loading');
                $.getJSON(STREAM_ENDPOINT + name)
                    .done(function(data) {
                        if(data && data.stream && data.stream.preview){
                            var src = 'https://images.duckduckgo.com/iu/?f=1&u=' + encodeURIComponent(data.stream.preview.medium);
                            var $img = $('<img src="' + src + '" class="c-info__img  js-detail-img">').on('load', function(){
                                Spice.getDOM(ID).find('.c-info__img-wrap').removeClass('channel__loading').addClass('channel__live');
                                Spice.getDOM(ID).find('.c-info__img-wrap__in').html($img); 
                            });
                        }
                    })
                    .fail(function() {
                        
                    })
                    .always(function() {
                        Spice.getDOM(ID).find('.c-info__img-wrap').removeClass('channel__loading');    
                    });
            }
        });
    };
}(this));