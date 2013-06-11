function ddg_spice_twitter_locate(api_result) {
    if (api_result.query.count === 0) return;
        
		var place = api_result.query.results.place;
		
		var woeid = ($.isArray(place))
			? place[0].woeid
			: place.woeid;

		if (woeid) {
			nrj("/js/spice/twitter/trends/" + woeid);
		} else {
			return;
		}
}