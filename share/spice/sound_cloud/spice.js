// `ddg_spice_sound_cloud` is a callback function that gets
// called when people search for movie titles. An example trigger
// is "sc oppa spacejam style".

(function(root) {
    "use strict";

    var snippet = d.createElement('span'),
        items = [[]],
        query = DDG.get_query().replace(/(sc|sound\s+cloud|soundcloud)\s*/i, "");

    // This function is responsible for calling other functions that
    // process data and display the plugin.
    root.ddg_spice_sound_cloud = function(sound) {
        if(sound && sound.length) {
            snippet.appendChild(list_of_tracks(sound));

            items[0] = {
                a: snippet,
                h: query + " (Sound Cloud)",
                s: "SoundCloud",
                u: "https://soundcloud.com/search?q=" + query,
                f: true,
                force_big_header: true
            };

            // The rendering function is `nra`.
            nra(items, 1, 1);
        }
    };

    // `hide` is responsible for hiding the list of songs.
    function hide(element) {
        DDG.toggle('soundcloud-play', -1);
        snippet.appendChild(soundcloud(element));
        var abstract = d.getElementById("zero_click_abstract");
        abstract.setAttribute("style", "margin: 0px !important;");
    }

    // `stream` is responsible for displaying the icons and the embedded flash thing.
    function stream(element) {
        return link({
            "href": "javascript:;",
            "title": "Listen to " + element.title
        }, "<i class='icon-play-circle'></i>" + element.title, {
            "click": (function(){
                hide(element);
            })
        });
    }

    // `list_of_tracks` wraps the list of songs in HTML.
    function list_of_tracks(sound) {
        // We added an ID so that we can hide this element later on.
        var list = d.createElement('div');            
        list.setAttribute("id", "soundcloud-play");

        for(var i = 0; i < sound.length && i < 5; i += 1) {
            list.appendChild(list_element(sound[i]));
        }

        return list;
    }

    // `list_element` is an auxilliary for `list_of_tracks`.
    function list_element(element) {
        var div = d.createElement('div'),
            span = d.createElement('span');
        span.innerHTML = " by ";

        div.appendChild(stream(element));
        div.appendChild(span);
        div.appendChild(link({
            "href": element.user.permalink_url
        }, element.user.username, {}));

        return div;
    }

    // `link` is used to create anchor tags.
    function link(attributes, inner, events) {
        var a = d.createElement('a'),
            hasOwn = ({}).hasOwnProperty;

        for(var i in attributes) {
            if(hasOwn.call(attributes, i)) {
                a.setAttribute(i, attributes[i]);
            }
        }
        a.innerHTML = inner;

        for(i in events) {
            if(hasOwn.call(events, i)) {
                a.addEventListener(i, events[i], false);
            }
        }

        return a;
    }

    // Embed Sound Cloud's player in our plugin.
    function soundcloud(res) {
        var iframe = d.createElement('iframe');
        iframe.setAttribute('width', '100%');
        iframe.setAttribute('height', '166');
        iframe.setAttribute('scrolling', 'no');
        iframe.setAttribute('frameborder', 'no');
        iframe.setAttribute('src', 'https://w.soundcloud.com/player/?url=' + encodeURI(res.uri) + "&amp;auto_play=true");
        return iframe;
    }
}(this));

