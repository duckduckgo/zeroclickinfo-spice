function ddg_spice_zipcode(result) {
    var snippet = '';

    if (result['places']['place']) {
       var place = result['places']['place'][0];
       var places = result['places']['place'];
       
       var loc_string = "";
       if (place['locality2']) loc_string += place['locality2'] + ', ';
       if (place['locality1']) loc_string += place['locality1'] + ', ';
       if (place['admin2']) loc_string += place['admin2'] + ', ';
       if (place['admin1']) loc_string += place['admin1'] + ', ';
       if (place['country']) loc_string += place['country'];
       
       snippet = format_snippet(place, places);    	   
       items = new Array();
       items[0] = new Array();
       items[0]['a'] = snippet;
       items[0]['h'] = '<b>' + place['postal attrs']['type'] + ' ' + place['name'] + ": </b>" + loc_string;
       items[0]['s'] = 'Yahoo GeoPlanet Web Service';
       items[0]['u'] = 'http://where.yahooapis.com/v1/place/' + place['woeid'] + '?appid={{ENV{DDG_SPICE_ZIPCODE_APIKEY}}}';
       console.log(items);
       nra(items);
    }
}


function format_snippet(place, places){	
	var coords = place['boundingBox'];
	var box = [[coords['southWest']['latitude'], coords['southWest']['longitude']],
	           [coords['northEast']['latitude'], coords['southWest']['longitude']], 
	           [coords['northEast']['latitude'], coords['northEast']['longitude']], 
	           [coords['southWest']['latitude'], coords['northEast']['longitude']], 
	           [coords['southWest']['latitude'], coords['southWest']['longitude']]];
	for(i = 0; i < box.length; i++){box[i] = box[i].join()};
	var coord_string = box.join(','); // change to '|' separator for Google Maps
	var center = [place['centroid']['latitude'], place['centroid']['longitude']].join()
	
//  *bigbox sets a slightly larger frame for MapQuest's 'bestfit' parameter; not needed for Google*
	var bigbox = [[coords['northEast']['latitude']+.005, coords['southWest']['longitude']],  
		          [coords['southWest']['latitude']-.005, coords['northEast']['longitude']]].join();
	

	var snippet, div;	
	snippet = d.createElement('span');
    div = d.createElement('div');
    div.innerHTML = 'Approximate area:';
//  div.innerHTML += '<br><img src="http://maps.googleapis.com/maps/api/staticmap?size=400x150&sensor=false&path=fillcolor:0xAA000033|color:0xff0000ff|weight:0|' + coord_string + '"></img>';
    div.innerHTML += '<br><img src="http://open.mapquestapi.com/staticmap/v4/getmap?size=400,150&scalebar=false&bestfit=' + bigbox + '&polygon=fill:0x20ff0000|color:0x20ff0000|width:1|' + coord_string + '"></img>';

    if (places.length > 1) {
        div.innerHTML += 'Similar postal codes: ';
    	for (i=1;i<places.length;i++){
    		div.innerHTML += '<a href = "/?q=postcode+' + encodeURI(places[i]['name']) + '%20(' + places[i]['country attrs']['code']+ ')">' + places[i]['name'] + "</a> (" + places[i]['country'] + ')  ';
    	}
    }

    snippet.appendChild(div);

    return snippet;
}