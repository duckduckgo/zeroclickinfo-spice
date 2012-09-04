function ddg_spice_gravatar (res)
{
    var out = '';
    var photos = '';
    var item = res["entry"][0];
    var name = item["name"]["formatted"] ? 
                item["name"]["formatted"] + ' (' +item["preferredUsername"] + ')' : 
                item["preferredUsername"];

    if (item){ 
        out += '<a href="mailto:'+ item["emails"][0]["value"] + '">'
            +       item["emails"][0]["value"]
            +  '</a><br />';

        out += add_photos(item);

        items = item["photos"].length > 1 ? [[], []] : [[]];
        items[0]['a'] = out;
        items[0]['h'] = name;
        items[0]['force_big_header'] = 1;
        items[0]['i'] = 'http://gravatar.com/avatar/'+ item["hash"] + '.jpg';
        items[0]['s'] = 'Gravatar';
        items[0]['u'] = item["profileUrl"];

        //hidden div for photos
        /*if (item["photos"].length > 1){
            photos += add_photos(item);
            items[1]['a'] = photos;
            items[1]['t'] = 'Show photos';
			items[1]['force_big_header'] = true;
            items[1]['s'] = 'Gravatar';
            items[1]['u'] = item["profileUrl"];
        }*/

        nra(items, 1, 1);
    }
}

function add_photos(items)
{
    var out = d.createElement('div');
    var tmp, div, div2, img, item, res;
    var i;

	for (i=1; i <= items["photos"].length; i++) {
        item = items["photos"][i];
        if (i >= 5)
            break;

        div = d.createElement("div");
        div2 = d.createElement("div");

        img = d.createElement('img');
        img.src = '/iu/?u=' + item["value"] + '?s=64.jpg';
        YAHOO.util.Dom.setStyle(img, "margin", '0 auto 0 auto');
        YAHOO.util.Dom.setStyle(img, "max-height", '64px');
        YAHOO.util.Dom.setStyle(div,'margin-bottom', '10px');
        YAHOO.util.Dom.setStyle(div,'text-align', 'center');
        //link.appendChild(img);
        div.appendChild(img);
      
        YAHOO.util.Dom.addClass(div, 'inline highlight_zero_click1 highlight_zero_click_wrapper');
        YAHOO.util.Dom.setStyle(div, "float", "left");
        YAHOO.util.Dom.setStyle(div, "margin", "10px 10px 10px 0px");
        YAHOO.util.Dom.setStyle(div, "padding", "5px");
        YAHOO.util.Dom.setStyle(div, "max-width", "80px");
        
        YAHOO.util.Dom.setStyle(out, "width", '100%');
        div2.appendChild(div);
        out.appendChild(div);
    }

    return out.innerHTML;
}
