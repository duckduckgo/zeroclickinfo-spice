Spice.sound_cloud = {

    id: 'soundcloud',
    name: 'Audio',
    templates: {
        item_custom: 'audio_item',
        options: {
            footer: Spice.sound_cloud.footer
        },
    },
    view: 'Audio',
    model: 'Audio',

    isValidResponse: function(res) {
        return res;
    },

    normalize: function(item) {
        var image = o.artwork_url || o.user.avatar_url,
            usingWaveformImage = 0,
            SOUNDCLOUD_CLIENT_ID = 'df14a65559c0e555d9f9fd950c2d5b17',
            skip_ids = {
                80320921: 1, 
                75349402: 1
            };

        // Check if it's using the default avatar, if
        // so switch to waveform and set the flag
        if (/default_avatar_large/.test(image)) {
            image = o.waveform_url;
            usingWaveformImage = 1;
        } else {
            // Get the larger image for our IA.
            image = image.replace(/large\.jpg/, "t200x200.jpg");
        }

        image = image.replace(/^https/, "http");

        // skip items that can't be streamed or explicit id's we
        // want to skip for adult content:
        if (!o.stream_url || skip_ids[o.id]) {
            return;
        }

        var streamURL = '/audio?u=' + o.stream_url + '?client_id=' + this.constants.SOUNDCLOUD_CLIENT_ID;

        return {
            image: image,
            usingWaveformImage: usingWaveformImage,
            hearts: o.favoritings_count || 0,
            duration: o.duration,
            title: o.title,
            url: o.permalink_url,
            streamURL: streamURL
        };
    },

    onResponse: function(res) {
        return {
            data: res,
            meta: {
                sourceName: 'SoundCloud',
                // this.query could be added to each of the spice objects by the dispatcher so
                // we don't need to have people doing that crazy script tag src url parsing
                // all over the place:
                sourceUrl: 'https://soundcloud.com/search?q=' + this.query,
                sourceIcon: true,
                itemType: 'Tracks'
            }
        };
    }

}
