// `ddg_spice_sound_cloud` is a callback function that gets
// called when people search for movie titles. An example trigger
// is "sc oppa spacejam style".

function ddg_spice_sound_cloud(sc) {
    "use strict";

    var snippet = d.createElement('span'), 
        items = [[]],
        query = DDG.get_query().replace(/(sc|sound\s+cloud|soundcloud)\s*/i, "");

    function initElement(res) {
        // hideImage uses the built-in function DDG.toggle.
        // It hides or shows the element depending on the second argument.
        // 1 is for showing and -1 is for hiding.
        function hideElement() { 
            DDG.toggle('soundcloud-play', -1);
            snippet.appendChild(soundcloud(res));
        }

        var a = d.createElement('a');
        a.addEventListener("click", hideElement, false);
        a.setAttribute("href", "javascript:;");
        a.innerHTML = res.title;
        return a; 
    }

    // Check if the properties that we need are available.
    // if it isn't, it's not going to display anything.
    if (sc && sc.length) {
        var li,
            div = d.createElement('div'),
            ul = d.createElement('ul');

        div.setAttribute("id", "soundcloud-play");
        for(var i = 0; i < sc.length && i < 5; i++) {
            li = d.createElement('li');
            li.appendChild(initElement(sc[i])); 
            ul.appendChild(li);
        }
        div.appendChild(ul);
        snippet.appendChild(div);

        items[0] = {
            a: snippet,
            h: "Sound Cloud",
            s: "SoundCloud",
            u: "https://soundcloud.com/search?q=" + query,
            f: true,
            force_big_header: true
        };

        // The rendering function is `nra`.
        nra(items, 1, 1);
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
