(function (env) {
    "use strict";
    env.ddg_spice_ski_resorts = function(api_result) {

        // Validate the response (customize for your Spice)
        if (!api_result || api_result.error) {
            return Spice.failed('ski_resorts');
        }
    
            Spice.add({
                id: api_result.name,
                name: "Ski Resort",
                templates: {
                    group: 'list',
                    options:{
                        moreAt: true,
                        content: 'record',
                        keySpacing: true
                    }
                },
                data: api_result,
                normalize: function(data){
                    // Display number of runs and highest point
                    var resortInfo = {};
                    var difficulties = ['novice', 'easy', 'intermediate', 'advanced', 'expert'];
                    difficulties.forEach( function ( difficulty ) {
                        var count = data.difficulties[difficulty];
                        if ( count ) {
                            resortInfo[difficulty + " run" + ( count > 1 ? "s" : "" )] = count + "";
                        }
                    } );
                    if ( data.highest_point ) {
                        resortInfo["Highest point"] = data.highest_point.name + 
                                                      " (" + data.highest_point.ele + "m)";
                    }
                    
                    return {
                      'record_data': resortInfo
                    }
                    
                    
//                     return {
//                         id: data.name,
//                         name: data.title + ' - ski resort in ' + data.countryName,
//                         url: 'http://www.piste.io/' + data.name,
//                         image: 'http://www.piste.io/preview/' + data.name + '.jpg',
//                         ratingImageURL: 'http://www.piste.io/favicon.ico',
//                         // It seems `address` is needed, for the template 
//                         // to render `address_lines`. The text is then made
//                         // into a link to Bing maps, with the `address` value
//                         address: data.title + ' ski resort',
//                         address_lines: resortInfo
//                     }
                }
            });

    };
}(this));
