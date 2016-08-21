(function (env) {
    "use strict";

    env.ddg_spice_ham_callsigns = function(api_result) {

        // Validate the response (customize for your Spice)
        if (!api_result || api_result.error || api_result.status !== 'OK') {
            return Spice.failed('ham_callsigns');
        }

        // To prevent lots of responses, filter out to only display up to 20 ham licenses
	var data_arr = [];
        var i = 0;

	while(data_arr.length <20 && i < api_result.Licenses.License.length -1){
	    if (api_result.Licenses.License[i].serviceDesc === "Amateur" || api_result.Licenses.License[i].serviceDesc === "Vanity"){
	        data_arr.push(api_result.Licenses.License[i]);	
	    };
	    i++;
	}
	
	// If there's only one item returned, put it in the array
	if (api_result.Licenses.totalRows == 1){
	    data_arr = api_result.Licenses.License[0];
	}

	Spice.add({
            id: 'ham_callsigns',

            // Customize these properties
            name: 'Ham Callsigns',
            data: data_arr,
            meta: {
                sourceName: 'FCC Amateur License Search',
                sourceUrl: 'http://wireless2.fcc.gov/UlsApp/UlsSearch/searchAmateur.jsp'
            },
            normalize: function(item) {
                return {
                    // Just text info 
		    url: item.licDetailURL,
                    title: item.callsign,
		    subtitle: item.licName,
		    description: item.serviceDesc + " - " + item.statusDesc
                };
            },
            templates: {
                group: 'text',
		// override text detail default
                detail: 'basic_info_detail',
		options: {
		    moreAt: false,
                    moreText: {
			text: "Search FCC ULS system",
			href: "http://wireless2.fcc.gov/UlsApp/UlsSearch/searchAmateur.jsp"
			},
                },
            }
        });
    };
}(this));
