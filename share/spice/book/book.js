function ddg_spice_book(api_result) {
     
    // return if no book is returned or if the returned book has no reviews
    if  (api_result == null || api_result.total_results < 1 || api_result.book.critic_reviews.length == 0) return
      
    // assign the book object to data
    var data =  api_result.book;
   
    // function to convert date from 2012-07-20 format to Jul 20, 2012
    var prettyDate = function(date) {
        var d = new Date(date);
        if (d && !isNaN(d.getTime()) ){
            var m_names = ["Jan", "Feb", "Mar",  "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            var curr_date = d.getUTCDate();
            var curr_month = d.getUTCMonth();
            var curr_year = d.getUTCFullYear();
            return ( m_names[curr_month] + " " + curr_date + ", " + curr_year);
        }else{
            return null;
        };
    };
    
    // convert pulication date of reviews to pretty format
    for (var i = 0; i < data.critic_reviews.length; i++) {
        data.critic_reviews[i].review_date = prettyDate(data.critic_reviews[i].review_date);
    }
    
    // convert book publication date to pretty format
    data.release_date = prettyDate(data.release_date);

    // get only the year of release date for header 
    data.release_year = ( data.release_date || "" ).match(/\d{4}$/);

    // pick a random critic review out of all the reviews returned
    data.critic_review = data.critic_reviews[Math.floor(Math.random() * data.critic_reviews.length)];

    var header =  data.title;
    // add year of release to header
    if (data.release_year){
        header += " (" + data.release_year + ")"
    }

    Spice.render({
         data              : data,
         force_big_header  : true,
         header1           : header,
         source_name       : "idreambooks.com", // More at ...
         source_url        :  data.detail_link,
         template_normal   : 'book',
         template_small    : 'book',
	 force_no_fold     : true
    });
}
