function ddg_spice_open_snp(ir) {
    // did the API return information?
    var table;
    if ( ir['snp'] ) {
        var snp_name = ir['snp']['name'];
        var snp_position = ir['snp']['position'];
        var snp_chromosome = ir['snp']['chromosome'];
        var snippet = 'Position: ';
        snippet += snp_position + '<br/>';
        snippet += 'Chromosome: ' + snp_chromosome + '<br/>';
        // Do we have annotations?
        if (ir['snp']['annotations']) {
            var annotations = ir['snp']['annotations'];
            var mendeley_papers = 0;
            var plos_papers = 0;
            if ( annotations['mendeley'] ){
                mendeley_papers = annotations['mendeley'].length;
            }
            if ( annotations['plos'] ) {
                plos_papers = annotations['plos'].length;
            }
            snippet += '<br/>There are ' + mendeley_papers + ' papers at Mendeley and ' + plos_papers + ' papers at PLOS available on this SNP.<br/>';
            if ( annotations['snpedia'] ) {
                snippet += '<br/>SNPedia has the following:<br/>';
                for ( var i = 0; i < annotations['snpedia'].length; i++ ) {
                    snippet += annotations['snpedia'][i]['url'].split('/')[4] + ': ' + annotations['snpedia'][i]['summary'] + '<br/>';
                }
                snippet += '<br/>';
            }

        }

        items = new Array();
        items[0] = new Array();
        items[0]['a'] = snippet;
        items[0]['h'] = 'Information on SNP <b>' + snp_name + '</b> at openSNP.org';
        items[0]['s'] = 'openSNP.org'
        items[0]['u'] = 'http://openSNP.org/snps/' + ir['snp']['name'] + '#papers';
        nra(items);
    }
}
