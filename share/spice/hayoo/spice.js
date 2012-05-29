// Hayoo returns separate results for definitions, modules, packages, and other search queries
// we will just show "functions" results for now (which means everything that isn't a module or a package)
// we also won't show any "did you mean..." stuff, because it's not generally that helpful
function ddg_spice_hayoo(res) {
  if (res['hits'] > 0) {
    var items = new Array();
    var item = new Array();

    // the individual function's json
    var info = res['functions'][0];

    // build some nice output
    var snippet = document.createElement('span');
    snippet.innerHTML += '<code>' + info['name'] + ' :: ' + info['signature'] + '</code><br>'; // answer
    if (info['description'] != '') {
      // Hayoo uses scripts to fill empty <a> tags
      var description = info['description'].replace(/<a>/g,'');
      description = description.replace(/<\/a>/g,'');

      snippet.innerHTML += description;
    }

    // build item
    item['a'] = snippet;

    item['h'] = 'Hayoo - <b>' + info['module'] + '</b>.' + info['name']; // title

    // build a link back to Hayoo, rather than Hackage - it's polite, and users rarely want exactly one result when searching by type
    item['s'] = 'Hayoo'; // source
    item['u'] = 'http://holumbus.fh-wedel.de/hayoo/hayoo.html?query=' + info['name']; // url

    item['t'] = info['module'];

    // shove it in the array and print
    items[0] = item;
    nra(items, 1);
  } else {
    // no hits, no zero-click info
  }
}

