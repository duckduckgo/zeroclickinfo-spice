(function (env) {
    "use strict";
    
    env.ddg_spice_encyclopedia_of_life_search = function (api_result) {
        if (!api_result) {
            return Spice.failed('encyclopedia_of_life_search');
        }
        
        var results = api_result.results.splice(0,15);
        
        // Set the global configs to synchronous 
        $.ajaxSetup({
            async: false
        });
        
        Spice.add ({
            id: "encyclopedia_of_life",
            name: "Encyclopedia of Life",
            data: results,
            meta: {
                sourceName: "Encyclopedia of Life",
                sourceUrl: "http://eol.org/"
            },
            templates: {
                group: "media"
            },
            normalize: function (item) {
                var image_url;
                var common_name;
                var description;
                
                //Get more details about the species
                $.getJSON('/js/spice/encyclopedia_of_life/details/' + item.id, function(data) {
                    //Get image and description
                    for (var i in data.dataObjects) {
                        var obj = data.dataObjects[i];
                        if (obj.dataType == "http://purl.org/dc/dcmitype/Text") { //Get description
                            description = obj.description;
                        } else if (obj.dataType == "http://purl.org/dc/dcmitype/StillImage") { //Get image
                            image_url = obj.eolMediaURL;
                        }
                    }
                    
                    //Get common name
                    for (var i in data.vernacularNames) {
                        var name = data.vernacularNames[i];
                        if (name.language == "en" && name.eol_preferred == true) { //TODO check for correct language
                            common_name = name.vernacularName;
                        }
                    }
                });
                
                //Check if necessary data is available
                if (!image_url || !description || description.length < 170) {
                    return null;
                }
                
                //Return data for display
                return {
                    title: common_name,
                    url: item.link,
                    image: image_url,
                    img: image_url,
                    img_m: image_url,
                    heading: common_name,
                    abstract: description
                };   
            }
        })
    }
}(this));