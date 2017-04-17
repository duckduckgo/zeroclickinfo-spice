(function (env) {
    "use strict";
    env.ddg_spice_drupal = function(api_result){

        // Validate the response
        if (!api_result || api_result.list.length === 0) {
            return Spice.failed('drupal_search');
        }

        // Render the response
        Spice.add({
            id: "drupal_search",
            name: "Software",
            data: api_result.list[0],
            meta: {
                sourceName: "Drupal.org",
                sourceUrl: 'https://www.drupal.org/project/' + api_result.list[0].field_project_machine_name 
            },
            normalize: function(item) {
                var boxData = [{heading: 'Project Information:'}];

                if (DDG.getProperty(item, 'field_project_homepage.url') !== undefined) {
                    boxData.push({
                        label: "Homepage",
                        value: item.field_project_homepage.url
                    });
                }

                if (DDG.getProperty(item, 'field_project_documentation.url') !== undefined) {
                    boxData.push({
                        label: "Documentation",
                        value: item.field_project_documentation.url
                    });
                }

                if (DDG.getProperty(item, 'field_project_license.url') !== undefined) {
                    boxData.push({
                        label: "License",
                        value: item.field_project_license.url
                    });
                }

                if (item.field_download_count !== null) {
                    boxData.push({
                        label: "Downloads",
                        value: DDG.commifyNumber(item.field_download_count)
                    });
                }

                if (item.language !== "und") {
                    boxData.push({
                        label: "Language",
                        value: item.language 
                    });
                }
                
                var regex = /(<p>)(.*)(<\/p>)/m;
                
                if (item.body.summary) {
                    var subtitleData = DDG.strip_html(item.body.summary.match(regex)[0]);
                } else {
                    var subtitleData = DDG.strip_html(item.body.value.match(regex)[0]);
                }

                return {
                    title: item.title + " (" + item.type.substring(8) + ")",
                    subtitle: subtitleData,
                    infoboxData: boxData
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
