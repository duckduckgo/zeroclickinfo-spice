function ddg_spice_quixey(query){
    if (query != null && query.rc == 0) {
        items = [[]];
        items[0]['a'] = nrqx_generate_ui(query);
        items[0]['h'] = '';
        items[0]['s'] = 'Quixey';
        items[0]['u'] = 'http://www.quixey.com/search?q=' + query.q;
        nra(items,1,1);
    }
}

function nrqx_generate_ui(query) {
    var appDiv = d.createElement('div');
    for (app in query.results) {
        appObj = query.results[app];

        var div = d.createElement("div");
        var div2 = d.createElement("div");

        var link = d.createElement("a");
        link.href = query.results[app].dir_url;
        if(appObj.name.length >= 10){
            appObj.name = appObj.name.substring(0,8) + "...";
        }

        var img = nur('','',appObj.icon_url,32,32);
        YAHOO.util.Dom.setStyle(img, "margin", '0 auto 0 auto');
        YAHOO.util.Dom.setStyle(div,'margin-bottom', '10px');
        YAHOO.util.Dom.setStyle(div,'text-align', 'center');
        link.appendChild(img);
        div.appendChild(link);

        link = d.createElement('a');
        link.href = appObj.dir_url;
        link.innerHTML = appObj.name;
        div.appendChild(link);
        div.appendChild(d.createElement('br'));

        YAHOO.util.Dom.addClass(div, 'inline highlight_zero_click1 highlight_zero_click_wrapper');
        YAHOO.util.Dom.setStyle(div, "float", "left");
        YAHOO.util.Dom.setStyle(div, "margin", "10px 20px 10px 0px");
        YAHOO.util.Dom.setStyle(div, "padding", "5px");
        YAHOO.util.Dom.setStyle(div, "max-width", "80px");

        div2.appendChild(div);
        appDiv.appendChild(div2);
    }
    return appDiv;
}
