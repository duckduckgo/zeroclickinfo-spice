function ddg_spice_twitter_hashtag(t) {
    //console.log(t);

    var MAX_RESULTS = 4;
    var heading = decodeURIComponent(t.query);
    var results = t.results;

    var snippet = '<ul class="twitter_hashtag_ul">';
    
    for (result in results) {
      if (result > MAX_RESULTS) break;
    	var tweet = results[result];

    	snippet += '<li class="twitter_hashtag_li">';
    	snippet += '<a href="//twitter.com/' + tweet.from_user + '"><img class="twitter_hashtag_img" src="' + tweet.profile_image_url + '" /></a>';
    	snippet += makeStatus(tweet);
    	snippet += '</li>';
    }
    
    snippet += '</ul>';

    items = [[]];

    items[0]['a'] = snippet;
    items[0]['h'] = heading;
    items[0]['s'] = 'Twitter';
    items[0]['u'] = '//twitter.com/' + heading;
    items[0]['f'] = 1;

    nra(items, 0, 1);
}

function makeStatus(tweet) {
    var status = tweet.text.replace(/((https?|s?ftp|ssh)\:\/\/[^"\s\<\>]*[^.,;'">\:\s\<\>\)\]\!])/g, function(url) {
	    return '<a href="' + url + '">' + url + '</a>';
	}).replace(/\B@([_a-z0-9]+)/ig, function(user) {
		return '<a href="http://twitter.com/' + user.substring(1) + '">' + user + '</a>';
	    }).replace(/\B#([_a-z0-9]+)/ig, function(tag) {
		    return '<a href="http://twitter.com/#' + tag.substring(1) + '">' + tag + '</a>';
		});

    return status;
}
