function ddg_spice_earthquakes(response) {
        if (!response || !response.earthquakes) return;
	
	var header = "";
	var year;
	var month;
        var NUMBER_OF_QUAKES_TO_DISPLAY = 3;
	var country; //the country we are trying to identify
        var quakesWeWant = []; //the INDICES of the 3 most recent quakes we want
	var query = DDG.get_query().split(" ");
	//try to determine the country, month, and year of the query
        for (i=0; i<query.length -1; i++) {
		if (query[i].match(/in|near/i)) {
                        if (query[i+1].match(/january|february|march|april|may|june|july|august|september|october|november|december/i)) {
				month = query[i+1];
				if (query[i+2] && query[i+2].match(/\d{4}/)) year = query[i+2];
			} else if (query[i+1].match(/\d{4}/)) {
				year = query[i+1];
			} else {
                                if (query[i+1] === "the") {
					if (i+2 < query.length) {
						country = query[i+2].charAt(0).toUpperCase() + query[i+2].slice(1);
						if (query[i+3] && query[i+3] !== "in") country += " " + query[i+3].charAt(0).toUpperCase() + query[i+3].slice(1);
					} else {
						return;
					}
				} else {
					country = query[i+1].charAt(0).toUpperCase() + query[i+1].slice(1);
					if (query[i+2] && query[i+2] !== "in") country += " " + query[i+2].charAt(0).toUpperCase() + query[i+2].slice(1);
				}
                        }
                }
        }
	if (month && !year) year = new Date().getFullYear();
        //find the earthquakes we want
	for (i=0; i<response.earthquakes.length; i++) {
		if (country) {
			var rgx = new RegExp(country, "i");
                       	if (response.earthquakes[i].region.match(rgx)) quakesWeWant.push(i);
                } else {
			quakesWeWant.push(i);
		}
	}
        var result = [];
	var ticker = NUMBER_OF_QUAKES_TO_DISPLAY;
        n=0;
	//add earthquakes, taking into account duplicates. this while loop is ugly.
	while (n < ticker && n < quakesWeWant.length) {
		if (n>0 && response.earthquakes[quakesWeWant[n]].timedate === response.earthquakes[quakesWeWant[n-1]].timedate) {
			ticker++;
			n++;
		}
		result.push(response.earthquakes[quakesWeWant[n]]);
		n++;
	}
	//make our region data look nice (capitalise first letter, add "near" or "the" if necessary.
	for (i=0;i < result.length; i++) {
		if(result[i]) {
			if (result[i].region.match(/region|^State/)) result[i].region = "the " + result[i].region;
			regi = result[i].region.split(" ");
			if (!regi[0].match(/in$|off$|near$|offshore$|south$|north$|east$|west$/)) result[i].region = "near " + result[i].region;
			var ro = result[i].region;
			result[i].region = ro.charAt(0).toUpperCase() + ro.slice(1);
		}
	}
	//make sure the first letter of the month query is capitalised
	if (month) {
		var month2 = month;
		month = month2.charAt(0).toUpperCase() + month2.slice(1);
	}
	//make our header
	if (country) {
		if (month) header = country + ", " + month + " " + year;
		if (!month && year) header = country + ", " + year;
		if (!month && !year) header = country;
	} else {
		if (month) header = month + " " + year;
		if (!month && year) header = year;
		if (!month && !year) header = "Most Recent";
	}
	header += " (Earthquakes)";
	var object = { earthquakes : result };
        Spice.render({
                data             : object,
                header1          : header,
                source_url       : "http://www.seismi.org",
                source_name      : 'SEISMI',
                template_normal  : 'earthquakes',
                force_big_header : true
        });
}

