/*jshint sub:true, boss:true */
(function() {
    "use strict";
    var root = this;
    root.ddg_spice_open_snp = function(result) {
        // Did the API return information?
        if (result && result['snp']) {
            var snp_name = result['snp']['name'],
                snp_position = result['snp']['position'],
                snp_chromosome = result['snp']['chromosome'],
                first_paper = "",
                time, annotations, annotations_snippet, mendeley_length, snippet, plos_length,
                pgp_length, first_annotation, gene, impact, genomegov_length, url, title, snpedia_length, i,
                items = [[],[]];

            snippet = '<i>Chromosome:</i> ';
            snippet += snp_chromosome + '<br/>';
            snippet += '<i>Position:</i> ' + snp_position + '<br/>';

            // Do we have annotations?
            if (result['snp']['annotations']) {
                annotations = result['snp']['annotations'];
                // Mendeley-annotation
                annotations_snippet = '<br/>';
                mendeley_length = 0;
                if (annotations['mendeley'][0]){
                    mendeley_length = annotations['mendeley'].length;
                    first_paper = annotations['mendeley'][0];
                    time = first_paper['publication_year'];
                    annotations_snippet += '<br/>' + first_paper['author'] + ' <i>et al.</i>, ' + time + ': <i>' + '<a href="' +  first_paper['url'] + '">' + first_paper['title'] + '</a></i>. [<a href="http://www.mendeley.com/research-papers/search/?query=' + snp_name + '">' + (parseInt(mendeley_length, 10)-1) + ' more papers at Mendeley</a>]<br/>';
                }

                // PLOS-annotation
                plos_length = 0;
                if (annotations['plos'][0]) {
                    plos_length = annotations['plos'].length;
                    first_paper = annotations['plos'][0];
                    time = new Date(first_paper['publication_date']).getFullYear();
                    annotations_snippet += '<br/>' + first_paper['author'] + ' <i>et al.</i>, ' + time +  ': <i><a href="' + first_paper['url'] + '">'+ first_paper['title'] + '</i></a>. [<a href="http://www.plosone.org/search/advancedSearch.action?noSearchFlag=true&query=' + snp_name + '">'  + (parseInt(plos_length, 10)-1) + ' more papers at PLOS</a>]<br/>';
                }
                pgp_length = 0;
                // Personal Genome Project
                if ( annotations['pgp_annotations'][0]) {
                    pgp_length = annotations['pgp_annotations'].length;
                    first_annotation = annotations['pgp_annotations'][0];
                    gene = first_annotation['gene'];
                    impact = first_annotation['impact'];
                    annotations_snippet += '<br/>Gene: ' + gene + ', impact: ' + impact + ' [More at <a href="">Personal Genome Project</a>]<br/>';
                }

                // Genome.gov
                genomegov_length = 0;
                if ( annotations['genome_gov_publications'][0]  ) {
                    genomegov_length = annotations['genome_gov_publications'].length;
                    first_paper = annotations['genome_gov_publications'][0];
                    time = first_paper['publication_date'].split("/")[2];
                    url = first_paper['pubmed_link'];
                    title = first_paper['title'];
                    annotations_snippet += '<br/>' + first_paper['first_author'] + ' <i>et al.</i>, ' + time + ': <a href="' + url + '">' + title + '</a>[<a href="https://www.genome.gov/26525384#searchForm">' + genomegov_length + ' more papers at Genome.gov</a>]<br/>';
                }

                // SNPedia-annotation - add to main-snippet
                if (annotations['snpedia'][0]) {
                    snippet += '<br/><i>Annotations at <a href="http://www.snpedia.com/index.php/' + snp_name + '">SNPedia</a>:</i><br/>';
                    snpedia_length = annotations['snpedia'].length;
                    for ( i = 0; i < snpedia_length; i++ ) {
                        snippet += annotations['snpedia'][i]['url'].split('/')[4] + ': ' + annotations['snpedia'][i]['summary'] + '<br/>';
                    }
                }
            }

            items[0] = {
                a: snippet,
                h: 'SNP <b>' + snp_name + '</b> at openSNP.org',
                force_big_header: true,
                s: 'openSNP.org',
                u: 'http://openSNP.org/snps/' + result['snp']['name']
            };
            if (annotations_snippet !== '<br/>') {
                items[1] = {
                    a: annotations_snippet + '<br/>',
                    s: 'openSNP.org',
                    u: 'http://openSNP.org/snps/' + result['snp']['name'],
                    t: 'Further annotations'
                };
            }
            nra(items);
        }
    };
}).call(this);
