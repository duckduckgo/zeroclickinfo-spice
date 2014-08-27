(function(env) {
    "use strict";
    env.ddg_spice_book = function(api_result) {

        // Return if no book is returned
        if(!api_result || api_result.error) {
            return Spice.failed('book');
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

        Spice.add({
            id: 'book',
            name: 'Books',
            data: api_result.books,
            meta: {
                sourceName: "idreambooks.com", // More at ...
                sourceUrl: api_result.books.detail_link
            },

            normalize: function(item) {
                var title = item.title || "";
                var sub_title = item.sub_title || "";
                var author = item.author || "";

                // Check relevancy of the item.
                // 1. Check if we have reviews (rated or unrated is fine).
                // 2. Check if the title + sub_title is relevant to the query.
                // 3. Check if the title is relevant to the query.
                // 4. Check if the title + author is relevant to the query.
                // 5. Check if the title + sub_title + author is relevant to the query.
                if(!((item.review_count || item.unrated_review_count) &&
                    (DDG.stringsRelevant(title + " " + sub_title, decoded_query, [], 3, true) ||
                        DDG.stringsRelevant(title, decoded_query, [], 3, true) ||
                        DDG.stringsRelevant(title + " " + author, decoded_query, [], 3, true) ||
                        DDG.stringsRelevant(title + " " + sub_title + " " + author, decoded_query, [], 3, true)))) {
                    return null;
                }

                // If the item that we got doesn't have the critic_reviews array,
                // we copy over the unrated_reviews. This makes it easier to use the templates because 
                // we're only using one variable.
                if(item.review_count === 0) {
                    item.critic_reviews = item.unrated_critic_reviews;
                    item.review_count = item.unrated_review_count;
                }

                // Get only the year of release date for header 
                item.release_year = (item.release_date || "").match(/^\d{4}/);

                // Filter critic reviews that have really short critic reviews.
                var critic_reviews = [];
                for(var i = 0; i < item.critic_reviews.length; i++) {
                    if(item.critic_reviews[i].snippet.length > 10) {
                        critic_reviews.push(item.critic_reviews[i]);
                    }
                }
                item.critic_reviews = critic_reviews;

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

                var header = item.title = item.title + formatSub(item.sub_title);
                header = Handlebars.helpers.condense(header, {
                    hash: {
                        maxlen: 38
                    }
                });

                // Pick a random critic review out of all the reviews returned
                item.critic_review = item.critic_reviews[Math.floor(Math.random() * item.critic_reviews.length)];

                var infoboxData = [{
                    label: 'Author',
                    value: item.author
                }, {
                    label: 'Genre',
                    value: item.genre
                }, {
                    label: 'Pages',
                    value: item.pages
                }, {
                    label: 'Release Date',
                    value: item.release_date
                }, {
                    label: 'Total Rating',
                    value: item.rating + '%'
                }, {
                    label: 'Reviews',
                    value: item.review_count
                }];

                var a = {
                    title: header,
                    rating: Math.floor(item.rating / 20),
                    image: item.critic_review.smiley_or_sad,
                    description: item.critic_review.snippet,
                    source: item.critic_review.source,
                    reviewLink: item.critic_review.review_link,
                    ratingText: item.review_count + " Reviews",
                    infoboxData: infoboxData
                };
                return a;
            },

            templates: {
                group: 'info',
                options: {
                    description: true,
                    content: Spice.book.book
                }
            }

        });

        Handlebars.registerHelper("Book_prettyDate", function(date) {
            "use strict";

            if(date) {
                return DDG.getDateFromString(date);
            }
        });
    }
}(this));