function ddg_spice_chuck_norris(res) {
    if (res['type'] == 'success') {		
        items = [[]];
        items[0]['i'] = 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/ChuckNorris200611292256.jpg/48px-ChuckNorris200611292256.jpg';
        items[0]['a'] = res['value']['joke'];
        items[0]['s'] = 'Internet Chuck Norris Database';
        items[0]['u'] = 'http://www.icndb.com/';
        items[0]['force_no_icon'] = true;
        nra(items,1,1);
    }
}

