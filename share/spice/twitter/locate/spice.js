function ddg_spice_twitter_locate(data) {
    if (data && data.query.count > 0) {
        var woeid = data.query.results.place[0].woeid;
        if (woeid) {
    		nrj("/js/spice/twitter/trends/" + woeid);
    	}
    }
}