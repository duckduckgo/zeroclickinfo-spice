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
	    // show message saying the domain is available
	    show_available(api_result);
	} else if(is_whois_allowed) {
	    // show whois info for the domain
	    show_whois(api_result);
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
	return /\s/.test(query.trim());
    };

    // Show message saying that the domain is available.
    var show_available = function(api_result) {
	Spice.add({
            id: "domains",
            name: "Domains",
            data: api_result,
            meta: {
                sourceName: "Domainr",
                sourceUrl: 'https://domai.nr/' + api_result.domainName
            },
            templates: {
		group: 'base',
		options:{
                    content: Spice.domains.available
		}
	    }
        });
    };

    // Show whois info for the domain using the 'record' template.
    var show_whois = function(api_result) {

	// build the key/value hash for the record template
	var recordData =  {
	    'Domain name': api_result.domainName,
	    'Registered to': api_result.registrant && api_result.registrant.name,
	    'Email': api_result.contactEmail,
	    'Last updated': api_result.updatedDate && api_result.updatedDate.replace(/^(.*)?T(.*)?$/, '$1'), //trim time from the end
	    'Expires': api_result.expiresDate && api_result.expiresDate.replace(/^(.*)?T(.*)?$/, '$1'), //trim time from the end
	};

	Spice.add({
            id: "domains",
            name: "Domains",
            data: { 'record_data': recordData },
            meta: {
                sourceName: "Domainr",
                sourceUrl: 'https://domai.nr/' + api_result.domainName
            },
            templates: {
            	group: 'base',
		options:{
                    content: 'record',
		    moreAt: true
		}
	    }
        });
    };

    
    
}(this));