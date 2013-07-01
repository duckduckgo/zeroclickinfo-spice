function ddg_spice_video(api_result) {
    console.log(api_result);
    Spice.render({
        data: api_result,
        source_name : 'YouTube',
        source_url : 'http://www.youtube.com/',
        header1 : "YouTube",
        template_frame: "carousel",
        template_normal: "video",
        carousel_css_id: "video",
        carousel_items: api_result.items,
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
        var $khan = $("#spice_video");
        var width = $khan.width() - 14;    //need 7px of padding on each side
        var height = Math.floor(width * 0.5625) + 30;    //30px for player menu
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