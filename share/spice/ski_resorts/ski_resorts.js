(function (env) {
    "use strict";
    env.ddg_spice_ski_resorts = function(api_result) {

        // Validate the response (customize for your Spice)
        if (!api_result || api_result.error) {
            return Spice.failed('ski_resorts');
        }

            Spice.add({
                id: "ski_resorts",
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
                    var resortInfo = {
                        Country: data.countryName
                    };
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
                },
                meta: {
                  sourceName: 'Piste.io',
                  sourceUrl: 'http://www.piste.io/' + api_result.name
                },
            });

    };
}(this));
