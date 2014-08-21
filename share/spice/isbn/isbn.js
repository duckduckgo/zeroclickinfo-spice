(function (env) {
    "use strict";
    env.ddg_spice_isbn = function (api_result) {

        if (!api_result || api_result.error) { 
            return Spice.failed('isbn'); 
        }

        Spice.add({
            id: 'isbn',
            name: 'Book',
            data: api_result.results[0],
            signal: 'high',

            meta: {
                itemType: 'Book',
                sourceName: 'Amazon',
                sourceUrl: api_result.results[0].url
            },
            
            normalize: function (item) {
                var heading = /(.*)(?:\s\((.*)\))?\s\(Book\)/.exec(DDG.getProperty(item, "heading")),
                    book_title = heading[1];

                // Example: item.heading = "So Long, and Thanks for All the Fish (Hitch-Hikers Guide to the Galaxy, No. 4) (Book)"
                // "So Long, and Thanks for All the Fish" ... group 1
                // "Hitch-Hikers Guide to the Galaxy, No. 4" ... group 2 (not used as of now) ... group 2 can also be absent, for example in "Fahrenheit 451: A Novel (Book)"
                // "(Book)" is discarded

                var metadata = /.*\s\((.+),\s(\d+)pgs?\)\s*released\s*(\d{4})/.exec(DDG.getProperty(item, "abstract")),
                    publisher = metadata[1],
                    pages = metadata[2],
                    year = metadata[3];

                // Example: item.abstract = "Fahrenheit 451: A Novel is a book by Ray Bradbury (Simon & Schuster, 208pgs)  released 2003-09-23."
                // "Simon & Schuster" ... group 1
                // "208" ... group 2
                // "2003" ... group 3
                
                return {
                    relevancy: {
                        primary: [  // don't display answer if any of the required properties is absent
                            { required: 'heading'},
                            { required: 'brand'} // author
                        ]
                    },

                    heading         :   book_title + "(" + (DDG.getProperty(item, "brand")) + ")", // Book Title (Author)
                    publisher       :   publisher,
                    pages           :   pages,
                    year            :   year
                    // img_m, img, url, abstract automatically set by template
                };
            },

            templates: {
                group: 'media',
                options: {
                    subtitle_content: Spice.isbn.subtitle_content,
                    ratingText: false
                }
            }
        });
    };
}(this));
