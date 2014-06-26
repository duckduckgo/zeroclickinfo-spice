(function (env) {
    "use strict";

    // flag for debugging output
    var is_debug = true;

    env.ddg_spice_domains = function(api_result) {
        // for debugging
        if(is_debug) console.log('api_result:', api_result);

	// Check for API error and exit early (with error message when in debug mode)
	if (!api_result || api_result.error || !api_result.WhoisRecord) {
	    if(is_debug) console.log("Error with whois API. api_result:", api_result || 'undefined');

	    return Spice.failed('domains');
	}

	// normalize the api output
	api_result = normalize_api_output(api_result);

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
	return !api_result['registered'];
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

    var normalize_api_output = function(api_output) {

	// initialize the output object
	var normalized =  {
	    // these fields will not be displayed, but are used internally
	    'domainName': '',
	    'registered': false,

	    // these fields will displayed, hence the capitalization and spaces
	    'Registered to': '',
	    'Email': '',
	    'Last updated': '',
	    'Expires': ''
	};
	
	// get the domain name
	normalized['domainName'] = api_output.WhoisRecord.domainName;

	// set the registered flag
	normalized['registered'] = !!api_output.WhoisRecord.registrant;

	// get contact name and email from the registrant,
	// and falling back to the admin and technical contacts
	var contacts = [
	    api_output.WhoisRecord.registrant,
	    api_output.WhoisRecord.administrativeContact,
	    api_output.WhoisRecord.technicalContact
	];  
	normalized['Registered to'] = get_first_by_key(contacts, 'name');
	normalized['Email'] = get_first_by_key(contacts, 'email');

	// trim dates so they are shown without times
	normalized['Last updated'] = api_output.WhoisRecord.updatedDate
	                                 && api_output.WhoisRecord.updatedDate.replace(/^(.*)?\s(.*)?$/, '$1');
	normalized['Expires'] = api_output.WhoisRecord.expiresDate
	                            && api_output.WhoisRecord.expiresDate.replace(/^(.*)?\s(.*)?$/, '$1');

	return normalized;
    };

    // Searches an array of objects for the first value
    // at the specified key.
    var get_first_by_key = function(arr, key) {
	if(!arr || arr.length == 0) return null;

	// find the first object in the array that has a non-empty value at the key
	var first = null;
	arr.forEach( function(obj) {
	    if(obj && typeof obj[key] !== 'undefined' && obj[key] !== '') {
		if(!first) first = obj[key];
	    }
	});

	// return first, which could still be null
	return first;
    }

    // Show message saying that the domain is available.
    var show_available = function(api_result) {
	console.log('api result in show_available', api_result);

	Spice.add({
            id: "domains",
            name: "Domains",
            data: api_result,
            meta: {
                sourceName: "Whois API",
                sourceUrl: 'http://www.whoisxmlapi.com/whois-api-doc.php#whoisserver/WhoisService?rid=2&domainName='
		    + api_result.domainName
		    + '&outputFormat=json'
            },
            templates: {
		group: 'base',
		options:{
                    content: Spice.domains.available,
		    moreAt: true
		}
	    }
        });
    };

    // Show whois info for the domain using the 'record' template.
    var show_whois = function(api_result) {

	Spice.add({
            id: "domains",
            name: "Domains",
            data: {
		'record_data': api_result, 
		'record_keys': ['Registered to', 'Email', 'Last updated', 'Expires']
	    },
            meta: {
                sourceName: "Whois API",
                sourceUrl: 'http://www.whoisxmlapi.com/whois-api-doc.php#whoisserver/WhoisService?rid=2&domainName='
		    + api_result.domainName
		    + '&outputFormat=json'
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