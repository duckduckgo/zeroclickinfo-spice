(function (env) {
    "use strict";

    // turns on/off debugging output
    var is_debug = false;

    // spice callback function
    env.ddg_spice_whois = function(api_output) {
        // for debugging
        if(is_debug) console.log('api_output:', api_output);

	// Check for API error and exit early if found
	// (with error message when in debug mode)
	if (!api_output || api_output.error || !api_output.WhoisRecord) {
	    if(is_debug) console.log("Error with whois API. api_output:", api_output || 'undefined');

	    return Spice.failed('whois');
	}

	// normalize the api output
	api_output = normalize_api_output(api_output);

        // is the domain available?
	var is_avail = is_domain_available(api_output);

	// if the domain isn't available, do we want to show
	// whois information?
	var is_whois_allowed = is_whois_query(DDG.get_query());

	// for debugging
	if(is_debug) console.log("is_avail:", is_avail, "is_whois_allowed:", is_whois_allowed);

	// decide which template to show, if any
	if(is_avail) {
	    // show message saying the domain is available
	    show_available(api_output);
	} else if(is_whois_allowed) {
	    // show whois info for the domain
	    show_whois(api_output);
	} else {
	    // by default, show nothing
	}

    };

    // Returns whether the domain is available,
    // based on the API result that was returned.
    var is_domain_available = function(api_output) {
	return !api_output['registered'];
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

    var normalize_api_output = function(api_output) {

	// store the domain's various contacts in an array.
	//
	// we'll iterate through this array in order, using
	// info from the first contact that contains the field we want.
	var contacts = [
	    api_output.WhoisRecord.registrant,
	    api_output.WhoisRecord.administrativeContact,
	    api_output.WhoisRecord.technicalContact
	];  

	// return the normalized output as a hash
	return {

	    // these first fields are not displayed
	    // (hence the camelCase, which the user will not see)

	    'domainName': api_output.WhoisRecord.domainName,
	    'registered': !!api_output.WhoisRecord.registrant, // boolean flag

	    // the remaining fields are displayed
	    // (hence the user-friendly capitalization and spaces)

	    'Registered to': get_first_by_key(contacts, 'name'),
	    'Email': get_first_by_key(contacts, 'email'),

	    // trim dates so they are shown without times
	    'Last updated': api_output.WhoisRecord.updatedDate
	                    && api_output.WhoisRecord.updatedDate.replace(/^(.*)?\s(.*)?$/, '$1'),

	    'Expires': api_output.WhoisRecord.expiresDate
	               && api_output.WhoisRecord.expiresDate.replace(/^(.*)?\s(.*)?$/, '$1'),

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
    var get_shared_spice_data = function(api_output) {
	return {
            id: "whois",
            name: "Whois",
            meta: {
		sourceName: "Whois API",
		sourceUrl: 'http://www.whoisxmlapi.com/whois-api-doc.php#whoisserver/WhoisService?rid=2&domainName='
		    + api_output.domainName
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
    var show_available = function(api_output) {
	if(is_debug) console.log('api result in show_available', api_output);

	var shared_spice_data = get_shared_spice_data(api_output);

	// add the attributes specific to this template
        shared_spice_data.data = api_output;
	shared_spice_data.templates.options.content = Spice.whois.available;

	Spice.add(shared_spice_data);
    };

    // Show whois info for the domain using the 'record' template.
    var show_whois = function(api_output) {

	var shared_spice_data = get_shared_spice_data(api_output);

	// add the attributes specific to this template
	shared_spice_data.data = {
	    'record_data': api_output,
	    'record_keys': ['Registered to', 'Email', 'Last updated', 'Expires']
	};
	shared_spice_data.templates.options.content = 'record';

	Spice.add(shared_spice_data);
    };

    
    
}(this));