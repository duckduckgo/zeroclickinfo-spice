d = document;
function nrat(alts) 
{
  // console.log(alts);
  var out, tmp;
  out = "";
  
  // validity check
  if (alts['Items']) {

    for (i in alts['Items']) {
      var item = alts['Items'][i];
      
      wrapper = d.createElement("div");
      box = d.createElement("div");

      link = d.createElement("a");
      link.href = item['Url'];
      link.innerHTML = item['Name'];

      img = d.createElement("img");
      img.src = item['IconUrl'];
      
      box.appendChild(img);
      box.appendChild(d.createElement("br"));
      box.appendChild(link);
      
      YAHOO.util.Dom.setStyle(box, "text-align", "center");

      YAHOO.util.Dom.setStyle(box, "float", "left");
      YAHOO.util.Dom.setStyle(box, "margin", "10px");
      YAHOO.util.Dom.setStyle(box, "width", "60px");

      wrapper.appendChild(box);

      out += wrapper.innerHTML;

    }
    
    items = new Array();
    items[0] = new Array();
    items[0]['a'] = out;
    items[0]['h'] = '';
    items[0]['s'] = 'AlternativeTo';
    items[0]['u'] = alts['Url'];
    nra(items);
  }
}

