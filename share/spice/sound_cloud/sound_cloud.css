// `ddg_spice_sound_cloud` is a callback function that gets
// called when people search for movie titles. An example trigger
// is "sc oppa spacejam style".

(function(root) {
    "use strict";

    var items = [[]],
        query = DDG.get_query().replace(/(sc|sound\s+cloud|soundcloud)\s*/i, "");

    // This function is responsible for calling other functions that
    // process data and display the plugin.
    root.ddg_spice_sound_cloud = function(sound) {
        if(sound && sound.length) {

            items[0] = {
                a: list_of_tracks(sound),
                h: query + " (Sound Cloud)",
                s: "SoundCloud",
                u: "https://soundcloud.com/search?q=" + query,
                force_no_fold: 1,
                force_big_header: true
            };

            // The rendering function is `nra`.
            nra(items, 1, 1);
        }
    };

    function remove(element) {
        element.parentNode.removeChild(element);
    }

    // `hide` is responsible for hiding the list of songs.
    // It makes use of DDG.toggle which can either hide or unhide an element.
    function hide(element) {
        var abstract = d.getElementById("zero_click_abstract");
        DDG.toggle('soundcloud-play', -1);
        var shell = d.createElement('div');
        shell.setAttribute('id', 'soundcloud-stream');

        // It's important to insert the element before (using, well, node.insertBefore)
        // because node.appendChild would put the element below the "More at ..." link.
        var firstChild = abstract.firstChild;
        shell.appendChild(soundcloud(element));
        // The back button removes the embedded player.
        shell.appendChild(link({"href": "javascript:;", "id": "back-button"}, "Back ↩",
            {
                "click": 
                    (function(){
                        DDG.toggle('soundcloud-play', '1');
                        abstract.setAttribute("style", "display: block; margin-right: 50px;");
                        remove(shell);
                    })
            }));
        abstract.insertBefore(shell, firstChild);
        // The player can take advantage of the excised margins.
        abstract.setAttribute("style", "margin: 0px !important;");
    }

    // `stream` is responsible for displaying the icons and for adding the events
    // needed to embed SoundCloud's player.
    function stream(element) {
        return link({
            "href": "javascript:;",
            "title": "Listen to " + element.title
            // This uses Glyphicons Halflings included in Twitter Bootstrap.
        }, element.title, {
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

    // `list_element` is an auxiliary for `list_of_tracks`.
    // This will snug everything, the links, the icons, and the artists,
    // in a single `div` element.
    function list_element(element) {
        var div = d.createElement('div'),
            span = d.createElement('span'),
            icon = d.createElement('i'),
            extra_space = d.createElement('span');
        span.innerHTML = " by ";
        extra_space.innerHTML = " ";
        icon.setAttribute('class', 'icon-play-circle');
        icon.setAttribute('style', 'margin 1px 0px 0px 0px;');
        div.appendChild(icon);
        div.appendChild(extra_space);
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

    // Embed Sound Cloud's player in our plugin in an iframe.
    // An optional argument to the URL is `auto_play=true`
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

