(function (env) {
    "use strict";
    env.ddg_spice_npm = function(api_result){

        if (!api_result || api_result.error) {
            return Spice.failed('npm');
        }

        Spice.add({
            id: "npm",
            name: "Software",
            data: api_result,
            meta: {
                sourceName: "npmjs",
                sourceUrl: 'http://npmjs.org/package/' + api_result.name
            },
            normalize: function(item) {
                var boxData = [{heading: 'Package Information:'}];
                
                if (item.author) {
                    boxData.push({
                        label: "Author",
                        value: item.author.name
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
                        value: item.repository.url
                    });
                }
                
                if (item.engines) {
                    boxData.push({
                        label: "Engines",
                        value: item.engines.node
                    });
                }
                
                if (item.dist) {
                    boxData.push({
                        label: "Source",
                        value: item.dist.tarball
                    });
                }

                if (item.dependencies) {      
                    var dependencies = $.map(item.dependencies, function(val, key) {
                        return key + " (" + val + ")";
                    }).join(", ");

                    boxData.push({
                        label: "Dependencies",
                        value: dependencies
                    });
                }
 
                return {
                    title: item.name + " " + item.version,
                    subtitle: item.description,
                    infoboxData: boxData,
                }  
            },

            templates: {
                group: 'text',
                options: {
                    content: Spice.npm.content,
                    moreAt: true
                }
            }
        });
    };
}(this));
