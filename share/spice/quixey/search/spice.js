
// search_id = '';
// session_id = '';

// function ddg_spice_quixey_info(data){
//     quixey_data = data.app;
// }

function ddg_spice_quixey_search(data){
    if (data != null && data.rc == 0) {
               
        items = [[]];
        items[0]['a'] = buildResults(data);
        items[0]['h'] = 'Quixey Recommended Apps';
        items[0]['s'] = 'Quixey';
        items[0]['u'] = 'http://www.quixey.com/search?q=' + data.q;
        items[0]['f'] = 1;
        items[0]['force_big_header'] = 1;
        nra(items,1,1);
    }
}

function buildResults(data){

    nrj("http://yui.yahooapis.com/2.9.0/build/event-mouseenter/event-mouseenter-min.js");

    var spice_container = d.createElement('div');
    var dummy_container = d.createElement("div");
    var app_ids = [];
    var quixey_data = {};

    search_id = data.search_id;
    session_id = data.session_id;

    YAHOO.util.Dom.setAttribute(spice_container, "id", "spice_container")

    for (app in data.results) {

        // Create Objects and Elements
        var appObj = data.results[app];
        var app_id = data.results[app].id;
        var app_id_string = app_id.toString();
        app_ids.push(app_id_string);
        quixey_data[app_id_string] = appObj;
        
        var app_container = d.createElement("div");
        var img_anchor = d.createElement("a");
        var img = d.createElement('img');
            img_anchor.href = data.results[app].dir_url;
            img.src = /*'/iu/?u='+*/appObj.icon_url;
        var info = d.createElement('div');
        var more_info = d.createElement('div');
            more_info.innerHTML = getMoreInfo(appObj);
        var name = d.createElement('a');
            name.href = appObj.dir_url;
            name.innerHTML = shorten(appObj.name, 10).replace(' ','');
        var platforms = d.createElement("div");
            platforms = getPlatforms(appObj.platforms);

        info.appendChild(name);
        info.appendChild(platforms);
        img_anchor.appendChild(img);
        app_container.appendChild(img_anchor);
        app_container.appendChild(info);
        app_container.appendChild(more_info);
        spice_container.appendChild(app_container);

        // Set Styles
        YAHOO.util.Dom.setAttribute(app_container, "id", app_id_string)
        YAHOO.util.Dom.setAttribute(more_info, "id", "more_info_" + app_id_string)
        YAHOO.util.Dom.addClass(app_container, 'quixey_app_container collapse');
        YAHOO.util.Dom.addClass(img, 'quixey_img');
        YAHOO.util.Dom.addClass(info, "quixey_app_info");
        YAHOO.util.Dom.addClass(more_info, "quixey_app_more_info hidden");
        YAHOO.util.Dom.addClass(name, 'quixey_name');
        YAHOO.util.Dom.addClass(platforms, 'quixey_app_platforms');
        YAHOO.util.Dom.addClass(app_container, 'highlight_zero_click_wrapper');

        // Click Event Listener - Used to show/hide more info
        YAHOO.util.Event.addListener(app_id_string, "click", function(e){

            var children = YAHOO.util.Dom.getChildren("spice_container");
            var temp = YAHOO.util.Dom.getElementsByClassName('quixey_name', 'a', this.id)
            var current_name = temp[0] //getElementsByClassName returns array, need to get first (and only) element

            // If hidden: 
            if (YAHOO.util.Dom.hasClass('more_info_' + this.id, "hidden")){
                YAHOO.util.Dom.removeClass('more_info_' + this.id, 'hidden');
                YAHOO.util.Dom.addClass(this.id, 'expand');
                YAHOO.util.Dom.addClass(current_name, 'expand');
                YAHOO.util.Dom.removeClass(this.id, 'collapse');

                for (var child in children){
                    if (children[child].id === this.id) continue;
                    YAHOO.util.Dom.addClass(children[child], 'hidden');
                }
                
                current_name.innerHTML = quixey_data[this.id].name;

            }else{ // not hidden
                YAHOO.util.Dom.addClass('more_info_' + this.id, 'hidden');
                YAHOO.util.Dom.addClass(this.id, 'collapse');
                YAHOO.util.Dom.removeClass(this.id, 'expand');
                YAHOO.util.Dom.removeClass(current_name, 'expand');

                for (var child in children){
                    if (children[child].id === this.id) continue;
                    YAHOO.util.Dom.removeClass(children[child], 'hidden');
                }

                current_name.innerHTML = shorten(quixey_data[this.id].name, 10).replace(' ','');
            }
        });
    }

    dummy_container.appendChild(spice_container);

    return dummy_container.innerHTML;
}

