function ddg_spice_twitter_hashtag(t) {
    console.log(t);

    var heading = decodeURIComponent(t.query);
    var results = t.results;

    var snippet = '<ul>';
    for (result in results) {
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
    //items[0]['i'] = results[0].profile_image_url;
    items[0]['f'] = 1;

    nra(items, 1, 0);
}

function makeStatus(tweet) {
    var status = tweet.text.replace(/((https?|s?ftp|ssh)\:\/\/[^"\s\<\>]*[^.,;'">\:\s\<\>\)\]\!])/g, function(url) {
	    return '<a href="' + url + '">' + url + '</a>';
	}).replace(/\B@([_a-z0-9]+)/ig, function(user) {
		return '<a href="http://twitter.com/' + user.substring(1) + '">' + user + '</a>';
	    }).replace(/\B#([_a-z0-9]+)/ig, function(tag) {
		    return '<a href="http://twitter.com/#' + tag.substring(1) + '">' + tag + '</a>';
		});

    //return '<span class="twitter_latest_tweet"><i>Latest Tweet:</i> ' + status + ' <span class="twitter_date">published <a href="//twitter.com/' + tweet.from_user + '/status/' + tweet.id_str + '">' + nrtr_relative_time(tweet.created_at) + '</a>.</span></span>';
    return status;
}

var nrtr_month_names = {
  "Jan": "January",
  "Feb": "February",
  "Mar": "March",
  "Apr": "April",
  "May": "May",
  "Jun": "June",
  "Jul": "July",
  "Aug": "August",
  "Sep": "September",
  "Oct": "October",
  "Nov": "November",
  "Dec": "December"
}

function nrtr_relative_time(time_value) {
  var values = time_value.split(" ");
  time_value = values[1] + " " + values[2] + ", " + values[5] + " " + values[3];
  var parsed_date = Date.parse(time_value);
  var relative_to = (arguments.length > 1) ? arguments[1] : new Date();
  var delta = parseInt((relative_to.getTime() - parsed_date) / 1000);
  delta = delta + (relative_to.getTimezoneOffset() * 60);

  if(delta < 60) {
    return 'less than one minute ago';
  }
  else if(delta < 120) {
    return 'one minute ago';
  }
  else if(delta < (60*60)) {
    return (parseInt(delta / 60)).toString() + ' minutes ago';
  }
  else if(delta < (120*60)) {
    return 'an hour ago';
  }
  else if(delta < (24*60*60)) {
    return (parseInt(delta / 3600)).toString() + ' hours ago';
  }
  else if(delta < (48*60*60)) {
    return 'one day ago';
  }
  else {
    return nrtr_month_names[values[1]] + ' ' + values[2] + ', ' + values[5];
  }
}