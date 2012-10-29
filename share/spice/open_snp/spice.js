function ddg_spice_open_snp(ir) {
    // did the API return information?
    items = new Array();
    items[0] = new Array();
    items[0]['a'] = ir['snp']['name'];
    items[0]['h'] = 'SNP-annotation at openSNP.org';
    items[0]['u'] = ir['source_url'];
    items[0]['s'] = 'openSNP.org/snps/' + ir['snp']['name'];
    nra(items);
}
