(function(env) {
    "use strict";

    env.ddg_spice_bootic = function(api_result) {
	if($.isEmptyObject(api_result.products)) {
	    return;
	}

	var query = api_result.input_query ? 
	    '?initial=1&q=' + encodeURIComponent(api_result.input_query) : '';

	var result = [];
	for(var i = 0; i < api_result.sorted.length; i++) {
	    result.push(api_result.products[api_result.sorted[i]]);
	}

	Spice.add({
	    id: 'bootic',
	    name: 'Bootic',
	    data: result,
	    meta: {
		sourceName: 'Bootic',
		sourceUrl: 'http://www.bootic.com/?q=' + query,
		sourceIcon: true,
		itemType: "Bootic " + query
	    },
	    normalize: function(o) {
		var picture = o.pictures[0];
		picture.replace(/_pictures\/\d+x\d+/, "_pictures/200x300");
		picture = "http://static.bootic.com/_pictures/" + picture;

		return {
		    parentId: o.id,
		    url: "http://bootic.com" + o.url,
		    img: picture,
		    title: o.name,
		    heading: o.name,
		    brand: o.shop_name,
		    price: "$" + o.price
		};
	    },
	    templates: {
		item: 'products_item'
	    }
	});
    };
}(this));

// function ddg_spice_bootic (api_result) {
//     "use strict";

//     // check for response
//     if ($.isEmptyObject(api_result.products)) {
//         return;
//     }

//     var query = (api_result.input_query ) ?
//         '?initial=1&q=' + encodeURIComponent( api_result.input_query ) :
//         '';

//     // Create an array from the object.
//     // The Bootic API gives us a `products` object which contains everything,
//     // but it's not sorted in any order. We use the `sorted` array for that.
//     var result = [];
//     for(var i = 0; i < api_result.sorted.length; i++) {
// 	result.push(api_result.products[api_result.sorted[i]]);
//     }

//     Spice.add({
//         data             : result,
//         sourceName      : 'Bootic',
//         id       : "bootic",
//         sourceUrl       : 'http://www.bootic.com/?q=' + query,
//         templates: {
//             item: Spice.bootic.bootic
//         }
//     });
// }

// // Forms the url for a bootic product image
// Handlebars.registerHelper ('bootic_picture', function() {
//     "use strict";

//     console.log(this);

//     var pic_id = this.pictures[0],
//         url = pic_id.replace(/\d+x\d+/, "60x80");

//     return url;
// });
