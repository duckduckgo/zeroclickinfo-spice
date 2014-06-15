(function (env){
	"use strict";
	env.ddg_spice_njt = function(api_result){
		if (api_result.failed){
			return Spice.failed('njt');
		}

		function padZeros(n, len){
			var s = n.toString();
			while (s.length < len){
	  			s = '0' + s;
			}
			return s;
		}

		function format_time(t){
			var hour = parseInt(t.split(':')[0]);
			var minute = parseInt(t.split(':')[1]);
			var ampm = (hour >= 24) ? 'AM' : (hour >= 12) ? 'PM' : 'AM';
			if (hour > 24){
				hour -= 24;
			} else if (hour > 12) {
				hour -= 12;
			}
			return hour + ':' + padZeros(minute, 2) + ' ' + ampm;
		}

		function timeToInt(t){
			var hour = parseInt(t.split(':')[0]);
			var minute = parseInt(t.split(':')[1]);
			return hour*60 + minute;
		}

		var sorted = api_result.routes.sort(function(a, b){
			return timeToInt(a.departure_time) - timeToInt(b.departure_time);
		});

		Spice.add({
			id: 'njt',
			name: 'NJ Transit',
			data: sorted,
			meta: {
				heading: "Commuter Trains from " + api_result.origin + " to " + api_result.destination,
				sourceUrl: "http://www.njtransit.com",
				sourceName: "NJ Transit"
			},
			templates: {
				group: 'text',
				detail: false,
				item_detail: false
			},
			normalize: function(item){
				return {
					title: format_time(item.departure_time),
					subtitle: item.line,
					description: "Arrives " + format_time(item.arrival_time)
				};
			}
		});
	};
}(this));