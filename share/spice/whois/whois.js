(function (env) {
    "use strict";
    env.ddg_spice_whois = function(api_result){

    if (!api_result || api_result.error || !api_result.WhoisRecord) {
        return Spice.failed('whois');
    }

    // get the search query
    var script = $('[src*="/js/spice/whois/"]')[0],
        source = $(script).attr("src"),
        query = source.replace('/js/spice/whois/','')

    // all the data is stored in WhoisRecord
    api_result = api_result.WhoisRecord;

    // fail if the domain name the api returns does not match the searched domain
    if(api_result.domainName != query) {
        return Spice.failed('whois');
    }
    
    // decide which template to show show_available or show_whois
    (is_domain_available(api_result)) ? show_available(api_result) : show_whois(api_result);  
}

 // show message saying that the domain is available.
    function show_available(api_result) {
        var shared_spice_data = get_shared_spice_data(api_result),
        templateData = {
            'domainRegistrars': {
                "Domainr": "https://domainr.com/",
                "NameCheap": "https://www.namecheap.com/domains/registration/results.aspx?domain=", 
                "101domain": "https://www.101domain.com/domain-availability-search.htm?q="
                },
            'domainName': api_result.domainName
            }
        shared_spice_data.data = templateData;
        shared_spice_data.templates.options.content = Spice.whois.available;
        Spice.add(shared_spice_data);
    };

    // show whois info for the domain using the 'record' template.
    function show_whois(api_result) {
        var shared_spice_data = get_shared_spice_data(api_result),
            nameServers,
            nsObj,
            normalized

        // store the domain's various contacts in an array.
        // we'll iterate through this array in order, using
        // info from the first contact that contains the field we want.
        var contacts = [
            api_result.registrant,
            api_result.administrativeContact,
            api_result.technicalContact,
            api_result.registryData.registrant,
            api_result.registryData.technicalContact,
            api_result.registryData.administrativeContact
        ];

        // find the nameservers
        if(api_result.nameServers) {
            nsObj = api_result.nameServers;
        } else if(api_result.registryData.nameServers) {
            nsObj = api_result.registryData.nameServers;
        }

        // check we have 2 nameserver hostnames
        if(nsObj && nsObj.hostNames[0] && nsObj.hostNames[1]) {
            var nameServers = [nsObj.hostNames[0].toLowerCase(),nsObj.hostNames[1].toLowerCase()].join(' ');
        }

        // find updatedDate and expiresDate in registryData 
        if(!api_result.updatedDate && !api_result.expiresDate) {
            if(api_result.registryData.updatedDateNormalized && api_result.registryData.expiresDateNormalized) {
                api_result.updatedDate = api_result.registryData.updatedDateNormalized;
                api_result.expiresDate = api_result.registryData.expiresDateNormalized;
            }
        }

        // organize the data
        normalized = {
            'title': api_result.domainName,
            'Registered to': get_first_by_key(contacts, 'name'),
            'Email': get_first_by_key(contacts, 'email'),           
            'Last updated': prettifyTimestamp(api_result.updatedDate),
            'Expires': prettifyTimestamp(api_result.expiresDate),
            'Registrar': api_result.registrarName,
            'Name Servers': nameServers
        };

        // return nothing if we're missing all key whois data
        if(!normalized['Registered to']
            && !normalized['Email']
            && !normalized['Last updated']
            && !normalized['Expires']
            && !normalized['Name Servers']) {
            return;
        }

        // add the attributes specific to this template
        shared_spice_data.data = {
            'record_data': normalized,
            'record_keys': ['Registered to', 'Email', 'Last updated', 'Expires', 'Registrar', 'Name Servers']
        };
        shared_spice_data.templates.options.content = 'record';
        shared_spice_data.templates.options.keySpacing = true;
        Spice.add(shared_spice_data);
    };

    //Returns whether the domain is registered to someone, based on the API result.
    function is_domain_available(api_result) {
        return api_result.dataError && api_result.dataError === 'MISSING_WHOIS_DATA';
    }

    //Converts timestamp into local time using getDateFromString
    function prettifyTimestamp(timestamp) {
        if(!timestamp) { return; }
        var dateObj = DDG.getDateFromString(timestamp),
            monthArr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            day = dateObj.getDate(),
            month = monthArr[dateObj.getMonth()+1],
            year = dateObj.getFullYear();
        if(day<10) {day='0'+day};
        return month + " " + day + ", " + year;
    }

    // Searches an array of objects for the first value
    // at the specified key.
    function get_first_by_key(arr, key) {
        if(!arr || arr.length == 0) return;
        var first;
        $.each(arr, function(index, obj) {
            var value = obj && obj[key];
            // update the first var if the value is truthy
            // and first hasn't already been found
            if (!first && value) {
                first = value;
            }
        });
        return first;
    }

    // Data that's shared between the two Spice.add calls.
    function get_shared_spice_data(api_result) {
        return {
            id: 'whois',
            name: 'Whois',
            meta: {
                sourceName: 'Whois API',
                sourceUrl: 'https://www.whoisxmlapi.com/#whoisserver/WhoisService?domainName='
                    + api_result.domainName
                    + '&target=raw'
            },
            normalize: function(item) {
                return {
                    title: api_result.domainName,
                    subtitle: (is_domain_available(api_result)) ? null : "Whois Lookup"
                };
            },
            templates: {
                group: 'text',
                options:{
                    moreAt: true
                }
            }
        };
    };   
}(this));