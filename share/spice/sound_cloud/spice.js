// `ddg_spice_sound_cloud` is a callback function that gets
// called when people search for movie titles. An example trigger
// is "sc oppa spacejam style".

function ddg_spice_sound_cloud(sc) {
    "use strict";

    var snippet = d.createElement('span'), 
        res, 
        items = [[]];

    // Check if the properties that we need are available.
    // if it isn't, it's not going to display anything.
    if (sc && sc.length && sc[0].uri && sc[0].title && sc[0].user && sc[0].user.username && sc[0].permalink_url) {
        // Rename for readability
        res = sc[0];

        snippet.appendChild(initImage(res));

        items[0] = {
            a: snippet,
            h: res.title + " (Sound Cloud)",
            s: "SoundCloud",
            u: res.permalink_url,
            f: true,
            force_big_header: true
        };

        // The rendering function is `nra`.
        nra(items, 1, 1);
    }

    // Use this to set the image shown to the user.
    function initImage(res) {
        var image;
        if(res.artwork_url) {
            image = res.artwork_url;
        } else if(res.user.avatar_url) {
            image = res.user.avatar_url;
        }
        var outer_div = d.createElement('div');
        
        var img = d.createElement('img');
        outer_div.setAttribute('id', 'soundcloud-play');
        img.setAttribute('src', image);
        img.setAttribute('style', 'clear: left; float: left; margin-left: 10px; margin-right: 10px; border: 1px solid rgb(255, 255, 255);');
        img.addEventListener("click", hideImage, false);

        // Add the image and the link to the div element.
        outer_div.appendChild(img);
        outer_div.appendChild(addLink(res.user.username, res.user.uri));
        
        return outer_div;
    }

    function addLink(value, href) {
        var link = d.createElement('a');
        link.setAttribute('href', href);
        link.innerHTML = value;
        return link;
    }

    // hideImage uses the built-in function DDG.toggle.
    // It hides or shows the element depending on the second argument.
    // 1 is for showing and -1 is for hiding.
    function hideImage() { 
        DDG.toggle('soundcloud-play', -1);
        snippet.appendChild(soundcloud(res));
    }

    // Embed Sound Cloud's player in our plugin.
    function soundcloud(res) {
        var iframe = d.createElement('iframe');
        iframe.setAttribute('width', '100%');
        iframe.setAttribute('height', '166');
        iframe.setAttribute('scrolling', 'no');
        iframe.setAttribute('frameborder', 'no');
        iframe.setAttribute('src', 'https://w.soundcloud.com/player/?url=' + encodeURI(res.uri));
        return iframe;
    }
}
