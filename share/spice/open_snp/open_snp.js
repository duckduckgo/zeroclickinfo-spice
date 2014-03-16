ddg_spice_open_snp = function(api_result) {
    "use strict";

    if (!api_result.snp) {
        return;
    }
    api_result = api_result.snp;

    Spice.render({
        data              : api_result,
        header1           : api_result.name + ' (OpenSNP)',
        source_url        : 'https://opensnp',
        force_favicon_url : 'http://opensnp.org/favicon.ico',
        source_name       : 'OpenSNP',
        template_normal   : 'open_snp',
        force_big_header  : true,
        force_no_fold     : true
    });

    $('#show-references').click(function() {
        $('#snp-annotations').toggle();
    });
}

Handlebars.registerHelper('facts', function(facts, options) {
    "use strict";

    return options.fn(
        $.map(facts, function(fact) {
            return {
                'url'       : fact.url,
                'reference' : fact.url
                                .replace('http://www.snpedia.com/index.php/', ''),
                'fact'      : fact.summary
            }
        })
    );
});

Handlebars.registerHelper('annotations', function(annotations, name, options) {
    "use strict";

    var mendeley = annotations.mendeley;
    var plos = annotations.plos;
    var genome = annotations.genome_gov_publications;
    var pgp = annotations.pgp_annotations;

    var annotations = [];

    if (mendeley.length) {
        annotations.push({
            'num'         : mendeley.length - 1,
            'author'      : mendeley[0].author,
            'url'         : mendeley[0].url,
            'title'       : mendeley[0].title,
            'year'        : mendeley[0].publication_year,
            'source'      : 'http://www.mendeley.com/research-papers/search/?query='
                            + name,
            'publication' : 'Mendeley'
        });
    }

    if (plos.length) {
        annotations.push({
            'num'         : plos.length - 1,
            'author'      : plos[0].author,
            'url'         : plos[0].url,
            'title'       : plos[0].title,
            'year'        : new Date(plos[0].publication_date).getFullYear(),
            'source'      : 'http://www.plosone.org/search/advancedSearch.action?'
                            + 'noSearchFlag=true&query=' + name,
            'publication' : 'PLOS'
        });
    }

    if (genome.length) {
      annotations.push({
          'num'         : genome.length - 1,
          'author'      : genome[0].first_author,
          'url'         : genome[0].pubmed_link,
          'title'       : genome[0].title,
          'year'        : genome[0].publication_date.split('/')[2],
          'source'      : 'https://www.genome.gov/26525384#searchForm',
          'publication' : 'Genome.gov'
      });
    }

    if (pgp.length) {
        annotations.pgp = {
            'gene'        : pgp[0].gene,
            'impact'      : pgp[0].impact,
            'year'        : pgp[0].publication_date.split('/')[2],
            'source'      : 'http://www.personalgenomes.org/',
            'publication' : 'Personal Genome Project'
        };
    }

    return options.fn(annotations);
});
