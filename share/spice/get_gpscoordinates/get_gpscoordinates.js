(function (env) {
    "use strict";
    env.ddg_spice_get_gpscoordinates = function(api_result){

        if (api_result.error) {
            return Spice.failed();   // Spice.failed('Cannot display coordinates: got an API error in get_gpscoordinates.');
        }

	var result_string = JSON.stringify(api_result);
	var matches = [],
	    coords = {};
	if(matches = result_string.match(/lat_?d\s*=\s*(\d+)/))
		coords.latd = matches[1];
	if(matches = result_string.match(/lat_?m\s*=\s*(\d+)/))
		coords.latm = matches[1];
	if(matches = result_string.match(/lat_?s\s*=\s*(\d+)/))
		coords.lats = matches[1];
	if(matches = result_string.match(/lat_?NS\s*=\s*([NS])/))
		coords.latNS = matches[1];
	if(matches = result_string.match(/long_?d\s*=\s*(\d+)/))
		coords.longd = matches[1];
	if(matches = result_string.match(/long_?m\s*=\s*(\d+)/))
		coords.longm = matches[1];
	if(matches = result_string.match(/long_?s\s*=\s*(\d+)/))
		coords.longs = matches[1];
	if(matches = result_string.match(/long_?EW\s*=\s*([EW])/))
		coords.longEW = matches[1];

	//for(var i in coords)
	//	console.log("coords." + i + "=" + coords[i]);

	// Special case for the seconds component, because some wikipedia city articles include only degrees and minutes:
	if(typeof(coords.lats) === 'undefined')
		coords.lats = 0;
	if(typeof(coords.longs) === 'undefined')
		coords.longs = 0;

	if(typeof(coords.latd) === 'undefined'   ||   typeof(coords.latm) === 'undefined'   ||   typeof(coords.latNS) === 'undefined'
	|| typeof(coords.longd) === 'undefined'   ||   typeof(coords.longm) === 'undefined'   ||   typeof(coords.longEW) === 'undefined')
	{
		// Sometimes the wikipedia article has the coords in decimal format instead:
		if(matches = result_string.match(/lat_?d\s*=\s*([\d\.-]+)/))
			coords.lat_decimal = matches[1];
		if(matches = result_string.match(/long_?d\s*=\s*([\d\.-]+)/))
			coords.long_decimal = matches[1];

		if(!coords.lat_decimal && !coords.long_decimal)
			return Spice.failed();   // Spice.failed('Cannot display coordinates: degrees, minutes, and/or N/S/E/W were null, in get_gpscoordinates.');

		if(coords.lat_decimal.match(/-/)) {
			coords.lat_decimal = coords.lat_decimal.replace(/-/g, '');   // temporarily remove it to calculate the d/m/s values.
			coords.latNS = 'S';
		}
		else
			coords.latNS = 'N';

		if(coords.long_decimal.match(/-/)) {
			coords.long_decimal = coords.long_decimal.replace(/-/g, '');   // temporarily remove it to calculate the d/m/s values.
			coords.longEW = 'W';
		}
		else
			coords.longEW = 'E';

		coords.latd = parseInt(coords.lat_decimal);
		coords.latm = parseInt(60   * (coords.lat_decimal - coords.latd));
		coords.lats = parseInt(3060 * (coords.lat_decimal - coords.latd - coords.latm/60));

		coords.longd = parseInt(coords.long_decimal);
		coords.longm = parseInt(60   * (coords.long_decimal - coords.longd));
		coords.longs = parseInt(3060 * (coords.long_decimal - coords.longd - coords.longm/60));

		// Re-add any negative signs:
		if(coords.latNS === 'S')
			coords.lat_decimal = '-' + coords.lat_decimal;
		if(coords.longEW === 'W')
			coords.long_decimal = '-' + coords.long_decimal;
	}

	if(!coords.lat_decimal) {
		coords.lat_decimal = parseInt(coords.latd) + (coords.latm/60) + (coords.lats/3600);
		if(coords.latNS.match(/s/i))
			coords.lat_decimal = '-' + coords.lat_decimal;
	}

	if(!coords.long_decimal) {
		coords.long_decimal = parseInt(coords.longd) + (coords.longm/60) + (coords.longs/3600);
		if(coords.longEW.match(/w/i))
			coords.long_decimal = '-' + coords.long_decimal;
	}

        Spice.add({
            id: "get_gpscoordinates",
            name: "GetGPSCoordinates",
            data: coords,
            meta: {
                sourceName: "openstreetmap.org",
                sourceUrl: "http://www.openstreetmap.org/?mlat=" + coords.lat_decimal + "&mlon=" + coords.long_decimal + "&zoom=12"
            },
            templates: {
                group: 'base',
                options:{
                    content: Spice.get_gpscoordinates.content,
                    moreAt: true
                }
            }
        });
    };
}(this));
