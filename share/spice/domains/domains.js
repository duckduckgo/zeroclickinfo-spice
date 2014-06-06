(function (env) {
	"use strict";
    
    env.ddg_spice_domains = function(api_result) {
        if (api_result.error) {
            return Spice.failed('npm');
        }
        
        // get the relevant part of the result
        api_result = api_result.WhoisRecord;
        
        // for debugging
        console.log(api_result);
        
        var is_availble = !!api_result.registrant;
        var template_to_use = is_availble ? Spice.domains.available : Spice.domains.whois;
        

        Spice.add({
            id: "domains",
            name: "Domains",
            data: api_result,
            meta: {
                sourceName: "WhoisAPI",
                sourceUrl: 'http://www.whoisxmlapi.com/whois-api-doc.php#whoisserver/WhoisService?rid=2&domainName=' + api_result.domainName + '&outputFormat=json'
                	
            },
            templates: {
            	group: 'base',
				options:{
                    content: template_to_use,
					moreAt: true
				}
			}
        });
        
    };
    
}(this));