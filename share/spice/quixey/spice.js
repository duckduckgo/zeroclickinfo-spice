function ddg_spice_quixey(query){
    if (query != null && query.rc == 0) {
        
        var spice_container = d.createElement('div');
        YAHOO.util.Dom.setAttribute(spice_container, "id", "spice_container")
        
        for (app in query.results) {
            var appObj = query.results[app];

            var app_container = d.createElement("div");
            YAHOO.util.Dom.addClass(app_container, 'quixey_app_container');
            
            var img_anchor = d.createElement("a");
            img_anchor.href = query.results[app].dir_url;
            
            var img = d.createElement('img');
            img.src = /*'/iu/?u='+*/appObj.icon_url;
            YAHOO.util.Dom.addClass(img, 'quixey_img');
                        
            var info = d.createElement('div');
            YAHOO.util.Dom.addClass(info, "quixey_app_info");

            var name = d.createElement('a');
            YAHOO.util.Dom.addClass(name, 'quixey_name');
            name.href = appObj.dir_url;
            if (appObj.name.length >= 15){
                var app_name = appObj.name.substring(0,15).replace(" ","") + "...";
            }else{
                var app_name = appObj.name;
            }
            name.innerHTML = app_name;
            info.appendChild(name);
            
            YAHOO.util.Dom.addClass(app_container, 'inline-block highlight_zero_click1 highlight_zero_click_wrapper');

            img_anchor.appendChild(img);
            app_container.appendChild(img_anchor);
            app_container.appendChild(info);
            spice_container.appendChild(app_container);
        }

        var dummy_container = d.createElement("div");
        dummy_container.appendChild(spice_container);

        items = [[]];
        items[0]['a'] = dummy_container.innerHTML;
        items[0]['h'] = 'Quixey Recommended Apps';
        items[0]['s'] = 'Quixey';
        items[0]['u'] = 'http://www.quixey.com/search?q=' + query.q;
        items[0]['f'] = 1;
        items[0]['force_big_header'] = 1;
        nra(items,1,1);
    }
}