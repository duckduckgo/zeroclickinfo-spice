function ddg_spice_expand_url(api_response) {
    var url = {};
    url['query'] = DDG.get_query().replace(/expand\s*/i, "");
    if (!api_response["long-url"] || api_response["long-url"] == url['query']) return;
    url['long-url'] = api_response['long-url'];

    var out ='Expanded url: <a href="' 
            + api_response['long-url'] + '">' 
            + api_response['long-url'] + '</a>';

    Spice.render({
        data             : url,
        header1          : url['query'] + " (Short URL)",
        source_url       : 'http://longurl.org/expand?url=' 
                            + encodeURIComponent(url['query']),
        source_name      : 'LongURL',
        template_normal  : 'expand_url',
    });
}
