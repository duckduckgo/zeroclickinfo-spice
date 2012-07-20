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
  
  var out = "";

  for(var i=0; i<results.length; i++) {
    if(i==3) break; // 3 results max
    var div = d.createElement("div");
    YAHOO.util.Dom.addClass(div, 'highlight_zero_click1 highlight_zero_click_wrapper');
    YAHOO.util.Dom.setStyle(div, 'clear', 'both');
    YAHOO.util.Dom.setStyle(div, 'border-bottom', '1px dotted black');
    YAHOO.util.Dom.setStyle(div, 'width', '620px');
    
    var img_link = d.createElement("a");
    img_link.href = results[i].preview_url;
    img_link.title = results[i].title;
    var img = d.createElement('img');
    img.src = results[i].preview_image;
    img_link.appendChild(img);
    YAHOO.util.Dom.setStyle(img, 'max-width', '43px');
    YAHOO.util.Dom.setStyle(img, 'max-height', '60px'); // A4 ratio
    YAHOO.util.Dom.setStyle(img, 'border', '1px solid black');
    YAHOO.util.Dom.setStyle(img_link, 'float', 'right');
    YAHOO.util.Dom.setStyle(img_link, 'margin-left', '15px');
    
    div.appendChild(img_link);

    var title = results[i].title;
    if(title.length > 150){
      var words = title.split(/\s+/);
      title = "";
      while(words.length && title.length + 1 + words[0].length < 150) {
        title = title + " " + words.shift();
      }
    }

    var p1 = d.createElement('div');
    p1.appendChild(d.createTextNode(title));
    div.appendChild(p1);

    YAHOO.util.Dom.setStyle(p1, 'max-height', '38px');
    YAHOO.util.Dom.setStyle(p1, 'overflow', 'hidden');
    YAHOO.util.Dom.setStyle(p1, 'text-overflow', 'ellipsis');

    var p2 = d.createElement('div');

    var link1 = d.createElement("a");
    link1.href = results[i].final_url;
    link1.title = results[i].title;
    link1.appendChild(d.createTextNode("Link"));

    var link2 = d.createElement("a");
    link2.href = results[i].preview_url;
    link2.title = results[i].title;
    link2.appendChild(d.createTextNode("Preview"));

    p2.appendChild(link1);
    p2.appendChild(d.createTextNode(" | "));
    p2.appendChild(link2);
    p2.appendChild(d.createTextNode(" | "));

    var source = d.createElement('i');
    p2.appendChild(source);
    source.appendChild(d.createTextNode("Source: "));

    p2.appendChild(d.createTextNode(results[i].site_name));

    YAHOO.util.Dom.setStyle(p2, "overflow", "hidden");
    YAHOO.util.Dom.setStyle(p2, "white-space", "nowrap");
    YAHOO.util.Dom.setStyle(p2, "text-overflow", "ellipsis");

    
    div.appendChild(p2);

    var container_div = d.createElement("div");
    container_div.appendChild(div);
    out += container_div.innerHTML;
  }
  out += '<div class="clear"></div>';
  
  items = [[]];
  items[0]['a'] = out;
  items[0]['h'] = "Data & Statistics from Zanran (" + DDG.get_query() + ")";
  items[0]['s'] = 'Zanran';
  items[0]['u'] = zanran_results.more;
  items[0]['f'] = 1;
  items[0]['force_big_header'] = 1;
  // items[0]['i'] = 'http://zanran.com/favicon.ico';

  nra(items,1,1);
};
