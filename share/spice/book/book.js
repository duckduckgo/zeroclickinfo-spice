function ddg_spice_book(api_result) {
     
    if  (api_result == null || api_result.total_results < 1 || api_result.book.critic_reviews.length == 0) return
    var header = "Critic Reviews of " + api_result.book.title;
    if(api_result.book.author && (api_result.book.author.length > 0) ) {header += (" by " + api_result.book.author)};
    
    var data =  api_result.book.critic_reviews[0];
    
     

   
    var d = new Date(data.review_date);
    if (d && !isNaN( d.getTime() ) ){
        var m_names = ["Jan", "Feb", "Mar",  "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var curr_date = d.getUTCDate();
        var curr_month = d.getUTCMonth();
        var curr_year = d.getUTCFullYear();
        data.review_date = ( m_names[curr_month] + " " + curr_date + ", " + curr_year);
    }else{
        data.review_date = "";
    };

    

    Spice.render({
         data              : data,
         force_big_header  : true,
         header1           : header,
         source_name       : "idreambooks.com", // More at ...
         source_url        :  api_result.book.detail_link,
         template_normal   : 'book',
         template_small    : 'book'
    });
}