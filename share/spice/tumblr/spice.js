var MAX_RESULTS = 6;
if (ip || ia) {
    MAX_RESULTS = 4;
}

function ddg_spice_tumblr(t) {
    console.log(t);

    var heading = 'Tumblr images with the tag: ' + decodeURIComponent(rq).replace(/tumblr/i, '');
    var results = t.response;

    var imgTable = d.createElement('div');
    for (var result in results) {
	if (result >= MAX_RESULTS) break;
	var tumbl = results[result];

	var photos = tumbl.photos;
	if (!photos) continue;

	var photo = photos[0];
	if (!photo) continue;
	
	for (var size in photo.alt_sizes) {
	    if (photo.alt_sizes[size].width == 250) {
		photo = photo.alt_sizes[size];
		break;
	    }
	}

	if (!photo.url) continue;

	var img = d.createElement('img');
	img.src = photo.url;

	var img_wrap = d.createElement('div');
	img_wrap.appendChild(img);
	var iClass = 'wire_cell';
	if (ip || ia) {
	    iClass = 'wire_cell_mobile';
	}

	YAHOO.util.Dom.addClass(img_wrap, iClass);

	imgTable.appendChild(img_wrap);
    }
    var clearDiv = d.createElement('div');
    YAHOO.util.Dom.addClass(clearDiv, 'clear');
    imgTable.appendChild(clearDiv);

    items = [[]];

    items[0]['a'] = imgTable.innerHTML;
    items[0]['h'] = heading;
    items[0]['s'] = 'Tumblr';
    items[0]['u'] = '//tumblr.com/tagged/' + encodeURIComponent(decodeURIComponent(rq).replace(/tumblr\s+/i,''));
    items[0]['force_no_fold'] = 1;

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
