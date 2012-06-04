// Hayoo returns separate results for definitions, modules, packages, and other search queries
// we will just show "functions" results for now (which means everything that isn't a module or a package)
// we also won't show any "did you mean..." stuff, because it's not generally that helpful
function ddg_spice_hayoo(res) {
  var query = DDG.get_query();
  query = query.replace(/^hayoo\s+/i, '');

  if (res['hits'] > 0) {
    var items = new Array();
    var item = new Array();

    // the individual function's json
    var info = sort_functions(res['functions'])[0];

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
    item['u'] = 'http://holumbus.fh-wedel.de/hayoo/hayoo.html?query=' + query; // url

    item['t'] = info['module'];

    // shove it in the array and print
    items[0] = item;
    nra(items, 1);
  } else {
    // no hits, no zero-click info
  }
}

// sort the results to favor exact matches and standard library functions
// this should be done server-side, and will be when the maintainer of Hayoo replies back
function sort_functions(funcs) {
  var query = DDG.get_query();
  var triggers = ['hayoo'];
  query = query.replace(/^hayoo\s+/i, '');

  for (var i in funcs) {
    var fun = funcs[i];
    var priority = 0;

    // favor near-matches, but don't let it get out of hand with redundant naming
    // accept words of any length, because Haskell often emulates math notation with single-character identifiers for generic things
    if (DDG.isRelevant(fun['name'], triggers, 1) ||
        DDG.isRelevant(fun['signature'], triggers, 1)) priority += 4;

    // favor relevant packages/modules
    if (DDG.isRelevant(fun['module'], triggers) ||
        DDG.isRelevant(fun['package'], triggers)) priority += 1;

    // favor stuff that comes with any compiler, and a shortlist of good packages in the Haskell Platform
    if (fun['package'] == 'base') priority += 2;
    if (fun['module'] == 'Prelude') priority += 1; // on top of the bonus of being in base

    if (fun['package'] == 'mtl') priority += 2;
    if (fun['package'] == 'transformers') priority += 1;
    if (fun['package'] == 'parallel') priority += 1;
    if (fun['package'] == 'array') priority += 1;
    if (fun['package'] == 'bytestring') priority += 1;
    if (fun['package'] == 'containers') priority += 1;
    if (fun['package'] == 'text') priority += 1;
    if (fun['package'] == 'time') priority += 1;
    if (fun['package'] == 'network') priority += 1;
    if (fun['package'] == 'old-locale') priority += 1;
    if (fun['package'] == 'random') priority += 1;
    if (fun['package'] == 'parsec') priority += 1;

    // don't favor GHC-specific stuff, because internals are scary
    // don't favor acme results, for obvious reasons
    // don't favor unix, because it's OS-specific
    // don't favor unsafe results unless we are looking for them
    if (fun['package'].match(/ghc/i)) priority -= 1;
    if (fun['package'].match(/acme/i)) priority -= 1;
    if (fun['package'].match(/unix/i)) priority -= 1;
    if (fun['name'].match(/unsafe/i) && !query.match(/unsafe/i)) priority -= 1;

    fun['priority'] = priority;
  }

  funcs = funcs.sort(function(a,b) {return b['priority'] - a['priority'];});

  return funcs;
}

