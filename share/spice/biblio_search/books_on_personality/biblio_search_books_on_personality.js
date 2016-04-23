(function(env) {
  "use strict";

  env.ddg_spice_biblio_search_books_on_personality = function(api_result) {
    console.info(api_result);
    
    String.prototype.trunc = String.prototype.trunc ||
      function(n){
          return (this.length > n) ? this.substr(0,n-1)+'&hellip;' : this;
      };
    
    // Validating response
    if(!api_result || api_result.GoodreadsResponse.search["total-results"].text == "0") {
      return Spice.failed('biblio_search_books_by_authors');
    }
    
    var personality = api_result.GoodreadsResponse.search.query.text,
      source_url = "https://www.goodreads.com/search?q=" + personality + "&search_type=books";
    
    var get_details_uri = '/js/spice/biblio_search/get_book_details/',
      get_image_for_book_uri = '/js/spice/biblio_search/get_image_for_book/';
    
    // Render the response
    Spice.add({
      id: "biblio_search_books_on_personality",
      
      // Customize these properties
      name: "Books",
      data: api_result.GoodreadsResponse.search.results.work,
      meta: {
        primaryText: "Books on " + personality,
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
            console.info("image_object:\n");
            console.info(image_object);
            item['img_m'] = image_object.results[0].img_m || item['img_m'];
          });
        });
      },
      normalize: function(item) {
        return {
          url: "https://www.goodreads.com/book/show/" + item.best_book.id.text,
          title: item.best_book.title.text,
          image: item.best_book.image_url.text,
          img_m: item.best_book.image_url.text,
          rating: parseFloat(item.average_rating.text),
          ratingText: item.average_rating.text,
          brand: item.best_book.author.name.text,
          reviewCount: item.text_reviews_count && parseInt(item.text_reviews_count.text) || "Not Found"
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
          subtitle_content: Spice.biblio_search.subtitle_content
        },
        variants: {
          tile: 'poster'
        }
      }
    });
  };
}(this));