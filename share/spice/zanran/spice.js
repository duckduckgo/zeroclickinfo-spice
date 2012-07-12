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
    var div = d.createElement("div");
    var idiv = d.createElement("div");
    var link = d.createElement("a");
    link.href = results[i].preview_url;
    link.title = results[i].title;

    var img = d.createElement('img');
    img.src = results[i].preview_image;
    
    link.appendChild(img);
    idiv.appendChild(link);
    div.appendChild(idiv);
    
    var very_short_title = results[i].short_title;
    
    if(very_short_title.length > 25) {
      /* cut on word boundary algorithm */
      var words = very_short_title.split(/\s+/);
      very_short_title = "";
      while(words.length && very_short_title.length + 1 + words[0].length < 25) {
        very_short_title = very_short_title + " " + words.shift();
      }

      /* cut without any regard to word boundary algorithm */
      // very_short_title = very_short_title.substr(0,24);

      very_short_title += "\u2026";
    }
    
    
    var link2 = d.createElement("a");
    link2.href = results[i].preview_url;
    link2.title = results[i].title;
    link2.appendChild(d.createTextNode(very_short_title));
    
    div.appendChild(link2);
    div.appendChild(d.createElement('br'));
    
    YAHOO.util.Dom.addClass(div, 'inline highlight_zero_click1 highlight_zero_click_wrapper');
    YAHOO.util.Dom.setStyle(div, "float", "left");
    YAHOO.util.Dom.setStyle(div, "max-width", "137px");
    YAHOO.util.Dom.setStyle(div, "vertical-align", "bottom");
    YAHOO.util.Dom.setStyle(div, "text-align", "center");

    // YAHOO.util.Dom.setStyle(link2, "font-size", "80%");

    YAHOO.util.Dom.setStyle(idiv, 'height', '200px');
    YAHOO.util.Dom.setStyle(idiv, "position", "relative");

    YAHOO.util.Dom.setStyle(img, "position", "absolute");
    YAHOO.util.Dom.setStyle(img, "bottom", "0px");
    YAHOO.util.Dom.setStyle(img, "margin", '0 auto 0 auto');
    YAHOO.util.Dom.setStyle(img, 'max-width', '137px');
    YAHOO.util.Dom.setStyle(img, 'max-height', '194px'); // A4 ratio
    
    var container_div = d.createElement("div");
    container_div.appendChild(div);
    out += container_div.innerHTML;
  }
  out += '<div class="clear"></div>';
  
  items = [[]];
  items[0]['a'] = out;
  items[0]['h'] = '<h1>Data & Statistics</h1>';
  items[0]['s'] = 'Zanran';
  items[0]['u'] = zanran_results.more;
  items[0]['f'] = 1;
  // items[0]['i'] = 'http://zanran.com/favicon.ico';

  nra(items,1,1);
};
