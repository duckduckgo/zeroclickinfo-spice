(function (env) {
    "use strict";
    env.ddg_spice_translation = function(api_result){

        if (!api_result) {
            return Spice.failed('ddg_spice_translation');
        }

		var input = api_result.translation.input,
			text  = input.text,
			lFrom = input.from,
			lTo   = input.to;

        // Render the response
        Spice.add({
            id: "translation",
            name: "Translation",
            data: { record_data: api_result.translation.output },
            meta: {
                sourceName: "Bing & Yahoo",
                sourceUrl: "http://www.bing.com/translator/?from=" + lFrom + "&to=" + lTo + "&text=" + input.text
            },
			normalize: function(data){
				return {
					title: text,
					subtitle: ["Translation", "From: " + lFrom, "To: " + lTo]
				};
			},
            templates: {
                group: 'list',
				options: {
                    content: 'record'
                }
            }
        });
    };
}(this));
