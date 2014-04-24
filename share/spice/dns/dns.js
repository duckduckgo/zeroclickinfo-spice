(function(env){
    'use strict'
    
    env.ddg_spice_dns = function(api_result) {

        if (!api_result
                || !api_result.response
                || !api_result.response.records
                || api_result.response.records < 1) {
            return;
        }

        api_result.response.records =
            api_result.response.records.sort(
                function(a, b) {
                    if (a.type == b.type) {
                        return parseInt(a.priority) > parseInt(b.priority)
                    } else {
                      return a.type > b.type;
                    }
                });

        Spice.add({
            id: 'dns',
            name: 'DNS Records',
            data: api_result.response,
            meta: {
                itemType: 'DNS Records',
                sourceUrl: 'http://www.viewdns.info/dnsrecord/?domain=' + api_result.query.domain,
                sourceName: 'ViewDNS'
            },
            templates: {
                detail: Spice.dns.detail
            }
        });
    };
})(this);