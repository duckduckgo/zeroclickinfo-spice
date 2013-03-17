var temp, out;

function ddg_spice_hacker_news (api_result) {

	// Check for at least 1 result
	if ( api_result.hits < 1 ) return;

	Spice.render({
		data: 				api_result,
		header1 : 			"Spice2 HackerNews.",
		source_url : 		'http://www.hnsearch.com/search#request/all&q =' + encodeURIComponent( DDG.get_query() ),
		source_name : 		'Hacker News',
		template_normal : 	"hacker_news",
		force_big_header : 	true
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

	// Adds result object to appropriate list
	this.addResult = function (resultObj) {
		var location,
			that = resultObj;

		if (this.topStories.length < 3 && that.isStory()) {
			location = this.topStories;
		} else {
			location = that.isStory() ? this.otherStories : this.topComments;
		}
		location.push( that.resultData );
	};

	this.canUse = function (result) {

		if ( result.isStory() && (this.otherStories.length < 3 || this.topStories.length < 3)) {
			return true;
		} else if ( !result.isStory() && this.topComments.length < 3 ) {
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


/* Function
 * Removes HTML markup from string
 */
function stripHTML(html) {
   var temp = document.createElement("div");
   
   // remove <a> tags but preserve link content
   html = html.replace(/<a.*href="(.*?)".*>(.*?)<\/a>/gi, " $2 ($1)");

   temp.innerHTML = html;
   
   var ret = temp.textContent || temp.innerText;

   // get rid of more than 2 spaces:
   ret = ret.replace(/ +(?= )/g,'');
   
   return ret;
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

		for ( var i = 0; i < hn.limit; i++ ) {

			// Grab item
			var result = new Result( this.results[i].item );

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


	// creates an anchor linking to a result's commments
		Handlebars.registerHelper('hn_comment', function(text) {

			var temp = d.createElement("div")
			temp.innerHTML = text;
			var cleanText = $(temp).text();

			return Handlebars.helpers.condense(cleanText, {hash:{maxlen:"120"}})
		});


	// creates an anchor linking to a result's commments
	Handlebars.registerHelper('comment_link', function(num) {
		var comment = num.toString() +
			(num !== 1)? 'comments' : 'comment';

		return '<a href="http://news.ycombinator.com/item?id=' + this.id.toString() + '">' +
				comment	+ '</a>';
	});


	// returns a string contianing the number of points
	Handlebars.registerHelper('hn_points', function(points) {
		var string = points.toString();

		if ( points === 1){
			return string + " point";
		} else {
			return string + " points";
		}
	})


	// returns a link to the HN user with given id
	Handlebars.registerHelper('user_link', function(id) {
		return '<a href="https://news.ycombinator.com/user?id=' + id + '">' +
				id + '</a>';
	})


	// returns a link to the HN item (story, comment) with given id
	Handlebars.registerHelper('item_link', function(text) {

		var id = (text === "parent") ? this.discussion.id : this.id;

		return '<a href="https://news.ycombinator.com/item?id=' + id + '">' +
				Handlebars.helpers.condense(text, {hash:{maxlen:"30"}}) +
				'</a>';
	})
})();

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