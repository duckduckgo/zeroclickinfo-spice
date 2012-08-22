function ddg_spice_iwantmyname(ir) {
    var snippet = '';
    if (ir['status'] == 'OK') {
       snippet = ir['info'];
       items = new Array();
       items[0] = new Array();
       items[0]['a'] = snippet;
       items[0]['s'] = 'iWantMyName';
       items[0]['u'] = ir['url'];
       items[0]['h'] = ir['title'];
       items[0]['i'] = ir['logo'];
       nra(items);
    }
}

