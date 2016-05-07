(function(env) {
  "use strict";

  env.ddg_spice_goodreads = function(api_result) {
    console.info(api_result);

    // Validating response
    if(!api_result || api_result.GoodreadsResponse.search["total-results"].text == "0") {
      return Spice.failed('goodreads');
    }
        
    var get_details_uri = '/js/spice/goodreads/get_book_details/',
      get_image_for_book_uri = '/js/spice/goodreads/get_image_for_book/';

    $.ajaxSetup({ cache: true });
    
    // Render the response
    Spice.add({
      id: "goodreads",
      name: "Books",
      data: api_result.GoodreadsResponse.search.results.work,
      meta: {
        primaryText: "Book results for " + api_result.GoodreadsResponse.search.query.text,
        sourceName: "GoodReads",
        sourceUrl: "https://www.goodreads.com/"
      },
      
      
      onItemShown: function(item) {  
        // Good reads description API
        var book = item.best_book;
  
        // *** This ajax call is not working ***
        $.getJSON('/js/spice/goodreads/get_book_details/' + book.id.text, function(data) {
          console.info(data);
          
          var description = data.GoodreadsResponse.book.description.text || "-- No Description Found --";
          
          // The desciption might contain some html tags. Removing those...
          item['abstract'] = description && Handlebars.helpers.ellipsis(description.replace(/<\/?\w*>/gm, ''), 400);
          item['heading'] = book.title.text;
          item['isbn'] = data.GoodreadsResponse.book.isbn && data.GoodreadsResponse.book.isbn.text;
          item['isbn13'] = data.GoodreadsResponse.book.isbn13 && data.GoodreadsResponse.book.isbn13.text;
          
          $.getJSON(get_image_for_book_uri + data.GoodreadsResponse.book.isbn13.text, function(image_object) {
            console.info(image_object);
            item['img_m'] = image_object.results[0].img_m;
          });
        });
      },
      
      normalize: function(item) {
        return {
          url: "https://www.goodreads.com/book/show/" + item.best_book.id.text,
          //               description: "by " + item.best_book.author.name.text,
          title: item.best_book.title.text,
          image: item.best_book.image_url.text,
          img_m: item.best_book.image_url.text,
          rating: parseFloat(item.average_rating.text),
          ratingText: item.average_rating.text,
          brand: item.best_book.author.name.text,
          reviewCount: parseInt(item.text_reviews_count.text)
        };
      },
      
      templates: {
        item: 'basic_image_item',
        item_detail: 'products_item_detail',
        wrap_detail: 'base_detail',
        options: {
          rating: true,
          brand: true,
          moreAt: true,
//           subtitle_content
        },
        
        variants: {
          tile: 'poster'
        }
      }
    });
  };
}(this));