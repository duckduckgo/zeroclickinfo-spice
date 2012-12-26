function ddg_spice_sound_cloud(sc) {
    "use strict";
    // Snippet shown in 0-click
    var snippet = d.createElement('span'), 
        iframe = d.createElement('iframe'), 
        res, 
        items = [[]];

    // Validity check
    if (sc && sc.length && sc[0].uri && sc[0].title && sc[0].user && sc[0].user.username && sc[0].permalink_url) {
        // Rename for readability
        res = sc[0];

        // Create embedded soundcloud player
        iframe.setAttribute('width', '100%');
        iframe.setAttribute('height', '166');
        iframe.setAttribute('scrolling', 'no');
        iframe.setAttribute('frameborder', 'no');
        iframe.setAttribute('src', 'https://w.soundcloud.com/player/?url=' + encodeURI(res.uri));

        // Append iframe to snippet
        snippet.appendChild(iframe);

        items[0] = {
            // Set the header to the SoundCloud title
            a: snippet,
            h: res.title,
            // Source name and url for the More at X link.
            s: "SoundCloud",
            u: res.permalink_url,
            // No compression.
            f: true
        };

        // The rendering function is nra.
        nra(items);
    }
}