(function (env) {
    "use strict";

    env.ddg_spice_daily_holidays = function(api_result) {

        if (!api_result || api_result.error) {
            return Spice.failed('daily_holidays');
        }

        Spice.add({
            id: 'daily_holidays',

            name: 'AnswerBar title',
            data: api_result,
            meta: {
                sourceName: 'Example.com',
                sourceUrl: 'http://example.com/url/to/details/' + api_result.name
            },
            normalize: function(item) {
                return {
                    title: item.title,
                    subtitle: item.subtitle,
                    image: item.icon
                };
            },
            templates: {
                group: 'your-template-group',
                options: {
                    content: Spice.daily_holidays.content,
                    moreAt: true
                }
            }
        });
    };
}(this));
