function ddg_spice_zanran(results) {
  var direct_link_label = function(result){
    if (result.preview_url.match(/\/pdf\//)) {
      return "pdf";
    } else if(result.preview_url.match(/\/(xls|publicdata)\//)) {
      return "xls";
    } else if(result.preview_url.match(/\/(img|data)\//)) {
      return "image";
    } else if(result.preview_url.match(/\/html\//)) {
      return "table";
    } else { /* articles (where preview=document), and unknown */
      return null;
    }
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

  if (YAHOO.env.ua.ie && YAHOO.env.ua.ie < 7
       || (!results || !results.results || !results.results.length))
    return;

  console.log(results);
  console.log(results[0]);

//  if(results.length > 1) {
//    var extra_results = d.createElement("div");
//    for(var i=1; i<results.length && i<5; i++) {
//      extra_results.appendChild(create_dom_for_secondary_result(results[i]));
//    }
//    items.push({
//      a: outer_html(extra_results),
//      t: "More results",
//      f: 1,
//      s: 'Zanran',
//      u: zanran_results.more
//    });
//  }

  console.log("wtf");

  Spice.render({
      data             : results[0],
      header1          : 'Data & Statistics from Zanran',
      source_url       : results.more,
      source_name      : 'Zanran',
      template_normal  : 'zanran',
      force_big_header : true
  });
  console.log("wtf2");
}
