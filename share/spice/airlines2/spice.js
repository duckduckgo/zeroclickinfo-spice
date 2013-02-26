var flights = {};

flights.MILLIS_PER_MIN = 60000;
flights.MILLIS_PER_HOUR = flights.MILLIS_PER_MIN * 60;

flights.AP_ORIGIN = 0;
flights.AP_DESTINATION = 1;

flights.STATI = {
	'S': 'Scheduled',
	'A': 'In the air',
	'U': 'Unknown status',
	'R': 'Redirected flight',
	'L': 'Landed',
	'D': 'Diverted',
	'C': 'Cancelled',
	'NO': 'Not Operational',
	'DN': 'Data Needed'
};

function nrft(flightstats) {
//    console.log(flightstats);

    if (flightstats && flightstats.flight) {
	//TODO (caine): multiple flights in this array
	//shows a planes full trajectory / legs.
	var flight;
	if (flightstats.flight instanceof Array) {
	    flight = flightstats.flight[0];
	} else {
	    flight = flightstats.flight;
	}
		var airline = flight.Airline;
		var flightNumber = flight.FlightNumber;
		var depDate = flights.getDate(flight, flights.AP_ORIGIN);
		var schedDepDate = flights.getDateFromString(flight.ScheduledGateDepartureDate);

		var abstractDiv = d.createElement('div');
		YAHOO.util.Dom.addClass(abstractDiv,'nrft-abstract');

//		var snippet = flights.makeStatusLine(airline, flightNumber, depDate, schedDepDate)+'<br><br>';
//		abstractDiv.innerHTML = snippet; //TODO (caine)

		var airportsHolder = d.createElement('div');
		YAHOO.util.Dom.addClass(airportsHolder,'nrft-holder');

		var originAirport = flights.makeAirportDiv(flight, flights.AP_ORIGIN);
		var destinationAirport = flights.makeAirportDiv(flight, flights.AP_DESTINATION);
		YAHOO.util.Dom.addClass(originAirport,'nrft');
		YAHOO.util.Dom.addClass(destinationAirport,'nrft');
		airportsHolder.appendChild(originAirport);
		airportsHolder.appendChild(destinationAirport);

		abstractDiv.appendChild(airportsHolder);

//		snippet += originAirport+'<br><br>';
//		snippet += destinationAirport+'<br><br>';

		var items = new Array();
		items[0] = new Array();

		items[0]['a'] = abstractDiv;
/*
		items[0]['a'] = flight.FlightId[1].CommercialAirline.AirlineName+' flight '+
			flight.FlightId[1].FlightNumber+' departs from '+
			flight.Departure.Airport.AirportName.toLowerCase()+' at '+
			flight.Departure.DateTime[1].Time.content+' and arrives in '+
			flight.Arrival.Airport.AirportName.toLowerCase()+' at '+
			flight.Arrival.DateTime[1].Time.content+'.';
	
		items[0]['i'] = ;
*/
		items[0]['h'] = flights.makeStatusLine(flight, airline, flightNumber, depDate, schedDepDate);
		items[0]['s'] = 'FlightStats';
		items[0]['u'] = flights.makeStatusLink(airline.AirlineCode, flightNumber);
		items[0].force_big_header = true;
		items[0].force_space_after = true;

		if (abstractDiv.innerHTML.indexOf('NaN') == -1 && abstractDiv.innerHTML.indexOf('undefined') == -1) {
			nra(items, 3, 1);
		} else {
		    //			console.log('something was NaN or undefined... bailing');
		}
    }
}


