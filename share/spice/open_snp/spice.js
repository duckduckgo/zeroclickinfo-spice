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
            var annotations_snippet = '<br/><br/>';
            var mendeley_length = 0;
            var plos_length = 0;
            if ( annotations['mendeley'] ){
                mendeley_length = annotations['mendeley'].length;
                var first_paper = annotations['mendeley'][0];
                var time = first_paper['publication_year'];
                annotations_snippet += '<b>Mendeley:</b> ' + first_paper['author'] + ' <i>et al.</i>, ' + time + ': <i>' + '<a href="' +  first_paper['url'] + '">' + first_paper['title'] + '</a></i>. [<a href="http://www.mendeley.com/research-papers/search/?query=' + snp_name + '">' + (parseInt(mendeley_length)-1) + ' more papers at Mendeley</a>]<br/><br/>';
            }

            // PLOS-annotation
            if ( annotations['plos'] ) {
                plos_length = annotations['plos'].length;
                var first_paper = annotations['plos'][0];
                time = new Date(first_paper['publication_date']).getFullYear();
                annotations_snippet += '<b>PLOS:</b> ' + first_paper['author'] + ' <i>et al.</i>, ' + time +  ': <i><a href="' + first_paper['url'] + '">'+ first_paper['title'] + '</i></a>. [<a href="http://www.plosone.org/search/advancedSearch.action?noSearchFlag=true&query=' + snp_name + '">'  + (parseInt(plos_length)-1) + ' more papers at PLOS</a>]<br/><br/>';
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

        items = [ [], [] ];
        items[0]['a'] = snippet;
        items[0]['h'] = 'SNP <b>' + snp_name + '</b> at openSNP.org';
        items[0]['force_big_header'] = 1;
        items[0]['s'] = 'openSNP.org';
        items[0]['u'] = 'http://openSNP.org/snps/' + ir['snp']['name'];
        if ( annotations_snippet != '<br/><br/>' ) {
            items[1]['a'] = annotations_snippet;
            items[1]['t'] = 'Further annotations';
        }
        nra(items);
    }
}
