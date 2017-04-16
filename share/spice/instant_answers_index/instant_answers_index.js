(function(env) {
    "use strict";

    env.ddg_spice_instant_answers_index = function(api_result) {

        if (api_result.error) {
            return Spice.failed('instant_answers_index');
        }

        Spice.add({
            id: "instant_answers_index",
            name: "Instant Answers",
            data: api_result,
            meta: {
                itemType: 'Instant Answers',
                sourceName: "duck.co",
                sourceUrl: 'https://duck.co/ia'
            },
            normalize: function(item) {                                                     //Changes "undefined" topics to empty value to allow multiple topic tags to be displayed.
                if (typeof item.instant_answer_topics[0] === 'undefined') {
                    var tag1 = "";
                } else {
                    var tag1 = item.instant_answer_topics[0].topic.name;
                }
                if (typeof item.instant_answer_topics[1] === 'undefined') {
                    var tag2 = "";
                } else {
                    var tag2 = item.instant_answer_topics[1].topic.name;
                }
                if (typeof item.instant_answer_topics[2] === 'undefined') {
                    var tag3 = "";
                } else {
                    var tag3 = item.instant_answer_topics[2].topic.name;
                }
                return {

                    url: (item.url) ? item.url : 'https://duck.co/ia/view/' + item.id,
                    tag: tag1,
                    tag2: tag2,
                    tag3: tag3
                };
            },
            templates: {
                group: 'base',
                detail: false,
                options: {
                    content: Spice.instant_answers_index.content,
                    moreAt: true
                }
            }
        });
    };

}(this));
