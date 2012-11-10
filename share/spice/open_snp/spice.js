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
            var mendeley_snippet = '<br/>';
            if ( annotations['mendeley'] ){
                mendeley_length = annotations['mendeley'].length;
                var first_paper = annotations['mendeley'][0];
                var time = first_paper['publication_year'];
                mendeley_snippet += 'First paper:<br/>' + first_paper['author'] + '<i>et al.</i>, ' + time + ': <i>' + first_paper['title'] + '</i>. [<a href="' + first_paper['url'] + '">Link</a>]<br/>';
            }

            // PLOS-annotation
            var plos_snippet = '<br/>';
            if ( annotations['plos'] ) {
                plos_length = annotations['plos'].length;
                var first_paper = annotations['plos'][0];
                time = new Date(first_paper['publication_date']).getFullYear();
                plos_snippet += 'First paper:<br/> ' + first_paper['author'] + ' <i>et al.</i>, ' + time +  ': <i>' + first_paper['title'] + '</i>. [<a href="' + first_paper['url'] + '">Link</a>]<br/>';
            }

            // SNPedia-annotation - add to main-snippet
            if ( annotations['snpedia'] ) {
                snippet += '<br/>Annotations at <a href="http://www.snpedia.com/index.php/' + snp_name + '">SNPedia</a>:<br/>'
                var snpedia_length = annotations['snpedia'].length;
                for ( var i = 0; i < annotations['snpedia'].length; i++ ) {
                    snippet += annotations['snpedia'][i]['url'].split('/')[4] + ': ' + annotations['snpedia'][i]['summary'] + '<br/>';
                }
                snippet += '<br/>';
            }
        }

        items = [ [], [], [], [] ];
        items[0]['a'] = snippet;
        items[0]['h'] = 'SNP <b>' + snp_name + '</b> at openSNP.org';
        items[0]['force_big_header'] = 1;
        items[0]['s'] = 'openSNP.org';
        items[0]['u'] = 'http://openSNP.org/snps/' + ir['snp']['name'];
        if ( mendeley_snippet != '<br/>' ) {
            items[1]['a'] = mendeley_snippet;
            items[1]['t'] = 'Mendeley-papers: ' + mendeley_length;
            items[1]['s'] = 'Mendeley';
            items[1]['u'] = 'http://www.mendeley.com/research-papers/search/?query=' + snp_name;
        }
        if ( plos_snippet != '<br/>' ) {
            items[2]['a'] = plos_snippet;
            items[2]['t'] = 'PLOS-papers: ' + plos_length;
            items[2]['s'] = 'PLOS';
            items[2]['u'] = 'http://www.plosone.org/search/advancedSearch.action?noSearchFlag=true&query=' + snp_name;
        }
        nra(items);
    }
}
