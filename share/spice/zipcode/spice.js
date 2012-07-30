function ddg_spice_zipcode(result) {
    var snippet = '';

    if (result['places']['place']) {
    	var places = result['places']['place'];
        var place = places[0];
       
//      build up a place name from whatever components are available in the result
        var loc_string = "";
        var location_types = ['locality2', 'locality1', 'admin2', 'admin1'];
        for (i in location_types) {
        	if (place[location_types[i]]) loc_string += place[location_types[i]] + ', ';
        }
        if (place['country']) loc_string += place['country'];
       
        snippet = format_snippet(place, places);    	   
        items = new Array();
        items[0] = new Array();
        items[0]['a'] = snippet;
        items[0]['h'] = place['name'] + ' is a ' + place['postal attrs']['type'] + ' in ' + loc_string;
        items[0]['s'] = 'Yahoo GeoPlanet Web Service';
        items[0]['u'] = 'http://where.yahooapis.com/v1/place/' + place['woeid'] + '?appid={{ENV{DDG_SPICE_ZIPCODE_APIKEY}}}';
        console.log(items);
        nra(items);
    }
}


function format_snippet(place, places){	
//	construct the bounding box for the postal code
	var coords = place['boundingBox'];
	var box = [[coords['southWest']['latitude'], coords['southWest']['longitude']],
	           [coords['northEast']['latitude'], coords['southWest']['longitude']], 
	           [coords['northEast']['latitude'], coords['northEast']['longitude']], 
	           [coords['southWest']['latitude'], coords['northEast']['longitude']], 
	           [coords['southWest']['latitude'], coords['southWest']['longitude']]];
	for(i = 0; i < box.length; i++){box[i] = box[i].join()};
	var coord_string = box.join(','); // change to '|' separator for Google Maps
	var center = [place['centroid']['latitude'], place['centroid']['longitude']].join()

//  bigbox sets a slightly larger frame for MapQuest's 'bestfit' parameter; not needed for Google
	var boxpad = (coords['northEast']['latitude'] - coords['southWest']['latitude']) * .25
	var bigbox = [[coords['northEast']['latitude']+boxpad, coords['southWest']['longitude']],  
		          [coords['southWest']['latitude']-boxpad, coords['northEast']['longitude']]].join();


	var snippet, div;	
	snippet = d.createElement('span');
    div = d.createElement('div');
    div.innerHTML = 'Approximate area:';
//  comment out mapquest call, uncomment google, and change separator in coord_string above to '|' to use google's static map 
//  div.innerHTML += '<br><img src="http://maps.googleapis.com/maps/api/staticmap?size=400x150&sensor=false&path=fillcolor:0xAA000033|color:0xff0000ff|weight:0|' + coord_string + '"></img>';
    div.innerHTML += '<br><img src="http://open.mapquestapi.com/staticmap/v4/getmap?size=400,150&scalebar=false&bestfit=' + bigbox + '&polygon=fill:0x30ff0000|color:0x20ff0000|width:1|' + coord_string + '"></img>';

//  construct a list of other possible hits if available; generates new DDG inputs with country codes in parentheses to force the right code to the top of the results
    if (places.length > 1) {
        div.innerHTML += 'Similar postal codes: ';
    	for (i=1;i<places.length;i++){
    		if (places[i]['name'] == place['name']){
    			div.innerHTML += '<a href = "/?q=postcode+' + encodeURI(places[i]['name']) + '%20(' + places[i]['country attrs']['code']+ ')">' + places[i]['name'] + "</a> (" + places[i]['country'] + ')  ';	
    		}	
    	}
    }

    snippet.appendChild(div);

    return snippet;
}