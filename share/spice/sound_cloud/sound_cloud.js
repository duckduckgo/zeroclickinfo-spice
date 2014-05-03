(function(env) {
    "use strict";

    var script = $('[src*="/js/spice/sound_cloud/"]')[0];
    var source = $(script).attr("src");
    var query = source.match(/sound_cloud\/([^\/]*)/)[1];

    env.ddg_spice_sound_cloud = function(api_result) {
        Spice.add({
            id: 'soundcloud',
            name: 'SoundCloud',
            data: api_result,
            meta: {
                sourceName: 'SoundCloud',
                sourceUrl: 'https://soundcloud.com/search?q=' + query,
                sourceIcon: true,
                itemType: 'Tracks'
            },
            templates: {
                item: 'basic_image_item'
            },
            normalize: function(o) {
                var image = o.artwork_url || o.user.avatar_url;
                // Check if it's using the default image. Skip if it is.
                if(/default_avatar_large/.test(image)) {
                    return null;
                } else {
                    // Get the larger image for our IA.
                    image = image.replace(/large\.jpg/, "t200x200.jpg");
                }

                // Blacklist some adult results.
                var skip_id = {
                    80320921: true, 
                    75349402: true
                };
                if(skip_id[o.id]) {
                    return null;
                }

                return {
                    image: image,
                    rating: "Unrated",
                    ratingText: '',
                    link: o.permalink_url,
                    description: ''
                };
            }
        });
    };
}(this));
