function ddg_spice_hacker_news (api_result) {

	// Check for at least 1 result
	if ( api_result.hits < 1 ) {
		return;
	}

	Spice.render({
		data: 				api_result,
		header1 : 			"Spice2 HackerNews.",
		source_url : 		'http://www.hnsearch.com/search#request/all&q =' + encodeURIComponent( DDG.get_query() ),
		source_name : 		'Hacker News',
		template_normal : 	"hacker_news",
		force_big_header : 	true
	});

	// click handler for TopComments and OtherStories
	$(document).ready(function(){
		// click handler for TopComments and OtherStories
		$("a.hn_showHide").click(function(){

			if ( $(this).data("target") ){
				var target = $(this).data("target");
				$(target).toggle();
			}
		});
	});
}

/*******************************
  Private helpers
  *******************************/

/* HackerNews Object
 * Contains result lists
 */
function HackerNews(data) {

	this.limit = (data.request.limit < data.hits) ? data.request.limit : data.hits;
	this.topStories = [];
	this.topComments = [];
	this.otherStories = [];

	function isStory (r) {
		console.log("THIS IS R: ", r);
		return ( r["type"] === "submission" );
	}

	// Adds result object to appropriate list
	this.addResult = function (result) {
		var location;

		if (this.topStories.length < 3 && isStory(result)) {
			location = this.topStories;
		} else {
			location = isStory(result) ? this.otherStories : this.topComments;
		}
		location.push( result );
	};

	this.canUse = function (result) {

		if ( isStory(result) && (this.otherStories.length < 3 || this.topStories.length < 3)) {
			return true;
		} else if ( !isStory(result) && this.topComments.length < 3 ) {
			return true;
		} else {
			return false;
		}
	};

	this.isFull = function () {
		if (this.topStories.length > 2 && this.otherStories.length > 2 &&
			this.topComments.length > 2) {
			return true;
		} else {
			return false;
		}
	};
}


/*******************************
  Public Helpers
  *******************************/
(function() {

	/*******************************
	  Handlebars helpers
	  *******************************/

	// creates an anchor linking to a result's commments
	Handlebars.registerHelper('organizeResults', function(options) {

		var hn = new HackerNews(this);
		var item;

		for ( var i = 0; i < hn.limit; i++ ) {

			// Grab item
			result = this.results[i].item;

			// Check if result is needed
			// and append to correct list
			if ( hn.canUse(result) ) {
				hn.addResult(result);
			}

			if ( hn.isFull() ){
				break;
			} else {
				continue;
			}
		}

		// invoke context of template with hn object as context
		return options.fn(hn);
	});


	// creates an anchor linking to an item's commments
	Handlebars.registerHelper('hn_comment', function(text) {

		var temp = d.createElement("div");
		temp.innerHTML = text;
		var cleanText = $(temp).text();

		return Handlebars.helpers.condense(cleanText, {hash:{maxlen:"120"}});
	});


	// pluralizes a word when necessary
	Handlebars.registerHelper('plural', function(num) {
		return ((num !== 1)? 's' : '');
	});


	// returns a link to the HN user with given id
	Handlebars.registerHelper('user_link', function(id) {
		return '<a href="https://news.ycombinator.com/user?id=' + id + '">' +
				id + '</a>';
	});


	// returns a link to the HN item (story, comment) with given id
	Handlebars.registerHelper('item_link', function(text) {

		var id = (text === "parent") ? this.discussion.id : this.id;

		return '<a href="https://news.ycombinator.com/item?id=' + id + '">' +
				Handlebars.helpers.condense(text, {hash:{maxlen:"30"}}) +
				'</a>';
	});
})();