(function (env) {
    "use strict";
    env.ddg_spice_climbing = function(api_result){
        
        // Check that results were returned successfully
        if (!api_result || !api_result.response || api_result.response.numFound === 0) {
            return Spice.failed('climbing');
        }
        var id = 1;
        function normalize(item){
            var meta = JSON.parse(item.meta);
            var myRe = /Number\sof\sRoutes:\s(\d*,?\d+)/;
            var routes = myRe.exec(item.paragraph);
            var normalizedItem = {
                id: id,
                name: item.title,
                subtitle: "Routes: "+routes[1],
                url: meta.url,
                lat: meta.lat,
                lon: meta.lon
            };
            id++;
            return normalizedItem;
        }
        
        // Render the response
       DDG.require('maps', function() {
        Spice.add({
            id: 'climbing',
            name: 'Climb',
            model: 'Place',
            view: 'Places',            
            data: api_result.response.docs,
            meta: {
                primaryText: 'Climbing Spots',
                sourceName: 'thecrag.com',
                sourceUrl: 'thecrag.com'
            },            
            normalize: normalize,            
            templates: {
                group: 'places',
                item: Spice.climbing.item
            }
        });});
    };
}(this));
