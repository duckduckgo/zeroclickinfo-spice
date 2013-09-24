function ddg_spice_book(api_result) {
     
    if  (api_result == null || api_result.total_results < 1 || api_result.book.critic_reviews.length == 0) return
    var header = "Critic Reviews for " + api_result.book.title;
    if(api_result.book.author && (api_result.book.author.length > 0) ) {header += (" by " + api_result.book.author)};

    Spice.render({
         data              : api_result.book.critic_reviews[0],
         force_big_header  : true,
         header1           : header,
         source_name       : "idreambooks.com", // More at ...
         source_url        :  api_result.book.detail_link,
         template_normal   : 'book',
         template_small    : 'book'
    });
}