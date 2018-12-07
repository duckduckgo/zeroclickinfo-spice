(function (env) {
    "use strict";
    env.ddg_spice_git_book_status = function(api_result) {

        if (!api_result) {
            return Spice.failed('git_book_status');
        }

        Spice.add({
            id: "git_book_status",
            name: "Answer",
            data: api_result,
            normalize: function(item) {
                return {
                    status: item.status.indicator,
                    subtitle: item.status.description
                };
            },
            meta: {
                sourceName: api_result.page.name,
                sourceUrl: api_result.page.url
            },
            templates: {
                group: 'text',
                options: {
                    title_content: Spice.git_book_status.title_content,
                    moreAt: true
                }
            }
        });
    }


    Spice.registerHelper("GitbookStatus_indicator", function(string1, string2, options) {
       return ((string1 == string2) ? options.fn(this) : options.inverse(this)); 
    });

}(this));
