function ddg_spice_vimeo_video(res)
{
    var out = '';
    var div, divtitle, divres, img, img2, whole, divdesc, divby;
    var vimeo_url = 'http://vimeo.com/';
    
    
    whole = d.createElement("div");
    div = d.createElement("div");
    divby = d.createElement("div");
    divtitle = d.createElement("div");
    divdesc = d.createElement("div");
    divres = d.createElement("div");
    img = d.createElement("img");
    img2 = d.createElement("img");

    //div for thumbnail
	YAHOO.util.Dom.setStyle(div, "max-width", "150px");
	YAHOO.util.Dom.setStyle(div, "max-height", "100px");
	YAHOO.util.Dom.setStyle(div, "margin-right", "10px");
	YAHOO.util.Dom.setStyle(div, "clear", "left");
	YAHOO.util.Dom.setStyle(div, "float", "left");
	YAHOO.util.Dom.setStyle(div, "overflow", "hidden");

    //add thumbnail and play button	
    img.src = '/iu/?u='+ res['thumbnail_url'];
	YAHOO.util.Dom.setStyle(img, "max-width", "150px");
	YAHOO.util.Dom.setStyle(img, "max-height", "100px");

    img2.src = "http://duckduckgo.com/assets/icon_play.v101.png";
    YAHOO.util.Dom.setStyle(img2, "visibility", "visible");
    YAHOO.util.Dom.setStyle(img2, "z-index", "100");
    YAHOO.util.Dom.setStyle(img2, "margin", "-68px auto 29px");

    div.appendChild(img);
    div.appendChild(img2);
	YAHOO.util.Dom.addClass(div, 'thumbnail');
    

    divtitle.innerHTML = res["title"];
    divdesc.innerHTML = '<i>' + res["description"] + '</i>';
    divby.innerHTML = '<i>Author:</i> <a href="' + res["author_url"] +'">' + res["author_name"] + '</a>';


    whole.appendChild(div);
    whole.appendChild(divtitle);
    whole.appendChild(divdesc);
    whole.appendChild(divby);

    divres.appendChild(whole);

    out = divres.innerHTML;

    items = [[]];
    items[0]['a'] = out;
    items[0]['s'] = 'Vimeo';
    items[0]['u'] = vimeo_url + res["vimeo_id"];
    
    nra(items, 1, 1);
}
