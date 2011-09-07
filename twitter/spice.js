function twitter(tweets) {
  if(tweets.length) {
    var content = "";
    var heading = "@" + tweets[0].user.screen_name;
    
    content += '<p class="twitter_user_description">' + tweets[0].user.description + '</p>';
    
    var status = tweets[0].text.replace(/((https?|s?ftp|ssh)\:\/\/[^"\s\<\>]*[^.,;'">\:\s\<\>\)\]\!])/g, function(url) {
      return '<a href="' + url + '">' + url + '</a>';
    }).replace(/\B@([_a-z0-9]+)/ig, function(user) {
      return '<a href="http://twitter.com/' + user.substring(1) + '">' + user + '</a>';
    });
    content += '<p class="twitter_latest_tweet"><b>Latest Tweet:</b> ' + status + ' <span class="twitter_date">published <a href="http://twitter.com/' + tweets[0].user.screen_name + '/status/' + tweets[0].id_str + '">' + relative_time(tweets[0].created_at) + '</a></span></p>';
    
    content += '<span class="clearfix"></span>';
    
    items = [[]];
    items[0]['a'] = content;
    items[0]['h'] = heading;
    items[0]['s'] = heading + ' on twitter.com';
    items[0]['u'] = 'http://twitter.com/' + tweets[0].user.screen_name;
    items[0]['i'] = tweets[0].user.profile_image_url;

    nra(items);
  }
}

function relative_time(time_value) {
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
    return values[2] + ' ' + month_names[values[1]] + ' ' + values[5];
  }
}
