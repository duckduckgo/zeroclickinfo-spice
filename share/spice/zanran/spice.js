/*
  nr is the prefix for this function space.
*/
function ddg_spice_zanran(zanran_results) {
  console.log(zanran_results);

  var content = d.createElement('div');
  
  var results = zanran_results.results;

  for(var i=0; i<results.length; i++) {
    var link = d.createElement('a');
    var img = d.createElement('img');
    
    link.href = results[i].url;
    link.title = results[i].title;
    
    img.src = results[i].preview;
    YAHOO.util.Dom.setAttribute(img, 'style', 'max-width: 140px; max-height: 200px; display: inline;');

	  link.appendChild(img);
	  content.appendChild(link);
  }
  
  items = [[]];
  items[0]['a'] = content;
  items[0]['h'] = 'Data & Statistics';
  items[0]['s'] = 'Zanran';
  items[0]['u'] = zanran_results.more;
  items[0]['f'] = 1;
  // items[0]['i'] = 'http://zanran.com/favicon.ico';

  nra(items);
}
