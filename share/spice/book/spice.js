function ddg_spice_book(response) {
    // var snippet = 'test';
    // ir['status']= 'OK';
    //System.out.println("Hello World!");
    // if (ir['status'] == 'OK') {
       // snippet = ir['abstract'];
       items = new Array();
       items[0] = new Array();
       items[0]['a'] = response['snippet'];
       items[0]['h'] = 'Readometer';
       items[0]['s'] = 'idreambooks';
       items[0]['u'] = 'http://idreambooks.com';
       nra(items);
    // }
}