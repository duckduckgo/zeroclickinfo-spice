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
        
        
        // Render the response
        Spice.add({
            id: ID,
            name: "Streaming",
            data: api_result,
            meta: {
                sourceName: "Twitch.tv",
                sourceUrl: BASE + name,
                sourceIconUrl: BASE + 'favicon.ico'
            },
            normalize: function(item) {
                var getLink = function(url, label){
                    return '<a href="' + url + '" title="">' + label + '</a>';
                }
                return {
                    url: BASE + item.name,
                    title: item.name,
                    subtitle: [
                        'Offline',
                        new Handlebars.SafeString('Playing <strong>' + getLink(BASE + 'directory/game/' + item.game, item.game) + '</strong>')
                    ],
                    game: item.game,
                    game_url: BASE + item.game, 
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
                group: 'info',
                options: {
                    content: Spice.twitch_channel_info.content
                }
            },
            // Check stream status after render and load preview if it's LIVE
            onItemShown: function(item) {
                Spice.getDOM(ID).find('.c-info__img-wrap').addClass('channel__loading');
                
                $.ajaxSetup({ cache: true });
                $.getJSON(STREAM_ENDPOINT + name)
                    .done(function(data) {
                        if(Object.keys(data).length === 0 || !data.stream) return;
                    
                        // Replace 'Offline' string with 'Live'
                        var status = Spice.getDOM(ID).find('.c-info__title__sub').html()
                        Spice.getDOM(ID).find('.c-info__title__sub').html(status.replace('Offline', 'Online'));
                    
                        // Update viewers count
                        if(data.stream.viewers){
                            Spice.getDOM(ID).find('.c-info__title__sub')
                                .append('<span class="sep"></span>' + data.stream.viewers + ' viewers');
                        }
                        
                        // Update stream preview
                        if(data.stream.preview){
                            var src = 'https://images.duckduckgo.com/iu/?f=1&u=' + encodeURIComponent(data.stream.preview.medium);
                            var $img = $('<img src="' + src + '" class="c-info__img  js-detail-img">');
                            Spice.getDOM(ID).find('.c-info__img-wrap__in').html($img);
                            $img.on('load', function(){
                                Spice.getDOM(ID).find('.c-info__img-wrap').removeClass('channel__loading').addClass('channel__live');
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