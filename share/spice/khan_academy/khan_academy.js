function ddg_spice_khan_academy ( api_result ) {
    "use strict";

    // check for response
    if ( $.isEmptyObject(api_result.feed.entry) ) {
        return;
    }

    var query = DDG.get_query().replace(/khan(\sacademy)?|videos?/g, "").trim();
    var header;

    if (!query) {
        header = "Khan Academy";
    } else {
        header = query + " (Khan Academy)";
        query = 'search?page_search_query=' + query;
    }

    Spice.render({
        data                     : api_result,
        source_name              : 'Khan Academy',
        source_url               : 'https://www.khanacademy.org/' + query,
        header1                  : header,
        force_no_fold            : 1,
        force_big_header         : 1,
        spice_name               : "khan_academy",
        template_frame           : "carousel",
        template_options         : {
            items           : api_result.feed.entry,
            template_detail : "khan_academy_detail",
            li_width : 120,
            single_item_handler: function(obj) {
                // This disables autoplay.
                obj.data.feed.entry[0].single = true;
                }
            },
        item_callback: function() {
            resizeDetail();
        }
    });

    function resizeDetail() {
        var $khan = $("#spice_khan_academy");
        var width = $khan.width() - 14;    //need 7px of padding on each side
        var height = Math.floor(width * 0.5625) + 30;    //30px for player menu
        $("#spice_khan_academy #video-embed").width(width);
        $("#spice_khan_academy  #video-embed").height(height);
    };

    $(document).ready(function() {
        // Maintain 16/9 aspect ratio
        resizeDetail();
        $(window).resize(resizeDetail);
    });
}

Handlebars.registerHelper ("embedURL", function(single) {
    "use strict";

    var youtube_params = {
        autoplay: 1,
        wmode: "opaque",
        iv_load_policy: 3,
        autohide: 1,
        version: 3
    };

    // Disable autoplay when single is not undefined.
    if (single) {
        youtube_params.autoplay = 0;
    }

    // Concatenate all the parameters here.
    function parameters() {
        var result = [];
        for(o in youtube_params) {
            result.push(o + "=" + youtube_params[o]);
        }
        return result.join("&");
    }

    return parameters();
});

// forms the url for a khan_academy product image
Handlebars.registerHelper ('video_id', function() {
    "use strict";

    var video_id = this.id.$t.split(":").pop();
    return video_id;
});

// forms the url for a khan_academy product image
Handlebars.registerHelper ('image_url', function() {
    "use strict";

    var image_url = this.media$group.media$thumbnail[1].url;

    // Change HTTPS to HTTP for speed.
    return image_url.replace(/^https/, "http");
});
