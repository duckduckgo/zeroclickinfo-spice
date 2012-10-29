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
            if ( annotations['mendeley'] ){
                snippet += '<br/>There is Mendeley-annotation available!<br/>';
            }
            if (annotations['snpedia']) {
                snippet += '<br/>SNPedia has the following:<br/>';
                for ( var i = 0; i < annotations['snpedia'].length; i++ ) {
                    snippet += annotations['snpedia'][i]['url'].split('/')[4] + ': ' + annotations['snpedia'][i]['summary'] + '<br/>';
                }
            }
            if (annotations['plos']) {
                snippet += '<br/>There is PLOS-annotation available!<br/>';
            }

        }

        items = new Array();
        items[0] = new Array();
        items[0]['a'] = snippet;
        items[0]['h'] = 'Information on SNP <b>' + snp_name + '</b> at openSNP.org';
        items[0]['s'] = 'openSNP.org'
        items[0]['u'] = 'http://openSNP.org/snps/' + ir['snp']['name'];
        nra(items);
    }
}
