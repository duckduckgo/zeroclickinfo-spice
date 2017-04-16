(function (env) {
    "use strict";
    env.ddg_spice_malayalam_dictionary_easware_apps = function(api_result){

        // Validate the response (customize for your Spice)
        if (!api_result || api_result.error) {
            return Spice.failed('malayalam_dictionary_easware_apps');
        }

        // Render the response
        Spice.add({
            id: "malayalam_dictionary_easware_apps",

            // Customize these properties
            name: "Malayalam Dictionary",
            data: api_result,
            meta: {
                sourceName: "Olam",
                sourceUrl: 'http://olam.in/Dictionary/?action=en_ml&q=' + api_result[0].word
            },normalize: function(item) {
                    var meanings = [];
                    var limit = 5;
                    //limiting meanings to 5 and remove last entry in defenitions (link to website)
                    var display = (item.definitions.length-1 > limit)?limit:item.definitions.length-1;
                    for(var i=0;i<display;i++){
                        meanings.push(item.definitions[i])
                    }
                    
                    return{
                            title : item.word,
                            meanings : meanings
                    };
            },        
            templates: {
                group: 'base',
                options: {
                    content: Spice.malayalam_dictionary_easware_apps.content
                }
            }
        });
    };
}(this));
