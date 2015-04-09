(function(env) {
    "use strict";

    // A Swiftype relevance value to eliminate weak,
    // irrelevant results. This value does a good
    // job of filtering out hits which don't match for
    // [business name|category] [location].
    var RELEVANCE_THRESHOLD = 0.06;

    
    env.ddg_spice_health_scores = function(api_result) {


        if (no_result(api_result)) {
            return Spice.failed("health_scores");
        }

        // Display the instant answer.
        Spice.add({
            id: "health_scores",
            name: "Scores",
            data: api_result.records.page,

            meta: {
                itemType: "Scores",
                sourceName: 'Eaternet',
                sourceUrl: 'https://eaternet.io/#stq=' + original_query(),
                total: api_result.length,
            },

            templates: {
                group: 'text',

                detail: false,
                item_detail: false,

                options: {
                    footer: Spice.health_scores.footer
                },
                variants: {
		    tileTitle: "2line-small",
                },
            },

            normalize : function(item) {
		return is_relevant(item) ? structured_data(item) : null;
            },

        });

	function no_result(api_result) {
            return (!api_result || api_result.records.page.length === 0);
	}

	function original_query() {
            var script = $('[src*="/js/spice/health_scores/"]')[0];
            var source = $(script).attr("src");
            return source.match(/health_scores\/([^\/]*)/)[1];
	}

	function is_relevant(item) {
	    return item._score >= RELEVANCE_THRESHOLD;
	}

	function structured_data(item) {
	    var info  = JSON.parse(item.info);
            return {
		url: item.url,
		title: info.name,
		subtitle: info.address_line_1,
		description: info.score,
		violation_count: info.violation_count,
            }
	}

    }
}(this));
