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
                sourceUrl: 'https://haveibeenpwned.com/api/v2/breachedaccount/'
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
                    return {
                        title: item.Name,
                        subtitle: item.Description,
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





