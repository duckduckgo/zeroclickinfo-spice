function ddg_spice_opensnp(ir) {
    var snippet = '';
    // did the API return information?
    if ( ir['snp'] ) {
        items = new Array();
        items[0] = new Array();
        snippet = ir['snp'];
        items[0]['a'] = snippet;
        items[0]['h'] = 'test_title';
        items[0]['u'] = ir['source_url'];
        items[0]['s'] = 'openSNP';
        nra(items);
    }
}
