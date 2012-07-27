function ddg_spice_hayoo(res) {
 
  if (res['hits'] > 0) {
    var query = DDG.get_query().replace(/\s*hayoo\s*/i, '');

    var item = res['functions'][0];

    var snippet = '<pre><code>' + item.name + ' :: ' + item.signature + '</code></pre>'
                + 'Package: ' + item.package + '<br>' + 'Module: ' + item.module + '<br>';
    
    if (item.description != '') {
      var description = item.description.replace(/<a>/g,'');
      description = description.replace(/<\/a>/g,'');

      snippet += description;
    }

    var items = [[]];
    items[0]['a'] = snippet;
    items[0]['h'] = 'Hayoo! (' + query + ')';
    items[0]['s'] = 'Hackage';
    items[0]['u'] = item.uri;
    items[0]['f'] = 1;
    items[0]['force_big_header'] = 1;

    nra(items);
  }
}