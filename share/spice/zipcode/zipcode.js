DDG.require('maps',function(){
    ddg_spice_zipcode = function(api_result) {

        // Check errors.
        if(!api_result || !api_result.places || !api_result.places.place || !api_result.places.place.length) {
            return Spice.failed('maps'); // should be zipcode, but backend is sending maps signal right now
        }

        // Get the original query zipcode and country name
        var script  = $("[src*='js/spice/zipcode']")[0],
            source  = $(script).attr("src"),
            matches = source.match(/\/([^\/]+)\/(\w+)$/),
            searchZip = matches[1],
            searchCountry = matches[2],
            foundMatch = 0;


		// Display the Spice plugin.
		Spice.add({

			id: 'zipcode',
			name: 'Places',
			from: 'maps', // shouldn't have to do this, backend is sending maps signal, not zipcode
			data: api_result.places.place,
			view: 'Map',
			model: 'Location',

			normalize: function(item) {
				var zip = item.name.replace(/\s+/, "");

				if (!foundMatch && zip === searchZip && (searchCountry === 'ZZ' || item['country attrs'].code === searchCountry)) {
					var ne = item.boundingBox.northEast,
						sw = item.boundingBox.southWest,
						polygon = [
							[ne.longitude,ne.latitude],
							[ne.longitude,sw.latitude],
							[sw.longitude,sw.latitude],
							[sw.longitude,ne.latitude]
						];

					foundMatch = true;

					return {
						name: zip,
						address: [item.admin2,item.admin1].join(", "),
						coordinates: item.centroid,
						// polygonPoints: polygon
					};
				}

				return null;
			}
		});
    }
});
