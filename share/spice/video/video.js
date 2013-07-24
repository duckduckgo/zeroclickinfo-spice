function ddg_spice_video(api_result) {
    if(!api_result) {
        return;
    }

    Spice.render({
        data: api_result,
        source_name : 'YouTube',
        source_url : 'http://www.youtube.com/',
        header1 : "YouTube",
        template_frame: "carousel",
        template_normal: "video",
        carousel_css_id: "video",
        carousel_items: api_result,
        force_no_fold : 1,
        carousel_template_detail: "video_detail",
        template_options: {
            li_width: 120,
            li_height: 90
        }
    });

    // Move ddgc_detail above carousel
    $("#ddgc_detail").prependTo("#video");

    function resizeDetail() {
        var $video = $("#spice_video");
        //need 7px of padding on each side
        var width = $video.width() - 14;
        //30px for player menu
        var height = Math.floor(width * 0.5625) + 30;
        $("#ddgc_detail").height(height);
        console.log(width, height);
    };

    // Set height of ddgc_detail;
    resizeDetail();

    $(document).ready(function() {
        // Maintain 16/9 aspect ratio
        $(window).resize(resizeDetail);
    });
}

Handlebars.registerHelper("checkCategory", function(category, title, options) {
    console.log(category);
    if(category === "Music") {
        return options.fn({title: title});
    }
});
