var loc_string = "";

function ddg_spice_zipcode(result) {
    var snippet = '';
    if (result['places']['place']) {
    	var places = result['places']['place'];
        var place = places[0];
       
        //build up a place name from whatever components are available in the result
        var location_types = ['locality2', 'locality1', 'admin2', 'admin1'];
        for (i in location_types) {
        	if (place[location_types[i]]) loc_string += place[location_types[i]] + ', ';
        }
        if (place['country']) loc_string += place['country'];
       
        snippet = format_snippet(place, places);	   
        items = new Array();
        items[0] = new Array();
        items[0]['a'] = snippet;
        items[0]['h'] = loc_string;
        items[0]['s'] = 'MapQuest';
        items[0]['u'] = 'http://mapq.st/map?q=' + loc_string;
        items[0]['f'] = 1;
        items[0]['force_big_header'] = 1;
        nra(items, 0, 1);
    }
}

function format_snippet(place, places){	
    //construct the bounding box for the postal code
	var coords = place['boundingBox'];
	var box = [[coords['southWest']['latitude'], coords['southWest']['longitude']],
	           [coords['northEast']['latitude'], coords['southWest']['longitude']], 
	           [coords['northEast']['latitude'], coords['northEast']['longitude']], 
	           [coords['southWest']['latitude'], coords['northEast']['longitude']], 
	           [coords['southWest']['latitude'], coords['southWest']['longitude']]];
	for(i = 0; i < box.length; i++){box[i] = box[i].join()};
	var coord_string = box.join(','); // change to '|' separator for Google Maps
	var center = [place['centroid']['latitude'], place['centroid']['longitude']].join()

    //bigbox sets a slightly larger frame for MapQuest's 'bestfit' parameter; not needed for Google
	var boxpad = (coords['northEast']['latitude'] - coords['southWest']['latitude']) * .25
	var bigbox = [[coords['northEast']['latitude']+boxpad, coords['southWest']['longitude']],  
		          [coords['southWest']['latitude']-boxpad, coords['northEast']['longitude']]].join();


	var div = d.createElement('div');
    YAHOO.util.Dom.setStyle(div, "margin-bottom", "5px");
    div.innerHTML = '<span>' + place['postal attrs']['type'] + " " + place['name'] + ' approximate area:</span>';
    div.innerHTML += '<br>';
    var img = d.createElement("img");
    img.id = "map";
    img.src = '/imq2/?size=623,150&scalebar=false&bestfit=' + bigbox + '&polygon=fill:0x30ff0000|color:0x20ff0000|width:1|' + coord_string;
    var img_link = d.createElement("a");
    img_link.href = 'http://mapq.st/map?q=' + loc_string;
    img_link.appendChild(img);
    div.appendChild(img_link);

    //construct a list of other possible hits if available; generates new DDG inputs with country codes in parentheses to force the right code to the top of the results
    if (places.length > 1) {
    	var similar = '';
        for (i=1;i<places.length;i++){
    		if (places[i]['name'] == place['name']){
            	similar += '<a href = "http://www.duckduckgo.com/?q=postcode+' + encodeURI(places[i]['name']) + '%20(' + places[i]['country attrs']['code']+ ')">' + places[i]['name'] + "</a> (" + places[i]['country'] + ')  ';	
    		}
    	}
        if (similar != ''){
            div.innerHTML += 'Similar postal codes: ';
            div.innerHTML += similar;
        }
    }

    return div;
}