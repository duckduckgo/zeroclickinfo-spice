/*
  nr is the prefix for this function space.
  
  There's probably a way to do it in YUI that's not so awful, but I only know jQuery...
*/
function ddg_spice_zanran(zanran_results) {
  console.log(zanran_results);

  var content = d.createElement('div');
  
  var results = zanran_results.results;
  
  var table = d.createElement('table');

  var row1 = d.createElement('tr');
  var row2 = d.createElement('tr');

  content.appendChild(table);
  table.appendChild(row1);
  table.appendChild(row2);

  for(var i=0; i<results.length; i++) {
    var cell1 = d.createElement('td');
    var cell2 = d.createElement('td');

    var link1 = d.createElement('a');
    var link2 = d.createElement('a');
    var img  = d.createElement('img');
    var title = d.createElement('div');

    YAHOO.util.Dom.setAttribute(cell1, 'style', 'vertical-align: bottom; text-align: center;');

    YAHOO.util.Dom.setAttribute(cell2, 'style', 'vertical-align: top;');
    
    link1.href = results[i].url;
    link1.title = results[i].title;

    link2.href = results[i].url;
    link2.title = results[i].title;
    
    img.src = results[i].preview;
    YAHOO.util.Dom.setAttribute(img, 'style', 'max-width: 137px; max-height: 200px; display: inline; ');

	  title.appendChild(d.createTextNode(results[i].short_title));
    YAHOO.util.Dom.setAttribute(title, 'style', 'width: 137px; background: #e7fdc7; border: 1px solid black; margin: 2px; padding: 2px; font-size: 80%;');

	  row1.appendChild(cell1);
	  cell1.appendChild(link1);
	  link1.appendChild(img);

	  row2.appendChild(cell2);
	  cell2.appendChild(link2)
	  link2.appendChild(title);
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
