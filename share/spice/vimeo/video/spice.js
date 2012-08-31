function ddg_spice_vimeo_video(res)
{
    var out = '';
    var divthumb, divtitle, divres, img, img2, whole, divby, embed, iframe;
    var vimeo_url = 'http://vimeo.com/';
    
    
    whole = d.createElement("div");
    divthumb = d.createElement("div");
    divby = d.createElement("div");
    divtitle = d.createElement("div");
    divres = d.createElement("div");
    img = d.createElement("img");
    img2 = d.createElement("img");
    embed = d.createElement("div");
    iframe = d.createElement("iframe")

    iframe.src = 'http://player.vimeo.com/video/'+ res["video_id"];
    YAHOO.util.Dom.setAttribute(iframe, 'allowFullScreen', true);
    YAHOO.util.Dom.setAttribute(iframe, 'webkitAllowFullScreen', true);
    YAHOO.util.Dom.setAttribute(iframe, 'mozallowfullscreen', true);
    iframe.frameborder = 0

    embed.id = 'embed';
    embed.appendChild(iframe); 

    //div for thumbnail
    divthumb.id = "divthumb";

    //add thumbnail and play button	
    img.id = 'thumbnail';
    img.src = '/iu/?u='+ res['thumbnail_url'];
    img2.src = "http://duckduckgo.com/assets/icon_play.v101.png";
    img2.id = 'play_btn';

    divthumb.appendChild(img);
    divthumb.appendChild(img2);
	YAHOO.util.Dom.addClass(divthumb, 'inline');

    divtitle.innerHTML = res["title"];
    divby.innerHTML = '<i>Author:</i> <a href="' + res["author_url"] +'">' + res["author_name"] + '</a>';

    whole.appendChild(divthumb);
    whole.appendChild(divtitle);
    whole.appendChild(divby);
    whole.appendChild(embed);

    divres.appendChild(whole);

    YAHOO.util.Event.addListener('divthumb', "click", function (e) {
        YAHOO.util.Dom.setStyle('divthumb', "display", "none");
	    YAHOO.util.Dom.setStyle('embed', "display", "block");
    });

    out = divres.innerHTML;
    items = [[]];
    items[0]['a'] = out;
    items[0]['s'] = 'Vimeo';
    items[0]['u'] = vimeo_url + res["video_id"];
    
    nra(items, 1, 1);
}
