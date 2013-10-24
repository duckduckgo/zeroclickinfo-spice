function ddg_spice_book(api_result) {     
    // Return if no book is returned 
    if (!api_result || api_result.books.length == 0) {
	return;
    }

    var script = $('[src*="/js/spice/book/"]')[0];
    var source = $(script).attr("src");
    var query = source.match(/book\/([^\/]+)/)[1];

    // Select the book to display from the returned books
    // Current logic is to select first book with critic reviews
    var data;
    for (var i = 0; i < api_result.books.length; i++) {
        console.log(api_result.books[i].title, api_result.books[i].review_count, decodeURIComponent(query));
	if((api_result.books[i].review_count || api_result.books[i].unrated_review_count) && 
	    DDG.stringsRelevant(api_result.books[i].title, decodeURIComponent(query), [], 3, true)) {
            data = api_result.books[i];
	    break;
        }
    }

    if (!data) {
	return;
    }

    if(data.review_count === 0) {
	data.critic_reviews = data.unrated_critic_reviews;
	data.review_count = data.unrated_review_count;
    }

    // Function to convert date from 2012-07-20 format to Jul 20, 2012
    var prettyDate = function(date) {
        var d = new Date(date);
        if (d && !isNaN(d.getTime())) {
            var m_names = ["Jan", "Feb", "Mar",  "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            var curr_date = d.getUTCDate();
            var curr_month = d.getUTCMonth();
            var curr_year = d.getUTCFullYear();
            return m_names[curr_month] + " " + curr_date + ", " + curr_year;
        } else {
            return null;
        };
    };
    
    // Convert book publication date to pretty format
    data.release_date = prettyDate(data.release_date);

    // Get only the year of release date for header 
    data.release_year = (data.release_date || "").match(/\d{4}$/);

    // Pick a random critic review out of all the reviews returned
    data.critic_review = data.critic_reviews[Math.floor(Math.random() * data.critic_reviews.length)];

    // Convert pulication date of reviews to pretty format
    data.critic_review.review_date = prettyDate(data.critic_review.review_date);

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
