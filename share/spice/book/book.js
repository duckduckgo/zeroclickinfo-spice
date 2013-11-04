function ddg_spice_book(api_result) {     
    // Return if no book is returned 
    if (!api_result || api_result.books.length == 0) {
	return;
    }

    // Get the query without the trigger words.
    // We do this because it's a bit easier to do than
    // just passing a skip array to DDG.isRelevant or DDG.stringsRelevant.
    // For example, we can't just skip the word book by passing ["book"]
    // because some book titles have the word book in them such as "the graveyard book".
    var script = $('[src*="/js/spice/book/"]')[0];
    var source = $(script).attr("src");
    var query = source.match(/book\/([^\/]+)/)[1];
    var decoded_query = decodeURIComponent(query);

    api_result.books.splice(5);

    // Select the book to display from the returned books.
    var data;
    for (var i = 0; i < api_result.books.length; i++) {
	var title = api_result.books[i].title || "";
	var sub_title = api_result.books[i].sub_title || "";
	var author = api_result.books[i].author || "";

	// Check relevancy of the item.
	// 1. Check if we have reviews (rated or unrated is fine).
	// 2. Check if the title + sub_title is relevant to the query.
	// 3. Check if the title is relevant to the query.
	// 4. Check if the title + author is relevant to the query.
	// 5. Check if the title + sub_title + author is relevant to the query.
	if((api_result.books[i].review_count || api_result.books[i].unrated_review_count) && 
	   (DDG.stringsRelevant(title + " " + sub_title, decoded_query, [], 3, true) ||
	    DDG.stringsRelevant(title, decoded_query, [], 3, true) ||
	    DDG.stringsRelevant(title + " " + author, decoded_query, [], 3, true) ||
	    DDG.stringsRelevant(title + " " + sub_title + " " + author, decoded_query, [], 3, true))) {
            data = api_result.books[i];
	    break;
        }
    }

    // Exit immediately if we didn't find a relevant item.
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

    // Filter critic reviews that have really short critic reviews.
    var critic_reviews = [];
    for(var i = 0; i < data.critic_reviews.length; i++) {
	if(data.critic_reviews[i].snippet.length > 10) {
	    critic_reviews.push(data.critic_reviews[i]);
	}
    }
    data.critic_reviews = critic_reviews;
    
    // Pick a random critic review out of all the reviews returned
    data.critic_review = data.critic_reviews[Math.floor(Math.random() * data.critic_reviews.length)];

    // This function adds a colon before the subtitle.
    // It doesn't add a colon if the subtitle begins with anything other
    // than letters or numbers, e.g., a parenthesis.
    var formatSub = function(sub_title) {
	if(sub_title && sub_title.length > 0) {
	    if(sub_title.match(/^[a-z0-9]/i)) {
		return ": " + sub_title;
	    }
	    return " " + sub_title;
	}
	return "";
    };

    var header = data.title = data.title + formatSub(data.sub_title);
    header = Handlebars.helpers.condense(header, {hash: {maxlen: 35}});

    Spice.render({
         data              : data,
         force_big_header  : true,
         header1           : header + " (Book Reviews)",
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
