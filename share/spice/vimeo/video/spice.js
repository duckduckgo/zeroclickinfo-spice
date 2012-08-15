function ddg_spice_vimeo_video(res)
{
    var out = '';
    var div, divtitle, divres, img, img2, whole, divby, embed;
    var vimeo_url = 'http://vimeo.com/';
    
    
    whole = d.createElement("div");
    div = d.createElement("div");
    divby = d.createElement("div");
    divtitle = d.createElement("div");
    divres = d.createElement("div");
    img = d.createElement("img");
    img2 = d.createElement("img");
    embed = d.createElement("div");

    embed.innerHTML = res["html"];
	YAHOO.util.Dom.setStyle(embed, "display", "none");

    //div for thumbnail
	YAHOO.util.Dom.setStyle(div, "margin-right", "10px");
	YAHOO.util.Dom.setStyle(div, "clear", "left");
	YAHOO.util.Dom.setStyle(div, "float", "left");
	YAHOO.util.Dom.setStyle(div, "display", "block");
	//YAHOO.util.Dom.setStyle(div, "overflow", "hidden");

    //add thumbnail and play button	
    img.src = '/iu/?u='+ res['thumbnail_url'];
	YAHOO.util.Dom.setStyle(img, "max-width", "180px");
	YAHOO.util.Dom.setStyle(img, "max-height", "101px");

    img2.src = "http://duckduckgo.com/assets/icon_play.v101.png";
    YAHOO.util.Dom.setStyle(img2, "visibility", "visible");
    YAHOO.util.Dom.setStyle(img2, "z-index", "100");
    YAHOO.util.Dom.setStyle(img2, "margin", "-68px auto 29px");

    div.appendChild(img);
    div.appendChild(img2);
	YAHOO.util.Dom.addClass(div, 'thumbnail');
	YAHOO.util.Dom.addClass(div, 'inline');

    divtitle.innerHTML = res["title"];
    divby.innerHTML = '<i>Author:</i> <a href="' + res["author_url"] +'">' + res["author_name"] + '</a>';

    whole.appendChild(div);
    whole.appendChild(divtitle);
    whole.appendChild(divby);
    whole.appendChild(embed);

    divres.appendChild(whole);

    out = divres.innerHTML;

    YAHOO.util.Event.addListener(div, "click", function (e) {
        YAHOO.util.Dom.setStyle(div, "display", "none");
	    YAHOO.util.Dom.setStyle(embed, "display", "block");
    });

    items = [[]];
    items[0]['a'] = out;
    items[0]['s'] = 'Vimeo';
    items[0]['u'] = vimeo_url + res["video_id"];
    
    nra(items, 1, 1);
}
