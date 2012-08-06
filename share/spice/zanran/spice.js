/*
  nr is the prefix for this function space.
*/
function ddg_spice_zanran(zanran_results) {
  var outer_html = function(element){
    var container_div = d.createElement("div");
    container_div.appendChild(element);
    return container_div.innerHTML;
  };
  
  var create_link = function(result){
    var link = d.createElement("a");
    link.href = result.preview_url;
    link.title = result.title;
    return link;
  };
  
  var shorten_title = function(title, max_len){
    if(title.length > max_len) {
      var words = title.split(/\s+/);
      title = "";
      while(words.length && title.length + 1 + words[0].length < max_len) {
        title = title + " " + words.shift();
      }
      title += "\u2026";
    }
    return title;
  }
  
  var create_dom_for_primary_result = function(result){
    var img_link = create_link(result);
    var img = d.createElement('img');
    img.src = result.preview_image;
    img_link.appendChild(img);
    YAHOO.util.Dom.setStyle(img, 'max-width', '71px');
    YAHOO.util.Dom.setStyle(img, 'max-height', '100px'); // A4 ratio
    YAHOO.util.Dom.setStyle(img, 'border', '1px solid black');
    YAHOO.util.Dom.setStyle(img_link, 'float', 'right');
    YAHOO.util.Dom.setStyle(img_link, 'margin-left', '10px');

    var p1 = d.createElement("div");
    var source = d.createElement('i');
    p1.appendChild(source);
    source.appendChild(d.createTextNode("Source: "));
    p1.appendChild(d.createTextNode(result.site_name));
    
    var p2 = d.createElement("div");
    p2.appendChild(d.createTextNode(result.title));

    var link2 = create_link(result);
    link2.appendChild(d.createTextNode("Link"));
    
    var div = d.createElement("div");
    div.appendChild(img_link);
    div.appendChild(p1);
    div.appendChild(p2);
    div.appendChild(link2);

    return div;
  };
  
  var create_dom_for_secondary_result = function(result){
    var source = d.createElement('i');
    source.appendChild(d.createTextNode("Source: "));
    source.appendChild(d.createTextNode(result.site_name));
    
    var title = shorten_title(result.title, 140);

    var link = create_link(result);
    link.appendChild(d.createTextNode("Link"));
  
    var div = d.createElement("li");
    div.appendChild(d.createTextNode(title));
    div.appendChild(link);
    div.appendChild(d.createTextNode(" | "));
    div.appendChild(source);
    
    return div;
  };

  if(YAHOO.env.ua.ie && YAHOO.env.ua.ie < 7) {
    return;
  }
  if(!zanran_results || !zanran_results.results || !zanran_results.results.length) {
    return;
  }

  var results = zanran_results.results;

  var div = create_dom_for_primary_result(results[0]);

  if(results.length > 1) {
    var hr = d.createElement("hr");
    var more = d.createElement("a");
    more.id = "zanran_show_extra_results";
    more.appendChild(d.createTextNode("More results..."));
    
    var list = d.createElement("ul");
    
    div.appendChild(hr);
    div.appendChild(more);

    var extra_results = d.createElement("div");
    extra_results.id = "zanran_extra_results_list";
    div.appendChild(extra_results);
    
    extra_results.appendChild(list);
    var show_extra_results = false;
    YAHOO.util.Dom.setStyle(extra_results, 'display', 'none');

    YAHOO.util.Event.addListener("zanran_show_extra_results", "click", function(){
      show_extra_results = !show_extra_results;
      if(show_extra_results){
        YAHOO.util.Dom.setStyle(document.getElementById("zanran_extra_results_list"), 'display', 'block');
      } else {
        YAHOO.util.Dom.setStyle(document.getElementById("zanran_extra_results_list"), 'display', 'none');
      }
    });

    for(var i=1; i<results.length && i<5; i++) {
      var div2 = create_dom_for_secondary_result(results[i]);
      list.appendChild(div2);
    }
  }

  var out = outer_html(div);
  out += '<div class="clear"></div>';
  
  items = [{
    a: out,
    h: "Data & Statistics from Zanran (" + DDG.get_query() + ")",
    s: 'Zanran',
    u: zanran_results.more,
    f: 1,
    force_big_header: 1    
  }];
  nra(items,1,1);
}
