function ddg_spice_bootic (api_result) {
    "use strict";

    // check for response
    if ($.isEmptyObject(api_result.products)) {
        return;
    }

    var query = (api_result.input_query ) ?
        '?initial=1&q=' + encodeURIComponent( api_result.input_query ) :
        '';

    // Create an array from the object.
    // The Bootic API gives us a `products` object which contains everything,
    // but it's not sorted in any order. We use the `sorted` array for that.
    var result = [];
    for(var i = 0; i < api_result.sorted.length; i++) {
	result.push(api_result.products[api_result.sorted[i]]);
    }

    Spice.add({
        data             : result,
        sourceName      : 'Bootic',
        id       : "bootic",
        sourceUrl       : 'http://www.bootic.com/?q=' + query,
        templates: {
            item: Spice.bootic.bootic
        }
    });
}

// Forms the url for a bootic product image
Handlebars.registerHelper ('bootic_picture', function() {
    "use strict";

    console.log(this);

    var pic_id = this.pictures[0],
        url = pic_id.replace(/\d+x\d+/, "60x80");

    return url;
});
