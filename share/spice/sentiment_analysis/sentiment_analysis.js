(function (env) {
    "use strict";
    env.ddg_spice_sentiment_analysis = function(api_result){
	
	console.log(api_result);

        if (!api_result || api_result.error) {
            return Spice.failed('sentiment_analysis');
        }

        Spice.add({
            id: "sentiment_analysis",
            name: "Sentiment Analysis",
            data: api_result,
            normalize: function(item) {
                var title = 'Document sentiment: '+item.docSentiment.type+' ('+item.docSentiment.score+')';
                return {
		    title: title,
                    subtitle: item.url
                };
            },
            templates: {
                group: 'text',
                options: {
                    moreAt: false
                }
            }
        });
    };
}(this));
