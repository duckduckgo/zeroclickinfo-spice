(function (env) {
    "use strict";

    // flag for debugging output
    var is_debug = true;

    env.ddg_spice_domains = function(api_result) {
        // for debugging
        if(is_debug) console.log('api_result:', api_result);

        if (!api_result || api_result.error || !api_result.WhoisRecord) {
            return Spice.failed('domains');
        }
        
        // get the relevant part of the result
        api_result = api_result.WhoisRecord;
        
        // is the domain available?
	var is_avail = is_domain_available(api_result);

	// if the domain isn't available, do we want to show
	// whois information?
	var is_whois_allowed = is_whois_query(DDG.get_query());

	// for debugging
	if(is_debug) console.log("is_avail:", is_avail, "is_whois_allowed:", is_whois_allowed);

	// decide which template to show, if any
	if(is_avail) {
	    // always show result when domain is available
	    show_result(api_result, Spice.domains.available);
	} else if(is_whois_allowed) {
	    // if domain is not available, show whois only for designated 'whois' queries
	    show_result(api_result, Spice.domains.whois);
	} else {
	    // by default, show nothing
	}

    };

    // Returns whether the domain is available,
    // based on the API result that was returned.
    var is_domain_available = function(api_result) {

	// no registrant means that a domain is available
	// 
	// TODO: Figure out cases when domain is available but there
	//       is already a registrant, such as with expired domains.
	return !api_result.registrant;
    };

    // Returns whether we should show whois data if this
    // domain is not available.
    var is_whois_query = function(query) {

	// for debugging
	if(is_debug) console.log('in is_whois_query, query =', query); 

	// show whois results except when the query contains only the domain
	// and no other keywords, which we test by looking for spaces in the query.
	return /\s/.test(query);
    };

    // Show the result using the template specified.
    var show_result = function(api_result, template) {

	// bring data we need to top level of the object
	api_result = {
	    domainName: api_result.domainName,
	    registrantName: api_result.registrant && api_result.registrant.name,
	    contactEmail: api_result.contactEmail,
	    updatedDate: api_result.updatedDate,
	    expirationDate: api_result.expiresDate,
	};

	// trim times from end of date strings
	api_result.updatedDate = api_result.updatedDate && api_result.updatedDate.replace(/^(.*)?T(.*)?$/, '$1');
	api_result.expirationDate = api_result.expirationDate && api_result.expirationDate.replace(/^(.*)?T(.*)?$/, '$1');
		
	Spice.add({
            id: "domains",
            name: "Domains",
            data: api_result,
            meta: {
                sourceName: "WhoisAPI",
                sourceUrl:
		    'http://www.whoisxmlapi.com/whois-api-doc.php#whoisserver/WhoisService?rid=2&domainName='
		    + api_result.domainName
		    + '&outputFormat=json'
                	
            },
            templates: {
            	group: 'base',
		options:{
                    content: template,
		    moreAt: true
		}
	    }
        });
    };

    
    
}(this));