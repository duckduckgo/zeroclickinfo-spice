function ddg_spice_book(api_result) {     
    // Return if no book is returned 
    if (!api_result || api_result.books.length == 0) {
	return;
    }

    // Get the query without the trigger words.
    var script = $('[src*="/js/spice/book/"]')[0];
    var source = $(script).attr("src");
    var query = source.match(/book\/([^\/]+)/)[1];
    var decoded_query = decodeURIComponent(query);

    api_result.books.splice(5);

    // Select the book to display from the returned books
    // Current logic is to select first book with critic reviews
    var data;
    for (var i = 0; i < api_result.books.length; i++) {
	var title = api_result.books[i].title || "";
	var sub_title = api_result.books[i].sub_title || "";
	var author = api_result.books[i].author || "";

	if((api_result.books[i].review_count || api_result.books[i].unrated_review_count) && 
	   (DDG.stringsRelevant(title + " " + sub_title, decoded_query, [], 3, true) ||
	    DDG.stringsRelevant(title, decoded_query, [], 3, true) ||
	    DDG.stringsRelevant(title + " " + author, decoded_query, [], 3, true) ||
	    DDG.stringsRelevant(title + " " + sub_title + " " + author, decoded_query, [], 3, true))) {
            data = api_result.books[i];
	    break;
        }
    }

    if (!data) {
	return;
    }

    // If the item that we got doesn't have the critic_reviews array,
    // we copy over the unrated_reviews. This makes it easier to use the templates because 
    // we're only using one variable.
    if(data.review_count === 0) {
	data.critic_reviews = data.unrated_critic_reviews;
	data.review_count = data.unrated_review_count;
    }
    
    // Get only the year of release date for header 
    data.release_year = (data.release_date || "").match(/^\d{4}/);

    // Pick a random critic review out of all the reviews returned
    data.critic_review = data.critic_reviews[Math.floor(Math.random() * data.critic_reviews.length)];

    var header = data.title;
    // Add year of release to header
    if (data.release_year) {
        header += " (" + data.release_year + ")";
    }

    Spice.render({
         data              : data,
         force_big_header  : true,
         header1           : header,
         source_name       : "idreambooks.com", // More at ...
         source_url        :  data.detail_link,
	 spice_name        : "book",
	 template_frame    : "twopane",
	 template_options  : {
	     left: {
		 template: "book"
	     },
	     right: {
		 template: "book_critic"
	     }
	 },
	 force_no_fold     : true
    });
}

Handlebars.registerHelper("prettyDate", function(date) {
    var d = new Date(date);
    if (d && !isNaN(d.getTime())) {
        var m_names = ["Jan", "Feb", "Mar",  "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var curr_date = d.getUTCDate();
        var curr_month = d.getUTCMonth();
        var curr_year = d.getUTCFullYear();
        return m_names[curr_month] + " " + curr_date + ", " + curr_year;
    }
});
