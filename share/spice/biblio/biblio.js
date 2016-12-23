(function (env) {
    "use strict";

   var getPrice = function(currencyCode, price) {
        if (currencyCode == "USD") {
            return "$" + price;
        } else {
            return price + " " + currencyCode;
        }
    }

    env.ddg_spice_biblio = function(api_result) {

        // Validate the response (customize for your Spice)
        if (!api_result || api_result.error || api_results.data.meta.number_found == 0) {
            return Spice.failed('biblio');
        }

	var endpoint =(
		'http://www.biblio.com/search.php?aid=ddg&photo=true&keyword=' + api_result.data.meta.fulltext.replace(" ", "+")
	);

        // Render the response
        Spice.add({
            id: 'biblio',

            // Customize these properties
            name: 'bilbio',
            data: api_result.data.results,
            meta: {
                sourceName: 'Biblio.com',
		sourceUrl: endpoint,
		sourceTerm: api_result.data.meta.fulltext,
            },
            normalize: function(item) {
                return {
                    // customize as needed for your chosen template
                    heading: item.title +" by "+ item.author,
		    brand: item.publisher,
		    url: item.canonical_book_link
                    subtitle: item.subtitle,
                    image: item.photo,
		    price: getPrice(item.currency,item.price),
		    
            },
            templates: {
                group: 'products',
                options: {
                    content: Spice.biblio.content,
                    moreAt: true
                }
            }
        });
    };
}(this));
