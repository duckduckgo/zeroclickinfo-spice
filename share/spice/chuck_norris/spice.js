function ddg_spice_chuck_norris(res){
    if (res['type'] == 'success') {		
        items = [[]];
        items[0]['a'] = res['value']['joke'];
        items[0]['s'] = 'Internet Chuck Norris Database';
        items[0]['u'] = 'http://www.icndb.com/';
        items[0]['force_space_after'] = true;
        nra(items,1,1);
    }
}

