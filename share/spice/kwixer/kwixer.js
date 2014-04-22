(function(env) {
    env.ddg_spice_kwixer = function(api_result) {
	if(!api_result || !api_result.length === 0) {
	    return;
	}

	var skipArray = [
	    'new movies with',
	    'new movies featuring',
	    'new movies starring',
	    'new movie with',
	    'new movie featuring',
	    'new movie starring',
	    'newest movies with',
	    'newest movies featuring',
	    'newest movies starring',
	    'newest movie with',
	    'newest movie featuring',
	    'newest movie starring',
	    'new films with',
	    'new films starring',
	    'new films featuring',
	    'new film with',
	    'new film starring',
	    'new film featuring',
	    'newest films with',
	    'newest films starring',
	    'newest films featuring',
	    'newest film with',
	    'newest film starring',
	    'newest film featuring',
	    'movie with',
	    'movies with',
	    'movies starring',
	    'film with',
	    'films with',
	    'films starring',
	    'film starring',
	    'movies featuring',
	    'films featuring',
	    'movies with the',
	    ' the '
	];

	var query = DDG.get_query();
	var finalArray = [];
	var remainder = query.toLowerCase();
	
	for(var i = 0; i < skipArray.length; i++) {
	    remainder = remainder.replace(skipArray[i], "");
	}

	remainder = $.trim(remainder);
	var remainderArray = remainder.split(" ");

	for(var i = 0; i < api_result.length; i++) {
	    var item = api_result[i];
	    var isRelevant = false;
	    var actors = item.ResourceDetails2.toLowerCase();

	    for(var j = 0; j < remainderArray.length; j++) {
		if(actors.indexOf(remainderArray[j]) !== -1) {
		    isRelevant = true;
		    break;
		}
	    }

	    if(isRelevant && item.ResourceImageUrl && item.ResourceImageUrl.length > 0 && (item.ResourceImageUrl.indexOf(".jpeg") !== -1 || item.ResourceImageUrl.indexOf(".jpg") !== -1 || item.ResourceImageUrl.indexOf(".png") !== -1)) {
		item.ResourceImageUrl = item.ResourceImageUrl.replace("large_", "medium_");
		finalArray.push(item);
	    }
	}

	if (finalArray.length === 0) {
	    return;
	}

	console.log(finalArray);
	Spice.add({
	    id: 'kwixer',
	    name: 'Movie Actors',
	    data: finalArray,
	    meta: {
		sourceName: 'Kwixer',
		sourceUrl: "https://www.kwixer.com/#/explore?category=movie&query=" + DDG.get_query_encoded(),
		sourceIcon: true,
		itemType: "Movies"
	    },
	    normalize: function(o) {
		return {
		    image: o.ResourceImageUrl,
		    title: o.ResourceTitle,
		    ratingText: o.ResourceYear + ""
		}
	    },
	    templates: {
		item: 'basic_image_item',
		detail: Spice.kwixer.kwixer_detail
	    }
	});
    };

    Handlebars.registerHelper("formatDetail", function(s) {
	return s.split(";").join(", ");
    });
}(this));
