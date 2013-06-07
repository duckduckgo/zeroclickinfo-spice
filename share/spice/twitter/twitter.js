function ddg_spice_twitter_trends(api_result) {
    if (!api_result || api_result.length === 0) {
        return;
    }

    Spice.render({
        data : api_result,
        force_big_header : true,
        source_name : "Twitter",
        source_url : "http://twitter.com",
        template_normal : "twitter_trends",
        header1 : "Trending in " + api_result[0].locations[0].name + " (Twitter)"
    });
}
