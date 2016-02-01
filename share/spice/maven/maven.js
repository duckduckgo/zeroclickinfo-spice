(function(env){
  "use strict";
  env.ddg_spice_maven = function(api_result){

    if (!api_result || api_result.responseHeader.status || api_result.response.numFound == 0) {
        return Spice.failed('maven');
    }

    var searchQuery = api_result.responseHeader.params.q;

    Spice.add({
        id: "maven",
        name: "Software",
        data: api_result,
        meta: {
            sourceName: "Maven",
            sourceUrl: 'http://search.maven.org/#search%7Cga%7C1%7C' + encodeURIComponent(searchQuery),
        },
        normalize: function(item) {
            return {
                title: searchQuery,
                subtitle: "Maven Central Repository"
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
  };
}(this));
