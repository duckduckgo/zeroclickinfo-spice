(function (env) {
    "use strict";
    env.ddg_spice_cargo = function(api_result){

        if (!api_result || !api_result.crate) {
            return Spice.failed('cargo');
        }
        var crate = api_result.crate;
        
        Spice.add({
            id: "cargo",
            name: "Software",
            data: crate,
            meta: {
                sourceName: "Cargo",
                sourceUrl: 'https://crates.io/crates/' + crate.name
            },
            normalize: function(item) {
                var boxData = [{heading: 'Package Information:'}];
                
                if (item.max_version) {
                    var value = item.max_version;
                    if (api_result.versions[0].yanked) {
                        value += " (yanked)";
                    }
                    boxData.push({
                        label: "Latest Version",
                        value: value
                    });
                }

                if (item.homepage) {
                    boxData.push({
                        label: "Project Homepage",
                        value: item.homepage
                    });
                }
                
                if (item.documentation) {
                    boxData.push({
                        label: "Documentation",
                        value: item.documentation
                    });
                }
                
                if (item.license) {
                    boxData.push({
                        label: "License",
                        value: item.license
                    });
                }

                if (item.repository) {
                    boxData.push({
                        label: "Repository",
                        value: item.repository
                    });
                }

                if (item.keywords && item.keywords.length > 0) {      
                    var keywords = item.keywords.join(", ");

                    boxData.push({
                        label: "Keywords",
                        value: keywords
                    });
                }
 
                return {
                    title: item.name + " " + item.max_version,
                    subtitle: item.description,
                    infoboxData: boxData,
                }  
            },

            templates: {
                group: 'text',
                options: {
                    content: Spice.cargo.content,
                    moreAt: true
                }
            }
        });
    };
}(this));
