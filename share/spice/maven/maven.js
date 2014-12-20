function ddg_spice_maven(api_result) {
    "use strict";

    if (!api_result || api_result.responseHeader.status || api_result.response.numFound == 0) {
        return Spice.failed('maven');
    }

    Spice.add({
        id: "maven",
        name: "Software",
        data: api_result,
        meta: {
            sourceName: "maven.org",
            sourceUrl: 'http://search.maven.org/#search%7Cga%7C1%7C' + encodeURIComponent(api_result.responseHeader.params.q),
        },
        normalize: function(item) {
            return {
                title: api_result.responseHeader.params.q + " (Maven Central Repository)"
            }  
        },
        templates: {
            group: 'text',
            options: {
                content: Spice.maven.content,
                moreAt: true
            }
        }
    });
}