(function(env) {
    "use strict";

    // A Swiftype relevance value to eliminate weak,
    // irrelevant results. This value does a good
    // job of filtering out hits which don't match for
    // [business name|category] [location].
    var RELEVANCE_THRESHOLD = 0.06;
    var APP_ID = "health_scores";
    
    env.ddg_spice_health_scores = function(api_result) {
		
        if (no_result(api_result)) {
            return Spice.failed(APP_ID);
        }

        // Display the instant answer.
        Spice.add({
            id: APP_ID,
            name: "Scores",
            data: api_result.records.page,

            meta: {
                itemType: "Inspection Scores",
                sourceName: 'Eaternet',
                sourceUrl: 'https://eaternet.io/#stq=' + original_query(api_result),
                total: api_result.records.page.length,
            },

            templates: {
                group: 'text',

                detail: false,
                item_detail: false,

                options: {
                    footer: Spice.health_scores.footer
                },
            },

            normalize : function(item) {
		return is_relevant(item) ? structured_data(item) : null;
            },

        });

	function no_result(api_result) {
            return (!api_result || api_result.records.page.length === 0);
	}

	function original_query(api_result) {
	    return api_result.info.page.query;
	}

	function is_relevant(item) {
	    return item._score >= RELEVANCE_THRESHOLD;
	}

	function structured_data(item) {
	    var info  = JSON.parse(item.info);
            return {
		url: item.url,
		title: info.name,
		subtitle: info.address_line_1 + ", " + info.address_line_2,
		description: info.score,
		violation_count: info.violation_count,
            }
	}

    }
}(this));
