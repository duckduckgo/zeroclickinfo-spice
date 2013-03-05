function ddg_spice_hacker_news (res) {

	// Check for at least 1 result
	if ( res.hits < 1 ) return;
	var hn = new HackerNews(res);

	for ( var i = 0; i < hn.limit; i++ ) {

		// Grab item
		var result = new Result( res.results[i].item );

		// Check if result is needed
		// and append to correct list
		if ( hn.canUse(result) ) {
			hn.addResult(result);
			console.log( "This is loop: " + i );
		}

		if ( hn.isFull() ){
			break;
		} else {
			continue;
		}
	}

	console.log(hn);

	Spice.render({
		data: hn,
		force_big_header : true,
		header1 : "Spice2 HackerNews.",
		source_name : 'Hacker News',
		source_url : 'http://www.hnsearch.com/search#request/all&q=' + encodeURIComponent( DDG.get_query() ),
		template_normal : "hacker_news"
	});
}


/* HackerNews Object
 * Contains result lists
 */
 function HackerNews(data) {

	this.limit = (data.request.limit < data.hits) ? data.request.limit : data.hits;
	this.topResults = [];
	this.topComments = [];
	this.topStories = [];

	// Adds result object to appropriate list
	this.addResult = function (resultObj) {
		var location,
			that = resultObj;

		if (this.topResults.length < 3) {
			location = this.topResults;
		} else {
			location = that.isStory() ? this.topStories : this.topComments;
		}
		location.push( that.resultData );
	};

	this.canUse = function (result) {

		if ( this.topResults.length < 3 ) {
			return true;
		} else if ( result.isStory() && this.topStories.length < 3 ) {
			return true;
		} else if ( !result.isStory() && this.topComments.length < 3 ) {
			return true;
		} else {
			return false;
		}
	};

	this.isFull = function () {
		if (this.topResults.length > 2 && this.topStories.length > 2 &&
			this.topComments.length > 2) {
			return true;
		} else {
			return false;
		}
	};

};


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
		isStory: function () {
			return (this.resultType === "submission") ? true : false;
		}
	}
	return NewResult;
})();


/*******************************
  Handlebars helpers
  *******************************/
(function () {

	// creates an anchor linking to a result's commments
	Handlebars.registerHelper('comment_link', function(id, num) {
		var comment = num.toString()
		+ (num !== 1)? 'comments' : 'comment';

		var link = '<a href="http://news.ycombinator.com/item?id=' + id.toString() + '>'
		+ comment
		+ '</a>';
		return link;
	});


	// returns a string contianing the number of points
	Handlebars.registerHelper('hn_points', function(points) {
		var string = points.toString();

		if ( points === 1){
			return string + "point";
		} else {
			return string + "points";
		}
	})


	// returns a link to the HN user with given id
	Handlebars.registerHelper('user_link', function(id) {
		return '<a href="https://news.ycombinator.com/user?id=' + id + '">' +
				id + '</a>';
	})


	// returns a link to the HN item (story, comment) with given id
	Handlebars.registerHelper('item_link', function(text, context) {
		var id;

		if (text === "parent") {
			id = context.discussion.id;
		} else {
			id = context.id;
		}

		return '<a href="https://news.ycombinator.com/item?id=' + id + '">' +
			text + '</a>';
	})
})();