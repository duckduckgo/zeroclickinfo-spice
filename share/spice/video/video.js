function ddg_spice_video(api_result) {
    if(!api_result) {
        return;
    }

    $.ajaxSetup({
        cache: true
    });

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
        var width = $video.width() - 14;
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

// This is the callback function of /itt.
ddg_spice_video.itunes = function(api_result) {
    if(!api_result || !api_result.results || api_result.results.length === 0) {
        return;
    }

    // Redirect to Apple's website.
    window.location = api_result.results[0].trackViewUrl;
};

ddg_spice_video.set_itunes = function(element) {
    var title = $(element).data("title");
    title = stripTitle(title);

    $.getScript("/iit/" + encodeURIComponent(title));
};

Handlebars.registerHelper("checkMusic", function(category, title, options) {
	//Remove things from the title that we don't really need.
	var stripTitle = function(s) {
	    // Remove things like "(Explicit)".
	    s = s.replace(/\(.*\)|\[.*\]/, "");
	    // Remove things like "feat. Alicia Keys".
	    s = s.replace(/\s+f(?:ea|)t\..*$/, "");
	    // Trim the ends of the string.
	    return s.replace(/^\s+|\s+$/, "");
	}

	if(category === "Music") { 
	    return options.fn({
		    title: stripTitle(title)
	    });
	}
});