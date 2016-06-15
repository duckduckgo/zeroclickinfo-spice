(function (env) {
    "use strict";
    env.ddg_spice_pwned = function(api_result){
        if (!api_result || api_result.error) {
            return Spice.failed('pwned');
        }

        var query = DDG.get_query(),
            re    = /\b([a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,})\b/i, //capture email from query
            email = re.exec(query)[1],
            url   = 'https://haveibeenpwned.com/account/' + email;

        DDG.require("moment.js", function(){
            Spice.add({
                id: "pwned",
                name: "Pwned",
                data: api_result,
                meta: {
                    sourceName: "Have I Been Pwned",
                    sourceUrl: url,
                    primaryText: email + " is compromised:",
                    snippetChars: 140
                },
                normalize: function(item) {

                    if (item.fallback) {
                        return {
                            title: item.fallback
                        };
                    } else {
                        return {
                            title: item.Name,
                            altSubtitle: item.Domain,
                            date: moment(item.BreachDate).format("MMM DD, YYYY"),
                            description: DDG.strip_html(item.Description).replace(/&quot;/g, "\""),
                            url: url
                        };
                    }
                },
                templates: {
                    group: 'icon',
                    item_detail: false,
                    detail: false,
                    variants: {
                        tileTitle: "1line-large",
                        tileSnippet: "large"
                    },
                    options: {
                        footer: Spice.pwned.footer
                    }
                },
                relevancy: {
                    type: api_result.fallback ? null : "primary", // detect when api returned error
                    primary: [
                        {required: 'Title'},
                        {required: 'Name'},
                        {required: 'Domain'},
                        {required: 'DataClasses'}
                    ]
                }
            });
        });
    };
}(this));
