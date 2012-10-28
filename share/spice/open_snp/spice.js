function ddg_spice_opensnp(ir) {
    var snippet, div;

    // did the API return an error?
    if ( ir['error'] ) {
        return;
    }

    // did the API return information?
    if ( ir['snp'] ) {
        out = ir['chromosome'];
        items = new Array();
        items[0] = new Array();
        items[0]['a'] = ir;
        items[0]['h'] = '';
        items[0]['u'] = ir['source_url'];
        items[0]['s'] = 'openSNP';
        nra(items);
    }
}
