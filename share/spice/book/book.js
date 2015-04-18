(function(env) {
    "use strict";
    env.ddg_spice_book = function(api_result) {

        // Return if no book is returned
        if(!api_result || api_result.total_results === 0) {
            return Spice.failed('book');
        }

        // Get the query without the trigger words.
        var script = $('[src*="/js/spice/book/"]')[0],
            source = $(script).attr("src"),
            query = source.match(/book\/([^\/]+)/)[1],
            decoded_query = decodeURIComponent(query);

        Spice.add({
            id: 'book',
            name: 'Books',
            data: api_result.books,
            meta: {
                sourceName: "iDreamBooks",
                sourceUrl: api_result.books[0].detail_link
            },

            normalize: function(item) {
                var title = item.title || "",
                    sub_title = item.sub_title || "",
                    author = item.author || "",
                    recommendedBy = [],
                    critic_reviews = [];
           
                // Check relevancy of the item.
                // 1. Check if we have reviews (rated or unrated is fine).
                // 2. Check if the title + sub_title is relevant to the query.
                // 3. Check if the title is relevant to the query.
                // 4. Check if the title + author is relevant to the query.
                // 5. Check if the title + sub_title + author is relevant to the query.
                if(!((item.review_count || item.total_results) &&
                    (DDG.stringsRelevant(title + " " + sub_title, decoded_query, [], 3) ||
                        DDG.stringsRelevant(title, decoded_query, [], 3) ||
                        DDG.stringsRelevant(title + " " + author, decoded_query, [], 3) ||
                        DDG.stringsRelevant(title + " " + sub_title + " " + author, decoded_query, [], 3)))) {
                    return Spice.failed('book');
                }

                // Add subtile next to title
                // Add colon if the subtitle does not begin with parenthesis
                if (item.sub_title) { 
                   item.title += sub_title.match(/^[a-z0-9]/i) ? ": " + item.sub_title : " " + item.sub_title;
                }
                 
                for(var i = 0; i < item.critic_reviews.length; i++) {
                    // Get critics which recommend the book
                    // We only want positive reviews    
                    if (item.critic_reviews[i].pos_or_neg == "Positive") {
                       recommendedBy.push(item.critic_reviews[i]);
                    }
                    
                    // Filter critic reviews that are really short
                    if(item.critic_reviews[i].snippet.length > 52) {
                       critic_reviews.push(item.critic_reviews[i]);
                    }
                }

                // Shuffle the array
                // Ensure we only use 3 sources
                recommendedBy.sort(function(){return (4*Math.random()>2)?1:-1});
                if (recommendedBy.length > 3) recommendedBy.length = 3;
                
                // Pick a random critic review out of all the reviews returned
                item.critic_review = critic_reviews[Math.floor(Math.random() * critic_reviews.length)];
                
                return {
                    image_url: item.to_read_or_not,
                    description: item.critic_review.snippet,
                    url: item.detail_link,
                    source: item.critic_review.source,
                    sourceLink: item.critic_review.review_link,
                    recommendedBy: recommendedBy,
                    rating: item.rating
                };
            },

            templates: {
                group: 'text',
                options: {
                    moreAt: true,
                    content: Spice.book.content,
                    subtitle_content: Spice.book.subtitle
                }
            }

        });
    }
}(this));
