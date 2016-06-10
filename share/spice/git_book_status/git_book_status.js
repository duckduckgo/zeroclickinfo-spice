(function (env) {
    "use strict";
    env.ddg_spice_git_book_status = function(api_result) {

        if (!api_result) {
            return Spice.failed('git_book_status');
        }
        var dataDetails = {
            status: api_result.status.indicator,
            description: api_result.status.description
        }

        Spice.add({
            id: "git_book_status",
            name: "Answer",
            data: dataDetails,
            meta: {
                sourceName: api_result.page.name,
                sourceUrl: api_result.page.url
            },
            templates: {
                group: 'base',
                options: {
                    content: Spice.git_book_status.content,
                    moreAt: true
                }
            }
        });
    }

    Spice.registerHelper("GitbookStatus_indicator", function(string1, string2, options) {
       return ((string1 == string2) ? options.fn(this) : options.inverse(this)); 
    });

    Spice.registerHelper("GitbookStatus_ifNotEmpty", function(string, options) {
        return ((typeof(string) !== "undefined" && string !== '') ? options.fn(this) : options.inverse(this));
    });
}(this));
