function ddg_spice_vimeo_search(res)
{
    var out = '';
    var tmp, div, div2, link, img, item;
    var query = DDG.get_query().replace(/vimeo\s*/, "");
    var vimeo_url = 'http://vimeo.com/';

    if (res["videos"]){
        for (i in res["videos"]["video"]){
            item = res["videos"]["video"][i];

	        div = d.createElement("div");
	        div2 = d.createElement("div");

	        link = d.createElement("a");
	        link.href = vimeo_url + item["id"];

	        img = d.createElement('img');
		    img.src = "/iu/?u=" + item["thumbnails"]["thumbnail"][0]["_content"];
	        YAHOO.util.Dom.setStyle(img, "margin", '0 auto 0 auto');
	        YAHOO.util.Dom.setStyle(div,'margin-bottom', '10px');
	        YAHOO.util.Dom.setStyle(div,'text-align', 'center');
	        link.appendChild(img);
	        div.appendChild(link);

	        link = d.createElement('a');
	        link.href = vimeo_url + item["id"];
	        link.innerHTML = item["title"];
	        div.appendChild(link);
	        div.appendChild(d.createElement('br'));

	        YAHOO.util.Dom.addClass(div, 'inline highlight_zero_click1 highlight_zero_click_wrapper');
	        YAHOO.util.Dom.setStyle(div, "float", "left");
	        YAHOO.util.Dom.setStyle(div, "margin", "10px 20px 10px 0px");
	        YAHOO.util.Dom.setStyle(div, "padding", "5px");
	        YAHOO.util.Dom.setStyle(div, "max-width", "80px");
	        
	        div2.appendChild(div);
	        out += div2.innerHTML;
        }

        items = [[]];
        items[0]['a'] = out;
        items[0]['s'] = 'Vimeo';
        items[0]['u'] = vimeo_url + 'search?q=' + query;
        nra(items);
    }
}