/*
Departure
SJD 4:02pm  Terminal 3
San Jose Cabo  Mar 9

Arrival
SFO  6:20pm Terminal I
San Francisco Mar 9
*/
flights.makeAirportDiv = function(flight, type) {
	var html = '';
	var div = d.createElement('div');

	switch (type) {
	case flights.AP_ORIGIN:
		var airport = flight.Origin;
		var relTime = flights.relativeTime(flights.getDate(flight,type), flight.DepartureAirportTimeZoneOffset);
		var status = relTime.status;
		var time = relTime.time;

		if (status == -1) {
			html += '<b>Departing</b> now...<br>';
		} else if (0 == status) {
			html += '<b>Departs</b> in '+time+'<br>';
		} else {
			html += '<b>Departed</b> '+time+' ago<br>';
		}

		html += flights.airportDeepLink(flights.getAirportName(airport.Name, airport.AirportCode), airport.AirportCode)+'<br>';
		var depDate = flights.getDate(flight, flights.AP_ORIGIN);

		if (flight.DepartureTerminal) {
			html += ' Terminal '+flight.DepartureTerminal+', ';
		}
		if (flight.DepartureGate) {
			html += 'Gate '+flight.DepartureGate;
		}

		if (!flight.DepartureGate && !flight.DepartureTerminal) {
		    html += 'Gate unavailable';
		}


		html += '<br>'+depDate.dumbTime()+' '+(depDate.getMonth()+1)+'/'+(depDate.getDate());

		break;
	case flights.AP_DESTINATION:
		var airport = flight.Destination;
		var relTime = flights.relativeTime(flights.getDate(flight,type), flight.ArrivalAirportTimeZoneOffset);
		var status = relTime.status;
		var time = relTime.time;

		//console.log(status);
		if (status == -1) {
		    	html += '<b>Arriving</b> now...<br>';
		} else if (0 == status) {
			html += '<b>Arrives</b> in '+time+'<br>';
		} else {
			html += '<b>Arrived</b> '+time+' ago<br>';
		}

		html += flights.airportDeepLink(flights.getAirportName(airport.Name, airport.AirportCode), airport.AirportCode)+'<br>';
		var arrDate = flights.getDate(flight, flights.AP_DESTINATION);

		if (flight.ArrivalTerminal) {
			html += ' Terminal '+flight.ArrivalTerminal+', ';
		}
		if (flight.ArrivalGate) {
			html += 'Gate '+flight.ArrivalGate;
		}

		if (!flight.ArrivalGate && !flight.ArrivalTerminal) {
		    html += 'Gate unavailable';
		}

		html += '<br>'+arrDate.dumbTime()+' '+(arrDate.getMonth()+1)+'/'+(arrDate.getDate());

		break;
	default :
		break;
	}

	div.innerHTML = html;
	return div;
}

flights.makeStatusLink = function(airlineCode, flightNumber) {
	return 'http://www.flightstats.com/go/FlightStatus/flightStatusByFlight.do?&airlineCode='+
	    airlineCode+'&flightNumber='+flightNumber;
}


//flights.isDelayed();
flights.relativeTime = function(date, offset) {
    //	console.log(date);
    //	console.log(offset);
	//date = flights.getDateFromString(date);

    var date;
    timezoneOffset = date.getTimezoneOffset();
    //if (0 > timezoneOffset) {
//	console.log('offset negative: '+timezoneOffset);
//        date = date.getTime()+(timezoneOffset*flights.MILLIS_PER_MIN);
//    } else {
//	console.log('offset positive: '+timezoneOffset);
        date = date.getTime()-(timezoneOffset*flights.MILLIS_PER_MIN);
//    }
    var dateNow = new Date();
    var now = dateNow.getTime() + (offset*flights.MILLIS_PER_HOUR);

//	console.log(date);
//	console.log(now);

	var delta = date - now;
    var status = -1;
//	console.log('delta: '+delta);
	if (0 > delta) {
	    status = 1;
	} else {
	    status = 0;
	}

	var ret = new Object();
	ret.time = '';
    ret.status = status;

	var hrs = Math.abs(parseInt(delta/flights.MILLIS_PER_HOUR));
	var mins = Math.abs(parseInt((delta % flights.MILLIS_PER_HOUR)/flights.MILLIS_PER_MIN));
	if (0 < hrs) {
		ret.time += hrs+' hrs ';
	}
	if (0 < mins) {
		ret.time += mins+' mins ';
	}

//	console.log(ret);

	return ret;
}

