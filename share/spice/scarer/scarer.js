(function(env) {
    "use strict";

    env.ddg_spice_scarer = function () {
        // Shows a "BOOO" message after 5s and then optionally
        // forwards to a random "scary" search.
        function scare() {
            var scary_search_urls, // Will hold urls that we may forward to
                idx;               // Index into scary_search_urls

            alert("BOOOOOO!");

            if (confirm("Meh, ok.\nThat was lame.\n\nWanna see something really scary?\n\n\n")) {
                scary_search_urls = [
                    "/?q=%22no+internet+access%22",
                    "/?q=%22power+outage%22",
                    "/?q=%22mother-in-law+moves+in%22"
                ];

                idx = Math.floor(Math.random() * scary_search_urls.length);

                // Go to the reeeaaally scary page
                window.location.href = scary_search_urls[idx];
            }
        };
        setTimeout(scare, 5000);
    };
}(this));
