(function (env) {
    "use strict";

    // turns on/off debugging output
    var is_debug = false;

    // spice callback function
    env.ddg_spice_whois = function(api_result) {
        // for debugging
        if(is_debug) console.log('api_result:', api_result);

	// Check for API error and exit early if found
	// (with error message when in debug mode)
	if (!api_result || api_result.error || !api_result.WhoisRecord) {
	    if(is_debug) console.log("Error with whois API. api_result:", api_result || 'undefined');

	    return Spice.failed('whois');
	}

	// normalize the api output
	api_result = normalize_api_result(api_result);

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
	// and no other keywords, which we test by looking for a space in the query.
	return /\s/.test($.trim(query));
    };

    var normalize_api_result = function(api_result) {

	// store the domain's various contacts in an array.
	//
	// we'll iterate through this array in order, using
	// info from the first contact that contains the field we want.
	var contacts = [
	    api_result.WhoisRecord.registrant,
	    api_result.WhoisRecord.administrativeContact,
	    api_result.WhoisRecord.technicalContact
	];  

	// return the normalized output as a hash
	return {

	    // these first fields are not displayed
	    // (hence the camelCase, which the user will not see)

	    'domainName': api_result.WhoisRecord.domainName,
	    'registered': !!api_result.WhoisRecord.registrant, // boolean flag

	    // the remaining fields are displayed
	    // (hence the user-friendly capitalization and spaces)

	    'Registered to': get_first_by_key(contacts, 'name'),
	    'Email': get_first_by_key(contacts, 'email'),

	    // trim dates so they are shown without times
	    'Last updated': api_result.WhoisRecord.updatedDate
	                    && api_result.WhoisRecord.updatedDate.replace(/^(.*)?\s(.*)?$/, '$1'),

	    'Expires': api_result.WhoisRecord.expiresDate
	               && api_result.WhoisRecord.expiresDate.replace(/^(.*)?\s(.*)?$/, '$1'),

	};
    }

    // Searches an array of objects for the first value
    // at the specified key.
    var get_first_by_key = function(arr, key) {
	if(!arr || arr.length == 0) return null;

	// find the first object in the array that has a non-empty value at the key
	var first = null;
	$.each(arr, function(index, obj) {
	    // get the value at the specified key
	    // (which could be undefined)
	    var value = obj && obj[key];

	    // update the first var if the value is truthy
	    // and first hasn't already been found
	    if(!first && value) {
		first = value;
	    }
	});

	// return first, which could still be null
	return first;
    }

    // Data that's shared between the two Spice.add calls.
    var get_shared_spice_data = function(api_result) {
	return {
            id: "whois",
            name: "Whois",
            meta: {
		sourceName: "Whois API",
		sourceUrl: 'http://www.whoisxmlapi.com/whois-api-doc.php#whoisserver/WhoisService?rid=2&domainName='
		    + api_result.domainName
		    + '&outputFormat=json&target=raw'
            },
            templates: {
		group: 'base',
		options:{
		    moreAt: true
		}
	    }
	};
    };

    // Show message saying that the domain is available.
    var show_available = function(api_result) {
	if(is_debug) console.log('api result in show_available', api_result);

	var shared_spice_data = get_shared_spice_data(api_result);

	// add the attributes specific to this template
        shared_spice_data.data = api_result;
	shared_spice_data.templates.options.content = Spice.whois.available;

	Spice.add(shared_spice_data);
    };

    // Show whois info for the domain using the 'record' template.
    var show_whois = function(api_result) {

	var shared_spice_data = get_shared_spice_data(api_result);

	// add the attributes specific to this template
	shared_spice_data.data = {
	    'record_data': api_result,
	    'record_keys': ['Registered to', 'Email', 'Last updated', 'Expires']
	};
	shared_spice_data.templates.options.content = 'record';

	Spice.add(shared_spice_data);
    };

    
    
}(this));