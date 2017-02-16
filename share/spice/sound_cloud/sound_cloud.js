(function(env) {
    "use strict"

    var query = DDG.get_query();
    query = query.replace(/\bsound ?cloud\b/, "").replace(/\bsc\b/, "").trim(); //replace trigger words from query

    env.ddg_spice_sound_cloud = function() {
        $.getJSON("/js/spice/sound_cloud_result/" + encodeURIComponent(query), sound_cloud);
    }

    function sound_cloud(api_result) {
        // Blacklist some adult results.
        var skip_ids = {
            80320921: 1,
            75349402: 1
        };

        if(!api_result){
            return Spice.failed("sound_cloud");
        }

        Spice.add({
            id: 'sound_cloud',
            name: 'Audio',
            data: api_result,
            signal: 'medium',
            meta: {
                sourceName: 'SoundCloud',
                sourceUrl: 'https://soundcloud.com/search?q=' + query,
                sourceIcon: true,
                autoplay: false,
                itemType: 'Tracks'
            },
            templates: {
                item: 'audio_item',
                options: {
                    footer: Spice.sound_cloud.footer
                }
            },
            view: 'Audio',
            relevancy: {
                dup: 'url'
            },
            normalize: function(o) {
                if(!o) {
                    return null;
                }

                var image = o.artwork_url || o.user.avatar_url;

                // Check if it's using the default avatar, if
                // so switch set image to null - it will be
                // replaced with DDG's default icon
                if (/default_avatar_large/.test(image)) {
                    image = null;
                } else {
                    // Get the larger image for our IA.
                    image = image.replace(/large\.jpg/, "t200x200.jpg");
                    image = DDG.toHTTP(image);
                }

                // skip items that can't be streamed or explicit id's we
                // want to skip for adult content:
                if (!o.stream_url || skip_ids[o.id]) {
                    return;
                }

                var streamURL = '/js/spice/sound_cloud_stream/' + o.stream_url.replace(/https?:\/\//, '');

                console.log(streamURL);

                return {
                    image: image,
                    hearts: o.likes_count || 0,
                    duration: o.duration,
                    title: o.title,
                    url: o.permalink_url,
                    streamURL: streamURL
                };
            }
        });
    };

    ddg_spice_sound_cloud();
}(this));
