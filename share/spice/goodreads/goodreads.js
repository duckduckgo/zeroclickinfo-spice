(function (env) {
    "use strict";

    env.ddg_spice_goodreads = function (api_result) {

        // Validating response
        if (!api_result || api_result.GoodreadsResponse.search["total-results"].text == "0") {
            return Spice.failed('goodreads');
        }
        
        var book_details_uri = '/js/spice/goodreads_book_details/',
            book_image_uri = '/js/spice/goodreads_book_image/';

        $.ajaxSetup({
            cache: true
        });

        // Render the response
        Spice.add({
            id: 'goodreads',
            name: 'Books',
            data: api_result.GoodreadsResponse.search.results.work,
            meta: {
                searchTerm: api_result.GoodreadsResponse.search.query.text,
                itemType: 'Goodreads',
                sourceUrl: "http://www.goodreads.com/",
                sourceName: 'Goodreads',
                rerender: [
                    'abstract',
                    'heading',
                    'img_m',
                    'img'
                ]
            },

            normalize: function (item) {
                var book = item.best_book;

                return {
                    url: "https://www.goodreads.com/book/show/" + book.id.text,
                    title: book.title.text,
                    heading: book.title.text,
                    img: book.image_url.text,
                    img_m: book.image_url.text,
                    rating: parseFloat(item.average_rating.text),
                    ratingText: item.average_rating.text,
                    brand: book.author.name.text,
                    reviewCount: parseInt(item.text_reviews_count.text),
                    yop: item.original_publication_year.text,
                    reviews_count: item.text_reviews_count.text,
                    author: book.author.name.text,
                    link_to_reviews: "https://www.goodreads.com/book/show/" + book.id.text + "#other_reviews",
                    link_to_author: "https://www.goodreads.com/author/show/" + book.author.id.text
                };
            },

            onItemShown: function (item) {

                var book = item.best_book;

                $.getJSON(book_details_uri + book.id.text, function (data) {
                    var book = data.GoodreadsResponse.book;
                    var description = book.description.text || "Description unavailable";

                    item.set({
                        abstract: description && Handlebars.helpers.ellipsis(description.replace(/<\/?\w*>/gm, ''), 400),
                        num_pages: book.num_pages.text
                    });

                    if (book.isbn13 && book.isbn13.text) {
                        $.getJSON(book_image_uri + book.isbn13.text, function (image_object) {
                            item.set({
                                img_m: image_object.results[0].img_m
                            });
                        });
                    }

                });
            },

            templates: {
                group: "products",
                options: {
                    rating: true,
                    brand: true,
                    moreAt: true,
                    ratingtext: true,
                    subtitle_content: Spice.goodreads.subtitle,
                    buy: Spice.goodreads.buy
                },
                variants: {
                    tile: 'poster'
                }
            }
        });
    };
}(this));
