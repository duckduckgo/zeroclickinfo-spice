(function (env) {
    "use strict";

    // flag for debugging output
    var is_debug = true;

    env.ddg_spice_domains = function(api_result) {
        // for debugging
        if(is_debug) console.log('api_result:', api_result);

	// Check for API error and exit early (with error message when in debug mode)
        if (!api_result || api_result.status != 0) {
	    if(is_debug && api_result) {
		console.log('Domains API failed with status code ' + api_result.status + (api_result.status_desc ? ' (' + api_result.status_desc + ')' : '') + '.');
		console.log(' -> for more info on status codes, see: https://whoapi.com/api-documentation.html#statuscodes');
		console.log(' -> raw api output:', api_result);
		console.log(' ');
	    }

            return Spice.failed('domains');
        }

	// get the original query
	var query = DDG.get_query();

	// normalize the api output
	api_result = normalize_api_output(api_result, query);

        // is the domain available?
	var is_avail = is_domain_available(api_result);

	// if the domain isn't available, do we want to show
	// whois information?
	var is_whois_allowed = is_whois_query(query);

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

    var normalize_api_output = function(api_output, query) {

	// initialize the new output object
	var normalized =  {
	    // used but not displayed
	    'domainName': '',
	    'registered': false,

	    // displayed, hence the capitalization and spaces
	    'Registered to': '',
	    'Email': '',
	    'Last updated': '',
	    'Expires': ''
	};

	// add domain to the API result, since WhoAPI doesn't add it automatically
	// TODO: Need to parse the URL from this, b/c it's the fulll query
	normalized['domainName'] = query;
	normalized['registered'] = api_output['registered'];

	normalized['Registered to'] = get_first_by_key(api_output['contacts'], 'name');
	normalized['Email'] = get_first_by_key(api_output['contacts'], 'email');

	// trim so dates ares shown without times
	normalized['Last updated'] = api_output['date_updated'] && api_output['date_updated'].replace(/^(.*)?\s(.*)?$/, '$1');
	normalized['Expires'] = api_output['date_expires'] && api_output['date_expires'].replace(/^(.*)?\s(.*)?$/, '$1');

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
                sourceName: "WhoAPI",
                sourceUrl: 'https://whoapi.com/' // TODO: Ask if there's a GET url for user-friendly whois output (instead of ugly json output)
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

	Spice.add({
            id: "domains",
            name: "Domains",
            data: {
		'record_data': api_result, 
		'record_keys': ['Registered to', 'Email', 'Last updated', 'Expires']
	    },
            meta: {
                sourceName: "WhoAPI",
                sourceUrl: 'https://whoapi.com/' // TODO: Ask if there's a GET url for user-friendly whois output (instead of ugly json output)
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