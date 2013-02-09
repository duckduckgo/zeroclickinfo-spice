function ddg_spice_freesound(res)
{
    var out = '', whole, div, a, img, item, link, imgdiv;
    var title, author, preview, duration, mp3, ogg;
    var query = DDG.get_query()
    query = query.replace("freesound", "");
    query = query.replace("free sound", "");
    query = query.replace("free sound of", "");
    query = query.replace("sound for free", "");

    var number = res["num_results"];

    var clear = d.createElement('div');
    YAHOO.util.Dom.setStyle(clear, "clear", "both");

    var count = number < 3 ? number : 3;
    for (var i = 0; i < count; i++){
        item = res["sounds"][i]

        whole = d.createElement('div');
        div = d.createElement('div');
        imgdiv = d.createElement('div');
        title = d.createElement('span');
        info = d.createElement('div')

        // info about sound
        // first line
        title.innerHTML = '&nbsp;' + item['original_filename'] + ' by ';
        author = d.createElement('a');
        author.href = item["user"]["url"];
        author.innerHTML = item["user"]["username"];

        info.appendChild(title);
        info.appendChild(author);
        info.appendChild(d.createElement('br'));

        // second line
        ogg = d.createElement('a');
        mp3 = d.createElement('a');
        ogg.href = item["preview-hq-mp3"];
        mp3.href = item["preview-hq-ogg"];
        ogg.innerHTML = 'ogg';
        mp3.innerHTML = 'mp3';
        
        info.innerHTML += '&nbsp;<i>Preview: </i>';
        info.appendChild(mp3);
        info.innerHTML += ' | ';
        info.appendChild(ogg);
        info.appendChild(d.createElement('br'));

        // third line
        var mins, secs;
        mins = Math.floor(item["duration"] / 60);
        secs = Math.floor(item["duration"] % 60);
        info.innerHTML += '&nbsp;<i>Duration: </i>' + mins + ':' + secs;
        info.appendChild(d.createElement('br'));

        // fourth line
        info.innerHTML += '&nbsp;<i>Type: </i>' + item["type"];
        
        // image
        a = d.createElement('a');
        a.href = item["url"];
        img = d.createElement('img');
        img.src = '/iu/?u=' + item["waveform_m"];
        a.appendChild(img);
        imgdiv.appendChild(a);

        // put everything together    
        div.appendChild(imgdiv);
        div.appendChild(info);
        div.appendChild(clear)


        YAHOO.util.Dom.addClass(div, 'highlight_zero_click1 highlight_zero_click_wrapper');

	    YAHOO.util.Dom.setStyle(div, "padding", "5px");
	    YAHOO.util.Dom.setStyle(div, "margin", "5px");
	    YAHOO.util.Dom.setStyle(imgdiv, "max-width", "120px");
	    YAHOO.util.Dom.setStyle(imgdiv, "overflow", "hidden");
	    YAHOO.util.Dom.setStyle(imgdiv, "float", "left");

      
        whole.appendChild(div);
        out += whole.innerHTML ;
    }
    

	items = [[]];
	items[0]['a'] = out;
    items[0]['h'] = query + ' (FreeSound)'
    items[0]['force_big_header'] = 1;
	items[0]['s'] = 'FreeSound';
	items[0]['u'] = 'http://www.freesound.org/search/?q=' + query;
	nra(items,1,1);
}
