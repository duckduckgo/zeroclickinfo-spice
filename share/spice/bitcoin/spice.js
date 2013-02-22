function ddg_spice_bitcoin(data) {
  var img,snippet,link,div;

  // validity check
  if (data['status'] == 200 && data['value']) {

    items = new Array();
    items[0] = new Array();
    items[0]['a'] = data['html']+'\n';

    items[0]['h'] = 'BTC on DDG';
    items[0]['i'] = data['img']

     // Source name and url for the More at X link.
     items[0]['s'] = 'BTC on DDG';
     items[0]['u'] = 'http://s3-eu-west-1.amazonaws.com/btc.convert/support.html';
     
     // Force no compression.
     items[0]['force_no_fold'] = 1;
     
     // The rendering function is nra.
     nra(items);
  }
}