function getMoreInfo(appObj){
    var more_info = d.createElement('div');

    var editions = getEditions(appObj.editions);
    console.log(editions);
    
    if (appObj.short_desc){
        more_info.innerHTML = "<br>Description: " + appObj.short_desc;
    }else{
        more_info.innerHTML = "<br>No description";
    }

    return more_info.innerHTML;
}

function getEditions(editions){
    var edition = d.createElement("div");
    YAHOO.util.Dom.addClass(edition, "quixey_app_edition");

    for (var i in editions){
        var current = editions[i];
        var platforms = d.createElement("div");
        platforms = (getPlatforms(current.platforms, true, true));

        for (i in platforms){

        }

        edition.appendChild(platforms);
    }

    return edition;
}

function getPlatforms (platforms, getAll, getNames){
    var getAll   = getAll || false;
    var getNames = getNames || false;
    var platform = d.createElement("div");

    if (!getAll) var allowed_platforms = [2004, 2005, 2008, 2015];

    var apple = 0;

    if (getNames){
        for (var i in platforms){
            var current = platforms[i];
            var img  = d.createElement("img");
            var name = d.createElement("span");
  
            // Get proper apple icon
            if (current.id === 2004 || current.id === 2015) {
                img.src = "https://icons.duckduckgo.com/i/itunes.apple.com.ico";
            
            }else {
                img.src = current.icon_url;
            }

            name.innerHTML = current.name + " $";          

            YAHOO.util.Dom.addClass(img, 'quixey_platform_img');
            YAHOO.util.Dom.addClass(name, 'quixey_platform_name');
            platform.appendChild(img);
            platform.appendChild(name);
        }
    }else{ 
        //grab icons instead of names (used for initial display)
        for (var i in platforms){
            var current = platforms[i];
            if (allowed_platforms.indexOf(current.id) != -1) {
                var img = d.createElement("img");

                // Get proper apple icon
                if (current.id === 2004 || current.id === 2015) {
                    img.src = "https://icons.duckduckgo.com/i/itunes.apple.com.ico";
                    apple++;
                }else{
                    img.src = current.icon_url;
                }
                
                if (apple === 2) continue; 

                YAHOO.util.Dom.addClass(img, 'quixey_platform_img');
                platform.appendChild(img)
            }
        }
    }
    return platform;
}

function shorten (string, length) {
  if (length === undefined) length = 40;
  
  if (string.length > length){
    return string.slice(0,length-3) + '...';
  } else {
    return string;
  }
}

// function getPlatforms (platforms){
//     var platform = d.createElement("div");

//     var allowed_platforms = [2004, 2005, 2008, 2015];
//     var apple = 0;

//     for (var i in platforms){
//         if (allowed_platforms.indexOf(platforms[i].id) != -1) {
//             var img = d.createElement("img");

//             if (platforms[i].id === 2004 || platforms[i].id === 2015) {
//                 img.src = "https://icons.duckduckgo.com/i/itunes.apple.com.ico";
//                 apple++;
//             }else{
//                 img.src = platforms[i].icon_url;
//             }
            
//             if (apple === 2) continue; 

//             YAHOO.util.Dom.addClass(img, 'quixey_platform_img');
//             platform.appendChild(img)
//         }
//     }
//     return platform;
// }