/*
  nr is the prefix for this function space.
  
  There's probably a way to do it in YUI that's not so awful, but I only know jQuery...
*/
function ddg_spice_zanran(zanran_results) {
  /* IE6 cannot be supported due to lack of max-width / min-width without rewriting everything */
  if(YAHOO.env.ua.ie && YAHOO.env.ua.ie < 7) {
    return;
  }
  if(!zanran_results || !zanran_results.results || !zanran_results.results.length) {
    return;
  }

  var results = zanran_results.results;
  
  var content = d.createElement('div');
  var table = d.createElement('table');
  var tbody = d.createElement('tbody');
  var row1 = d.createElement('tr');
  var row2 = d.createElement('tr');

  content.appendChild(table);
  table.appendChild(tbody);
  tbody.appendChild(row1);
  tbody.appendChild(row2);

  for(var i=0; i<results.length; i++) {
    var cell1 = d.createElement('td');
    var cell2 = d.createElement('td');

    var link1 = d.createElement('a');
    var link2 = d.createElement('a');
    var img  = d.createElement('img');
    var title = d.createElement('div');

    YAHOO.util.Dom.setStyle(cell1, 'text-align', 'center');
    YAHOO.util.Dom.setStyle(cell1, 'vertical-align', 'bottom');

    YAHOO.util.Dom.setStyle(cell2, 'vertical-align', 'top');
    YAHOO.util.Dom.setStyle(cell2, 'width', '137px');
    YAHOO.util.Dom.setStyle(cell2, 'background', '#e7fdc7');
    YAHOO.util.Dom.setStyle(cell2, 'border', '1px solid black');
    YAHOO.util.Dom.setStyle(cell2, 'margin', '2px');
    YAHOO.util.Dom.setStyle(cell2, 'padding', '2px');
    YAHOO.util.Dom.setStyle(cell2, 'font-size', '80%');
    
    link1.href = results[i].preview_url;
    link1.title = results[i].title;

    link2.href = results[i].preview_url;
    link2.title = results[i].title;
    
    img.src = results[i].preview_image;
    YAHOO.util.Dom.setStyle(img, 'display', 'inline');
    YAHOO.util.Dom.setStyle(img, 'max-width', '137px');
    YAHOO.util.Dom.setStyle(img, 'max-height', '200px');

	  title.appendChild(d.createTextNode(results[i].short_title));

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
};
