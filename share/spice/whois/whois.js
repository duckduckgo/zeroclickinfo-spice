(function (env) {
    "use strict";

    // turns on/off debugging output
    var is_debug = false;

    // spice callback function
    env.ddg_spice_whois = function(raw_api_result) {

        // for debugging
        if(is_debug) console.log('in start of JS, raw_api_result:', raw_api_result);

        // normalize the api output
        var api_result = normalize_api_result(raw_api_result);

        if(is_debug) console.log('normalized api_result:', api_result || 'empty');

        // Check for API error and exit early if found
        // (with error message when in debug mode)
        if (!api_result) {
            if(is_debug) console.log('Error with whois API. raw_api_result:', raw_api_result || 'empty', ', normalized api_result:', api_result || 'empty');

            return Spice.failed('whois');
        }

        // is the domain available?
        var is_avail = api_result.available;

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

    // Returns whether we should show whois data if this
    // domain is not available.
    var is_whois_query = function(query) {

        // show whois results unless the query is a naked domain
	// (i.e. contains only the domain and no other keywords).
	//
	// we test for naked domains by looking for a space in the query.
        return /\s/.test($.trim(query));

    };

    // parse the api response into a standard format
    var normalize_api_result = function(api_result) {

        // return nothing if no api_result, if error, or if WhoisRecord object is missing
        if(!api_result || api_result.error || !api_result.WhoisRecord) return;

        // use only the 'WhoisRecord' portion, because that's where
        // all the data is stored.
        api_result = api_result.WhoisRecord;

        // sometimes the data is nested inside the 'registryData' object
        if(!api_result.createdDate
           && api_result.registryData
           && (api_result.registryData.createdDate || api_result.registryData.expiresDate) ){

            api_result = api_result.registryData;
        }

        // store the domain's various contacts in an array.
        //
        // we'll iterate through this array in order, using
        // info from the first contact that contains the field we want.
        var contacts = [
            api_result.registrant,
            api_result.administrativeContact,
            api_result.technicalContact
        ];  

        // return the normalized output as a hash
        var normalized = {

            // these first fields are not displayed
            // (hence the camelCase, which the user will not see)

            'domainName': api_result.domainName,
            'available': is_domain_available(api_result),

            // the remaining fields are displayed
            // (hence the user-friendly capitalization and spaces)

            'Status': is_domain_available(api_result) ? 'Available' : 'Registered',
            'Registered to': get_first_by_key(contacts, 'name'),
            'Email': get_first_by_key(contacts, 'email'),

            // trim dates so they are shown without times
            // (if no time was found, the replace() call will return undef,
            //  so we need to fallback to the original string)
            'Last updated': api_result.updatedDate
                && api_result.updatedDate.replace(/^(.*)?\s(.*)?$/, '$1'),

            'Expires': api_result.expiresDate
                && api_result.expiresDate.replace(/^(.*)?\s(.*)?$/, '$1'),
        };

        // return nothing if domain has an owner but is missing all key whois data
        if( !normalized['available']
            && !normalized['Registered to']
            && !normalized['Email']
            && !normalized['Last updated']
            && !normalized['Expires']) {
            return;
        }

        return normalized;
    }

    // Returns whether the domain is registered to someone, based on the API result.
    var is_domain_available = function(api_result) {
        return api_result.dataError && api_result.dataError === 'MISSING_WHOIS_DATA';
    };

    // Searches an array of objects for the first value
    // at the specified key.
    var get_first_by_key = function(arr, key) {
        if(!arr || arr.length == 0) return;

        // find the first object in the array that has a non-empty value at the key
        var first;
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

        // return first, which could still be empty
        return first;
    }

    // Data that's shared between the two Spice.add calls.
    var get_shared_spice_data = function(api_result) {
        return {
            id: "whois",
            name: "Whois",
            meta: {
                sourceName: "Whois API",
                sourceUrl: 'https://www.whoisxmlapi.com/#whoisserver/WhoisService?domainName='
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
            'record_keys': ['Status', 'Registered to', 'Email', 'Last updated', 'Expires']
        };
        shared_spice_data.templates.options.content = 'record';
        shared_spice_data.templates.options.keySpacing = true;

        Spice.add(shared_spice_data);
    };

    
    
}(this));