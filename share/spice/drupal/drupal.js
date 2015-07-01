(function (env) {
    "use strict";
    env.ddg_spice_drupal = function(api_result){

        // Validate the response
        if (!api_result || api_result.list == "") {
            return Spice.failed('drupal');
        }

        // Render the response
        Spice.add({
            id: "drupal",
            name: "Software",
            data: api_result.list[0],
            meta: {
                sourceName: "Drupal.org",
                sourceUrl: 'https://www.drupal.org/project/' + api_result.list[0].field_project_machine_name 
            },
            normalize: function(item) {
                var boxData = [{heading: 'Project Information:'}];

                if (item.field_project_homepage.url) {
                    boxData.push({
                        label: "Homepage",
                        value: item.field_project_homepage.url
                    });
                }

                if (item.field_project_documentation.url) {
                    boxData.push({
                        label: "Documentation",
                        value: item.field_project_documentation.url
                    });
                }

                if (item.field_project_license.url) {
                    boxData.push({
                        label: "License",
                        value: item.field_project_license.url
                    });
                }

                if (item.field_download_count) {
                    boxData.push({
                        label: "Downloads",
                        value: item.field_download_count
                    });
                }

                if (item.language != "und") {
                    boxData.push({
                        label: "Language",
                        value: item.language 
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

                if (item.body.summary) {
                    var subtitleData = $(item.body.summary).siblings('p:first-of-type').text();
                } else {
                    var subtitleData = $(item.body.value).siblings('p:first-of-type').text();
                }

                return {
                    title: item.title + " (" + item.type.substring(8) + ")",
                    subtitle: subtitleData,
                    infoboxData: boxData,
                }  

            },
            templates: {
                group: 'text',
                options: {
                    moreAt: true
                }
            }
        });
    };
}(this));
