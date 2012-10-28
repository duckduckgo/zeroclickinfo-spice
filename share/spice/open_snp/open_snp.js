function ddg_spice_opensnp(ir) {
    var out = '';

    if ( ir['snp'] ) {
        out = ir['chromosome'];
    }
    if (out) {
        items = new Array();
        items[0] = new Array();
        items[0]['a'] = out;
        items[0]['h'] = '';
        items[0]['u'] = ir['source_url'];
        items[0]['s'] = 'openSNP';
        nra(items);
    }
}
