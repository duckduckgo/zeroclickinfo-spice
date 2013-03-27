var ddg_spice_forvo = function(api_result) {
    var initializePlayer = function() {
        // Display spice.
        Spice.render({
            data             : api_result,
            force_big_header : true,
            header1          : "Pronunciations by Forvo",
            source_name      : "Forvo",
            source_url       : "http://www.forvo.com/search/",
            template_normal  : "forvo"
        });

        // Initialize MediaElement.js
        $(document).ready(function() {
            $('audio').mediaelementplayer({
                audioWidth: "51%",
                audioHeight:30,
                enableAutosize: true,
                features: ['playpause','progress','current']
            });
        });
    };

    DDG.require("/forvo/mediaelement-and-player.min.js", {
        success: initializePlayer
    });
}