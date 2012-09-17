function ddg_spice_gravatar (res) {
    console.log(res);
    var out = '';
    var photos = '';
    var ims = '';
    var email;
    var item = res["entry"][0];
    var name = item["name"]["formatted"] ? 
                item["name"]["formatted"] + ' - ' +item["preferredUsername"]: 
                item["preferredUsername"];
    var clear = '<div style="clear:both;"></div>';

    var query = DDG.get_query().replace("gravatar", "")
                               .replace("gravatar of", "")
                               .replace("avatar of", "")
                               .replace(" ", "");
    var snippet, div, link, p;
    if (item){ 
        if (item["emails"]){
            email = item["emails"][0]["value"] ? 
                        item["emails"][0]["value"] : '';
            
            if (email){
                out += '<i>Email:</i> <a href="mailto:'+ email + '">'
                    +       email
                    +  '</a><br />';
            }        
        }
    
        if (item["aboutMe"])
            out += '<i>About: </i>' + shorten(item["aboutMe"], 60, true) + '<br />';

        if (item["ims"])
            out += add_ims(item["ims"])

        var no_profile = false;
        if (!out) {
           var query = DDG.get_query();
           query = query.replace(/\s*(gravatar|avatar)\s+(of)?\s*/, "");
           query = query.replace(/\s*/, "");
           p = d.createElement('p');
           p.innerHTML = 'The gravatar image for <a href="mailto:' + query + '">' + query + '</a> is:<br>';
           snippet = d.createElement('span');
           if (nur) img = nur('','Profile Photo','http://gravatar.com/avatar/'+ item["hash"] + '?s=160');
           if(img) {
               snippet.appendChild(p);
               no_profile = true;
               YAHOO.util.Dom.addClass(img,'profile');
               div = d.createElement('div');
               div.appendChild(img);
               snippet.appendChild(div);
           }
        }
        items = item["photos"].length > 1 ? [[], []] : [[]];
        if(no_profile) {
            items[0]['a'] = snippet;
            items[0]['f'] = 1;
        } else {
            items[0]['a'] = out + clear;
            items[0]['i'] = 'http://gravatar.com/avatar/'+ item["hash"] + '.jpg';
        }
        items[0]['h'] = name + ' (Gravatar)'
        items[0]['force_big_header'] = 1;
        items[0]['s'] = 'Gravatar';
        items[0]['u'] = item["profileUrl"];

        //hidden div for photos
        if (item["photos"].length > 1){
            photos += add_photos(item);
            items[1]['a'] = clear + photos + clear;
            items[1]['t'] = 'Show photos';
			//items[1]['force_big_header'] = true;
            items[1]['s'] = 'Gravatar';
            items[1]['u'] = item["profileUrl"];
        }

        nra(items, 0, 0);
    }
}

function add_ims(ims) {
    var out = '';
    var translate = {
        aim: "AIM",
        msn: "MSN",
        yahoo: "Yahoo!",
        icq: "ICQ",
        xmpp: "XMPP",
        skype: "Skype",
        gtalk: "Gtalk"
    }
    for (i in ims){
        var type = translate[ims[i]["type"]] ? translate[ims[i]["type"]] : ims[i]["type"];
        out += '<i>' + type + ':</i> '
            +  ims[i]["value"]
            +  '<br />';
    }
    return out;
}

function add_photos(items)
{
    var out = d.createElement('div');
    var tmp, div, div2, img, item, res, link;
    var i;

    if (items["photos"].length > 1){
	    for (i=1; i < items["photos"].length; i++) {
            item = items["photos"][i];
            if (i > 6)
                break;

            div = d.createElement("div");
            div.id = "photodiv";
            div2 = d.createElement("div");
	        link = d.createElement("a");
	        link.href = "http://gravatar.com/" + items["preferredUsername"] + "#pic-" + i;

            img = d.createElement('img');
            img.src = '/iu/?u=' + item["value"] + '?s=64.jpg';
            img.id = "photoimg";

            link.appendChild(img);
            div.appendChild(link);
          
            YAHOO.util.Dom.addClass(div, 'inline highlight_zero_click1 highlight_zero_click_wrapper');
            YAHOO.util.Dom.setStyle(div, "float", "left");
            YAHOO.util.Dom.setStyle(div, "margin", "10px 10px 10px 0px");
            YAHOO.util.Dom.setStyle(div, "padding", "5px");
            YAHOO.util.Dom.setStyle(div, "max-width", "80px");
            
            //YAHOO.util.Dom.setStyle(out, "width", '100%');
            div2.appendChild(div);
            out.appendChild(div);
        }
    }

    return out.innerHTML;
}

function shorten (string, length, find) {
    if (length === undefined){
        length = 60;
    }

    if (find && string.length > length){
        var comma = string.indexOf(",");
        var dot = string.indexOf(".");

        if (comma !== undefined)
            return string.slice(0, comma) + '...';
        if (dot !== undefined)
            return string.slice(0, dot) + '...';
    }

    if (string.length > length){
        return string.slice(0,length) + '...';
    } else {
        return string;
    }
}
