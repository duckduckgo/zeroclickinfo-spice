(function (env) {
    "use strict";
    env.ddg_spice_pwned = function(api_result){
        if (!api_result || api_result.error) {
            return Spice.failed('pwned');
        }

        Spice.add({
            id: "pwned",
            name: "Pwned",
            data: api_result,
            meta: {
                sourceName: "Have I Been Pwned",
                sourceUrl: 'https://haveibeenpwned.com/'
            },
            normalize: function(item) {

                if (item.fallback) {
                    return {
                        title: item.fallback,
                    }
                } else {
                    var boxData = [{heading: 'Account Information:'}];
                    if (item.Title) {
                        boxData.push({
                            label: "Title",
                            value: item.Title
                        });
                    }
                    if (item.Name) {
                        boxData.push({
                            label: "Name",
                            value: item.Name,
                        });
                    }
                    if (item.Domain) {
                        boxData.push({
                            label: "Domain",
                            value: item.Domain
                        });
                    }
                    if (item.DataClasses) {
                        boxData.push({
                            label: "Exposed Information: ",
                            value: item.DataClasses.join(", ")
                        });
                    }
                    return {
                        title: item.Name,
                        description: DDG.strip_html(item.Description),
                        subtitle: item.DataClasses.join(", "),
                        infoboxData: boxData,
                    }
                }
            },
            templates: {
                group: 'text'
            }
        });
    };
}(this));





