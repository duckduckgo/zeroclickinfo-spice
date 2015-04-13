(function (env) {
    "use strict";
    env.ddg_spice_climbing = function(api_result){
        
        // Check that results were returned successfully
        if (!api_result || !api_result.response || api_result.response.numFound === 0) {
            return Spice.failed('climbing');
        }

        var data = api_result.response.docs;
        var max = 0.0;

        for(var i = 0; i < data.length; i++ ){
            data[i].meta = JSON.parse(data[i].meta);
            var myRe = /Number\sof\sRoutes:\s(\d*,?\d+)/;
            var route_num = myRe.exec(data[i].paragraph);
            route_num[1] = route_num[1].replace(',','');
            
            data[i].routes = +route_num[1];

            if(data[i].routes > max){
                max = data[i].routes
            }
        }

        for(var i = 0; i < data.length; i++ ){
            if(data[i].routes < max/12){
                data[i].title = null;
            }
        }

        var id = 1;
        function normalize(item){
            var normalizedItem = {
                id: id,
                name: item.title,
                routes: "Routes: "+item.routes,
                url: item.meta.url,
                lat: item.meta.lat,
                lon: item.meta.lon
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
            data: data,
            meta: {
                primaryText: 'Climbing Spots',
                sourceName: 'thecrag.com',
                sourceUrl: 'thecrag.com'
            },            
            normalize: normalize,
            relevancy: {
                primary: [{required: "title"}]
            },
            templates: {
                group: 'places',
                item: Spice.climbing.item,
            }
        });});
    };
}(this));
