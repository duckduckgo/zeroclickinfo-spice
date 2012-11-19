function ddg_spice_open_snp(ir) {
    // did the API return information?
    if ( ir['snp'] ) {

        var snp_name = ir['snp']['name'];
        var snp_position = ir['snp']['position'];
        var snp_chromosome = ir['snp']['chromosome'];

        var snippet = '<i>Chromosome:</i> ';
        snippet += snp_chromosome + '<br/>';
        snippet += '<i>Position:</i> ' + snp_position + '<br/>';

        // Do we have annotations?
        if (ir['snp']['annotations']) {
            var annotations = ir['snp']['annotations'];
            // Mendeley-annotation
            var annotations_snippet = '<br/>';
            var mendeley_length = 0;
            var plos_length = 0;
            if ( annotations['mendeley'][0]){
                mendeley_length = annotations['mendeley'].length;
                var first_paper = annotations['mendeley'][0];
                var time = first_paper['publication_year'];
                annotations_snippet += '<br/>' + first_paper['author'] + ' <i>et al.</i>, ' + time + ': <i>' + '<a href="' +  first_paper['url'] + '">' + first_paper['title'] + '</a></i>. [<a href="http://www.mendeley.com/research-papers/search/?query=' + snp_name + '">' + (parseInt(mendeley_length)-1) + ' more papers at Mendeley</a>]<br/>';
            }

            // PLOS-annotation
            if ( annotations['plos'][0]  ) {
                plos_length = annotations['plos'].length;
                var first_paper = annotations['plos'][0];
                time = new Date(first_paper['publication_date']).getFullYear();
                annotations_snippet += '<br/>' + first_paper['author'] + ' <i>et al.</i>, ' + time +  ': <i><a href="' + first_paper['url'] + '">'+ first_paper['title'] + '</i></a>. [<a href="http://www.plosone.org/search/advancedSearch.action?noSearchFlag=true&query=' + snp_name + '">'  + (parseInt(plos_length)-1) + ' more papers at PLOS</a>]<br/>';
            }

            // Personal Genome Project
            if ( annotations['pgp_annotations'][0]) {
                pgp_length = annotations['pgp_annotations'].length;
                var first_annotation = annotations['pgp_annotations'][0];
                var gene = first_annotation['gene'];
                var impact = first_annotation['impact'];
                annotations_snippet += '<br/>Gene: ' + gene + ', impact: ' + impact + ' [More at <a href="">Personal Genome Project</a>]<br/>';
            }

            // Genome.gov
            if ( annotations['genome_gov_publications'][0]  ) {
                genomegov_length = annotations['genome_gov_publications'].length;
                var first_paper = annotations['genome_gov_publications'][0];
                var time = first_paper['publication_date'].split("/")[2];
                var url = first_paper['pubmed_link'];
                var title = first_paper['title'];
                annotations_snippet += '<br/>' + first_paper['first_author'] + ' <i>et al.</i>, ' + time + ': <a href="' + url + '">' + title + '</a>[<a href="https://www.genome.gov/26525384#searchForm">' + genomegov_length + ' more papers at Genome.gov</a>]<br/>';
            }

            // SNPedia-annotation - add to main-snippet
            if ( annotations['snpedia'][0] ) {
                snippet += '<br/>Annotations at <a href="http://www.snpedia.com/index.php/' + snp_name + '">SNPedia</a>:<br/>'
                var snpedia_length = annotations['snpedia'].length;
                for ( var i = 0; i < annotations['snpedia'].length; i++ ) {
                    snippet += annotations['snpedia'][i]['url'].split('/')[4] + ': ' + annotations['snpedia'][i]['summary'] + '<br/>';
                }
            }
        }

        items = [ [], [] ];
        items[0]['a'] = snippet;
        items[0]['h'] = 'SNP <b>' + snp_name + '</b> at openSNP.org';
        items[0]['force_big_header'] = 1;
        items[0]['s'] = 'openSNP.org';
        items[0]['u'] = 'http://openSNP.org/snps/' + ir['snp']['name'];
        if ( annotations_snippet != '<br/>' ) {
            items[1]['a'] = annotations_snippet + '<br/>';
            items[1]['t'] = 'Further annotations';
        }
        nra(items);
    }
}
