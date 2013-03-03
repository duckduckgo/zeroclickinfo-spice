function ddg_spice_hacker_news (res) {

	// Check for at least 1 result
	if ( res["hits"] <= 0 ) return;

	var hn = new HackerNews(res);
			i = 0;

	while ( i < hn.limit && !hn.isFull() ) {

		// Grab item
		var result = new Result( res["results"][i]["item"] );

		// Append to correct list
		hn.addResult(result);

		console.log("This is loop #" + i);
		i++;
	}

	console.log(hn);

	//required to make the spice div appear
	items = [[]];
	items[0]['a'] = "blah";
	nra(items);

	Spice.render({
		data: hn,
		force_big_header : true,
		header1 : "Spice2 HackerNews.",
		source_name : 'Hacker News',
		source_url : 'http://www.hnsearch.com/search#request/all&q=' + encodeURIComponent( DDG.get_query() ),
		template_normal : "hacker_news"
	});
}


/* HN Module
 * Contains result lists
 */
 var HackerNews = (function () {

	// Constructor
	var HackerNews = function (data) {
		this.terms = data["request"]["q"],
		this.limit = (data["request"]["limit"] < data["hits"]) ? data["request"]["limit"] : data["hits"],
		this.topResults = [],
		this.topComments = [],
		this.topStories = [];

		// Checks if result needs to be return to
		// primary result list
		this.addToTop = function () {
			if (this.topResults && this.topResults.length >= 3) {
				return false;
			} else {
				return true;
			}
		};
	};

	// Prototype
	HackerNews.prototype = {
		constructor: HackerNews,

		// Adds result object to appropriate list
		addResult: function (resultObj) {
			var location,
			that = resultObj;

			if ( this.addToTop() ) {
				location = this.topResults;
			} else if ( that.isSubmission() && this.topStories.length < 3 ){
				location = this.topStories;
			} else if ( !that.isSubmission() && this.topComments.length < 3 ){
				location = this.topComments;
			} else {
				console.log("WE'RE FULL");
				return;
			}
			location.push( that.resultData );
		},
		isFull: function () {
			var resultsLen = this.topResults.length,
			commentsLen = this.topComments.length,
			storiesLen = this.topStories.length;

			if ( commentsLen >= 3 && storiesLen >= 3 ) {
				return true;
			} else {
				return false;
			}
		}
	}
	return HackerNews;
})();


/* Result Module
 * Encapsulates a HackerNews result
 */
 var Result = (function () {

	// Constructor
	var NewResult = function (data) {
		this.resultData = data;
		this.resultType = data["type"];
	};

	// Prototype
	NewResult.prototype = {
		constructor: NewResult,
		isSubmission: function () {
			return (this.resultType === "submission") ? true : false;
		}
	}
	return NewResult;
})();


/*******************************
  Handlebars helpers
  *******************************/

// debug helper
// usage: {{debug}} or {{debug someValue}}
Handlebars.registerHelper("debug", function(optionalValue) {
	console.log("Current Context");
	console.log("====================");
	console.log(this);

	if (optionalValue) {
		console.log("Value");
		console.log("====================");
		console.log(optionalValue);
	}
});

// shorten helper
// shortens text to given length
Handlebars.registerHelper('shorten', function (text, limit) {
	var limit = limit || 140;
	if (text.length > limit) {
		return text.slice(0,limit) + '...';
	}

	return text;
});

// comment_link helper
// creates an anchor linking to a result's commments
Handlebars.registerHelper('comment_link', function(id, num) {
	var comment = num.toString()
	+ (num !== 1)? 'comments' : 'comment';

	var link = '<a href="http://news.ycombinator.com/item?id=' + id.toString() + '>'
	+ comment
	+ '</a>';
	return link;
});

// hn_points helper
// returns a string contianing the number of points
Handlebars.registerHelper('hn_points', function(points) {
	return "nice.";
})

// user_link helper
// returns a link to the HN user with given id
Handlebars.registerHelper('user_link', function(id, username) {
	return "nice.";
})

// item_link helper
// returns a link to the HN item (story, comment) with given id
Handlebars.registerHelper('item_link', function(id, text) {
	return "nice.";
})