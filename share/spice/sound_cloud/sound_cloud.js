(function(env) {
    "use strict"

    env.ddg_spice_sound_cloud = function(api_result) {

        var SOUNDCLOUD_CLIENT_ID = 'df14a65559c0e555d9f9fd950c2d5b17',
            script = $('[src*="/js/spice/sound_cloud/"]')[0],
            source = $(script).attr("src"),
            query = source.match(/sound_cloud\/([^\/]*)/)[1],

            // Blacklist some adult results.
            skip_ids = {
                80320921: 1, 
                75349402: 1
            };

        
        if(!api_result){
            return Spice.failed("audio");
        }

        Spice.add({
            id: 'audio',
            name: 'Audio',
            data: api_result,
            meta: {
                sourceName: 'SoundCloud',
                sourceUrl: 'https://soundcloud.com/search?q=' + query,
                sourceIcon: true,
                itemType: 'Tracks'
            },
            templates: {
                item_custom: 'audio_item',
                options: {
                    footer: Spice.sound_cloud.footer
                }
            },
            view: 'Audio',
            model: 'Audio',
            normalize: function(o) {

                var image = o.artwork_url || o.user.avatar_url,
                    usingWaveformImage = 0;

                // Check if it's using the default avatar, if
                // so switch to waveform and set the flag
                if (/default_avatar_large/.test(image)) {
                    image = o.waveform_url;
                    usingWaveformImage = 1;
                } else {
                    // Get the larger image for our IA.
                    image = image.replace(/large\.jpg/, "t200x200.jpg");
                }

                // skip items that can't be streamed or explicit id's we
                // want to skip for adult content:
                if (!o.stream_url || skip_ids[o.id]) {
                    return;
                }

                var streamURL = '/audio?u=' + o.stream_url + '?client_id=' + SOUNDCLOUD_CLIENT_ID;

                return {
                    image: image,
                    usingWaveformImage: usingWaveformImage,
                    hearts: o.favoritings_count || 0,
                    duration: o.duration,
                    title: o.title,
                    url: o.permalink_url,
                    streamURL: streamURL
                };
            }
        });
    };
}(this));
