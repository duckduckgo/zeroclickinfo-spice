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
                sourceName: "iDreamBooks", // More at ...
                sourceUrl: api_result.books[0].detail_link
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
                    (DDG.stringsRelevant(title + " " + sub_title, decoded_query, [], 3) ||
                        DDG.stringsRelevant(title, decoded_query, [], 3) ||
                        DDG.stringsRelevant(title + " " + author, decoded_query, [], 3) ||
                        DDG.stringsRelevant(title + " " + sub_title + " " + author, decoded_query, [], 3)))) {
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

                // Get three critics which recommend the book
                var recommendedBy = [];
                for(var key in item.critic_reviews) {
                    if(item.critic_reviews[key].pos_or_neg == "Positive" && recommendedBy.length < 3) {
                        recommendedBy.push({
                            'recommendedSource' : item.critic_reviews[key].source,
                            'link' : item.critic_reviews[key].review_link
                        });
                    }
                    else if (recommendedBy.length >= 3) {
                        break;
                    }
                }

                var header = item.title = item.title + formatSub(item.sub_title);
                header = Handlebars.helpers.condense(header, {
                    hash: {
                        maxlen: 38
                    }
                });

                // Pick a random critic review out of all the reviews returned
                item.critic_review = item.critic_reviews[Math.floor(Math.random() * item.critic_reviews.length)];

                return {
                    title: header,
                    image: item.to_read_or_not,
                    description: item.critic_review.snippet.replace(/\.\s\.\s\./g, "..."),
                    url: item.detail_link,
                    source: item.critic_review.source,
                    sourceLink: item.critic_review.review_link,
                    recommendedBy: recommendedBy,
                    rating: item.rating
                };
            },

            templates: {
                group: 'info',
                options: {
                    description: true,
                    content: Spice.book.book
                }
            }

        });
    }
}(this));
