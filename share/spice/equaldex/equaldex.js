(function (env) {
    "use strict";
    env.ddg_spice_equaldex = function(api_result){

        if (!api_result || api_result.error || !DDG.getProperty(api_result, 'regions.region')) {
            return Spice.failed('equaldex');
        }
        
        // Data is stored in region object
        api_result = api_result.regions.region;
        
        Spice.add({
            id: "equaldex",
            name: "Equaldex",
            data: api_result,
            meta: {
                sourceName: "equaldex.com",
                sourceUrl: api_result.url
            },
            normalize: function(item) {    
               
                var templateData = {
                    title: api_result.name,
                    subtitle: "LGBT Rights in " + api_result.name,
                    record_data: {}
                };
                
                for (var issueKey in  item.issues) {
                    var issueLabel = DDG.getProperty(item.issues[issueKey], "label_short");
                    var issueStatus = DDG.getProperty(item.issues[issueKey], "current_status.value_formatted");
                    if(issueLabel && issueStatus && issueStatus !== "N/A") {
                        templateData.record_data[issueLabel] = issueStatus;
                    }
                }
                return templateData;
            },
            templates: {
                group: 'list',
                options: {
                    moreAt: true,
                    content: 'record'
                }
            }
        });
    };
}(this));