/*
Flight status for Alaska Airlines 225
On-time 
departs in 3 hours 53 minutes
*/
flights.makeStatusLine = function(flight, airline, flightNumber, depDate, schedDepDate) {
    var statusLine = '';
    var status = '';

    if (depDate && schedDepDate) {
		//depDate.setHours(depDate.getHours()+1);
		var delta = depDate - schedDepDate;
		//console.log(delta);

		if ('S' === flight.StatusCode) {
			if (flights.MILLIS_PER_MIN * 5 < delta) {
				status += 'DELAYED';
			} else {
				status += 'On-time';
			}
		} else {
		    status += flights.STATI[flight.StatusCode];
		}
		statusLine += '<b>'+status+':</b> ';

		//TODO (caine): RELATIVE TIME
		//var statusDelta = depDate - Date.now();
		//console.log('statusDelta: '+statusDelta);
		//statusLine += 'Departs in '+parseInt(statusDelta/flights.MILLIS_PER_HOUR)+' hours '+parseInt((statusDelta % flights.MILLIS_PER_HOUR)/flights.MILLIS_PER_MIN)+' minutes.';
    }

    if (airline && flightNumber) {
		/*statusLine = '<a href="'+flights.makeStatusLink(airline.AirlineCode,flightNumber)+'" onclick="fl=1">Flight status for '+
	    airline.Name+' '+flightNumber+'</a>';*/
		statusLine += 'Flight status for '+airline.Name+' '+flightNumber;
    }

    return statusLine;
}

flights.airportDeepLink = function(name, airportCode) {
	return '<a href="http://www.ﬂightstats.com/go/Airport/airportDetails.do?airport='+
		airportCode+'" onclick="fl=1">'+name+'</a>';
}

flights.getAirportName = function(airport, airportCode) {
	airport = airport.replace(/airport/i,'');
	return airport.replace(/international/i,'')+'('+airportCode+')';
}

flights.ellipsize = function(str) {
	if (str.length > 20) {
		return str.slice(0,19)+'...';
	}
	return str;
}

Date.prototype.dumbTimeTz = function() {
	var hours = this.getHours();
	var minutes = flights.padNumber(this.getMinutes());
	if (hours == 0) {
	    hours = 12;
	}
	var dumbTime = (hours > 12 ? (hours-12) : hours)+':'+minutes;

	dumbTime += this.getHours() >= 12 ? 'pm' : 'am';
	var tzString = String(String(this).split("(")[1]).split(")")[0];

	if (tzString.length > 4) {
		var tzStringArray = tzString.split(" ");
		var tmp = '';
		for (var i = 0; i < tzStringArray.length; i++) {
			tmp += tzStringArray[i].charAt(0);
		}
		tzString = tmp;
	}
	if (ie) {
		tzString = this.toString().substring(this.toString().length-9, this.toString().length-4);
		tzString = tzString.trim();
	}
	if (io || tzString == undefined || tzString == 'u') {
		tzString = '';
	}
	return dumbTime+' '+tzString;
}

Date.prototype.dumbTime = function() {
	var hours = this.getHours();
	var minutes = flights.padNumber(this.getMinutes());
	if (hours == 0) {
	    hours = 12;
	}
	var dumbTime = (hours > 12 ? (hours-12) : hours)+':'+minutes+' ';
	//console.log(hours, dumbTime);
	dumbTime += this.getHours() >= 12 ? 'pm' : 'am';
	return dumbTime
}

flights.padNumber = function(n) {
	return n<10 ? '0'+n : n;
}

flights.getDateFromString = function(date) {
//	console.log('getDateFromString param: '+date);
//	console.log('type: '+typeof date);

	date = date.replace('T',' ');
	date = date.substring(0, date.indexOf('.'));
	var dateArray = date.split(/[- :]/);
	var now = new Date();
	var ret = new Date(Date.UTC(dateArray[0],dateArray[1]-1,dateArray[2],dateArray[3],dateArray[4],dateArray[5])+(now.getTimezoneOffset()*flights.MILLIS_PER_MIN));
//	console.log('ret date: '+ret+', UTC: '+ret.toUTCString()+', LocaleString: '+ret.toLocaleString());

	return ret;
}

//considering switching on the flight status code
flights.getDate = function(flight, airport) {
	switch (airport) {
	case flights.AP_ORIGIN:
		if (flight.EstimatedGateDepartureDate) {
			time = flight.EstimatedGateDepartureDate;
		} else {
			time = flight.DepartureDate;
		}
		break;
	case flights.AP_DESTINATION:
		if (flight.EstimatedGateArrivalDate) {
			time = flight.EstimatedGateArrivalDate;
		} else {
			time = flight.ArrivalDate;
		}
		break;
	default:
		break;
	}
	if (time) {
		return flights.getDateFromString(time);
	}
//	console.log('getDate returning null!');
	return '';
}
