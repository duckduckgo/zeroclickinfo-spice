(function (env) {
    "use strict";
    env.ddg_spice_cargo = function(api_result){

        if (!api_result || api_result.error || api_result.length < 1) {
            return Spice.failed('cargo');
        }

        Spice.add({
            id: "cargo",
            name: "Software",
            data: api_result.crates,
            meta: {
                sourceName: "cargo",
                sourceUrl: 'https://crates.io/crates/' + api_result.name
            },
            normalize: function(item) {
                var boxData = [{heading: 'Package Information:'}];
                
                if (item.max_version) {
                    boxData.push({
                        label: "Latest Version",
                        value: item.max_version
                    });
                }

                if (item.homepage) {
                    boxData.push({
                        label: "Project Homepage",
                        value: item.homepage
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

                if (item.keywords) {      
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
