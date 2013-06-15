function ddg_spice_khan_academy ( api_result ) {

    // check for response
    if ( $.isEmptyObject(api_result.feed.entry) ) return;

    var query = DDG.get_query().replace(/khan(\sacademy)?|videos?/g, "").trim();
    var header;

    if(!query) {
        header = "Khan Academy";
    } else {
        header = query + " (Khan Academy)";
        query = 'search?page_search_query=' + query;
    }

    Spice.render({
        data: api_result,
        source_name : 'Khan Academy',
        source_url : 'https://www.khanacademy.org/' + query,
        header1 : header,
        force_no_fold : 1,
        force_big_header : 1,

        template_frame: "carousel",
        template_normal: "khan_academy",
        carousel_css_id: "khan_academy",
        carousel_template_detail: "khan_academy_detail",
        carousel_items: api_result.feed.entry,
        template_options : {
            li_width : 120
        }
    });

    // Move ddgc_detail above carousel
    $("#ddgc_detail").prependTo("#khan_academy");

    // Set height of ddgc_detail;
    resizeDetail();

    function resizeDetail() {
        var $khan = $("#spice_khan_academy");
        var width = $khan.width() - 14;    //need 7px of padding on each side
        var height = Math.floor(width * 0.5625) + 30;    //30px for player menu
        $("#ddgc_detail").height(height);
    };

    $(document).ready(function() {
        // Maintain 16/9 aspect ratio
        $(window).resize(resizeDetail);
    });

}

/*******************************
  Handlebars helpers
  *******************************/

// forms the url for a khan_academy product image
Handlebars.registerHelper ('video_id', function() {
    var video_id = this.id.$t.split(":").pop();
    return video_id;
});

// forms the url for a khan_academy product image
Handlebars.registerHelper ('image_url', function() {
    var image_url = this.media$group.media$thumbnail[1].url;
    return image_url;
});