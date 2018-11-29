(function (env) {
    "use strict";
    env.ddg_spice_news = function (api_result) {
        if (!api_result || !api_result.results) {
            return Spice.failed('news');
        }

        Spice.add({
            id: 'news',
            name: 'News',
            data: api_result.results,
            answerType: 'News',
        });
    }
}(this));
