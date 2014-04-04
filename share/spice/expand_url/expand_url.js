function ddg_spice_expand_url(api_response) {
    "use strict";

    // Get the orignal query.
    var query = DDG.get_query().replace(/expand\s*/i, "");

    // Check if there are any errors.
    if (!api_response["long-url"] || api_response["long-url"] === query) {
        return;
    }

    // Display the plug-in.
    Spice.add({
        data             : api_response,
        header1          : "Expand Link (LongURL)",
        sourceUrl       : "http://longurl.org/expand?url=" + encodeURIComponent(query),
        sourceName      : "LongURL",
        template_normal  : "expand_url"
    });
}
