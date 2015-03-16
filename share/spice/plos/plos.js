(function(env) {     
    env.ddg_spice_plos = function(api_result) {
        "use strict";

        if (!api_result) {
            return Spice.failed('plos');
        }

        // Grab number of results.
        var numFound = api_result.response.numFound;

        // if no results, don't show spice.
        if (numFound < 1) {
            return;
        }

        // Get query, exclude the trigger, and exclude preceding/trailing white space.
        var script = $('[src*="/js/spice/plos/"]')[0],
          source = $(script).attr("src"),
          query = source.match(/plos\/([^\/]+)/)[1];

        Spice.add({
            id: "plos",
            name: "Research",
            data: api_result.response.docs,
            meta: {
                itemType: "Papers",
                sourceName: "PLOS",
                sourceUrl: 'http://www.plosone.org/search/advanced?unformattedQuery=' + query
            }, 
            normalize: function(item) {
                var authors = item.author_display || [],
                  subtitle = authors.length ? authors.join(", ") : "",
                  title = DDG.strip_html(item.title_display),
                  journalName = item.journal ? item.journal + ' ' : '',
                  issueNumber = item.issue ? 'Issue ' + item.issue : '';

                return {
                    url: "http://dx.doi.org/" + item.id,
                    title: title,
                    subtitle: subtitle,
                    description: title,
                    issue: journalName + issueNumber,
                    publicationDate: item.publication_date
                };
            },
            templates: {
                group: 'text',
                options: {
                    footer: Spice.plos.footer
                },
                detail: false,
                item_detail: false
             }
        });
    }
}(this));

// Convert full publication date to year only.
Handlebars.registerHelper('PLOS_year', function(pubdate) {
    "use strict";
    if (pubdate && pubdate.length > 0) {
        var year = pubdate.substr(0, 4);
        return year;
    }
    return '';
});
