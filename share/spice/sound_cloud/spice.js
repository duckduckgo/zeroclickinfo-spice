// `ddg_spice_sound_cloud` is a callback function that gets
// called when people search for movie titles. An example trigger
// is "sc oppa spacejam style".

function ddg_spice_sound_cloud(sc) {
    "use strict";

    var snippet = d.createElement('span'), 
        iframe = d.createElement('iframe'), 
        res, 
        items = [[]];

    // Check if the properties that we need are available.
    // if it isn't, it's not going to display anything.
    if (sc && sc.length && sc[0].uri && sc[0].title && sc[0].user && sc[0].user.username && sc[0].permalink_url) {
        // Rename for readability
        res = sc[0];

        // Embed Sound Cloud's player in our plugin.
        iframe.setAttribute('width', '100%');
        iframe.setAttribute('height', '166');
        iframe.setAttribute('scrolling', 'no');
        iframe.setAttribute('frameborder', 'no');
        iframe.setAttribute('src', 'https://w.soundcloud.com/player/?url=' + encodeURI(res.uri));
        snippet.appendChild(iframe);

        items[0] = {
            // Set the header to the Sound Cloud title.
            a: snippet,
            h: "Sound Cloud (" + res.title + ")",
            // Source name and url for the More at X link.
            s: "SoundCloud",
            u: res.permalink_url,
            // No compression.
            f: true,
            force_big_header: true
        };

        // The rendering function is `nra`.
        nra(items);
    }
}