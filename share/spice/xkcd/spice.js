/*
  nr is the prefix for this function space.
*/
function ddg_spice_xkcd(xk) {
  // console.log(xk);

    var img,snippet,link,div;

  // validity check
   if (xk['img'] && xk['alt']) {

       // snippet shown in 0-click
       snippet = d.createElement('span');

       if (nur) img = nur('',xk['alt'],xk['img']);
       if (img) {
	   YAHOO.util.Dom.addClass(img,'img_zero_click_big');
	   div = d.createElement('div');
	   div.appendChild(img);
	   snippet.appendChild(div);

	   link = d.createElement('a');
	   link.href = '/?q=xkcd ' + (parseInt(xk['num']) - 1)
	   link.appendChild(d.createTextNode('Prev'));
	   snippet.appendChild(link);
	   snippet.appendChild(d.createTextNode('\u00a0 \u00a0'));
       }
       
       items = new Array();
       items[0] = new Array();
       items[0]['a'] = snippet;
       
       items[0]['h'] = xk['safe_title'];
       
       // Source name and url for the More at X link.
       items[0]['s'] = 'XKCD';
       items[0]['u'] = 'http://xkcd.com/' + xk['num'];
       
       // Force no compression.
       items[0]['f'] = 1;
       
       // The rendering function is nra.
       nra(items);
   }
}