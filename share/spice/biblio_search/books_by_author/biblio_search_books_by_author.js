(function(env) {
  "use strict";

  env.ddg_spice_biblio_search_books_by_author = function(api_result) {
    console.info(api_result);
    
    String.prototype.trunc = String.prototype.trunc ||
      function(n){
          return (this.length > n) ? this.substr(0,n-1)+'&hellip;' : this;
      };

    // Validating response
    if(!api_result || api_result.GoodreadsResponse.search["total-results"].text == "0") {
      return Spice.failed('biblio_search_books_by_authors');
    }
    var author_name = api_result.GoodreadsResponse.search.query.text,
      source_url = "https://www.goodreads.com/search?utf8=✓&q=" + author_name + "&search_type=books&search%5Bfield%5D=author";
    
    var get_details_uri = '/js/spice/biblio_search/get_book_details/',
      get_image_for_book_uri = '/js/spice/biblio_search/get_image_for_book/';
    
    // Render the response
    Spice.add({
      id: "biblio_search_books_by_authors",
      // Customize these properties
      name: "Books",
      data: api_result.GoodreadsResponse.search.results.work,
      meta: {
        primaryText: "Books by " + author_name,
        sourceName: "GoodReads",
        sourceUrl: source_url
      },
      onItemShown: function(item) {
        $.ajaxSetup({ cache: true });
        
        // Good reads description API
        $.getJSON(get_details_uri + item.best_book.id.text, function(data) {
          console.info(data);
          
          var description = data.GoodreadsResponse.book.description.text || "-- No Description Found --";
          
          // The desciption might contain some html tags. Removing those...
          item['abstract'] = description && description.replace(/<\/?\w*>/gm, '').trunc(400);
          item['heading'] = item.best_book.title.text;
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
//           subtitle_content: DDH.biblio_search.subtitle_content
        },
        /*
              group: "info",
              item_detail: "products_item_detail",//"media_item_detail",
              options: {
                  content: Spice.biblio_search_books_by_author.content,
                  moreAt: true
              }*/
        variants: {
          tile: 'poster'
        }
      }
    });
  };
}(this));