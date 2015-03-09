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
                
                boxData.push({
                    label: "Author: " + item.author.name
                });
 
                boxData.push({
                    label: "Project Homepage: " + item.homepage
                });

                boxData.push({
                    label: "Repository: " + item.repository.url
                });

                var dependencies = $.map(item.dependencies, function(val, key) {
                    return key + " (" + val + ")";
                }).join(", ");

                boxData.push({
                    label: "Dependencies: " + dependencies
                });

                return {
                    title: item.name + " " + item.version,
                    subtitle: item.description,
                    infoboxData: boxData,
                    dependency: dependencies
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
