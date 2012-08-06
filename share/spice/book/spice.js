function ddg_spice_book(ir) {
    var snippet = '';
    if (ir['status'] == 'OK') {
       snippet = ir['abstract'];
       items = new Array();
       items[0] = new Array();
       items[0]['a'] = snippet;
       items[0]['h'] = '';
       items[0]['s'] = 'Expatistan';
       items[0]['u'] = ir['source_url'];
       nra(items);
    }
}