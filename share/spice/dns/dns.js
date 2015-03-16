(function(env){
    'use strict';
    
    env.ddg_spice_dns = function(api_result) {

        if (!api_result || !DDG.getProperty(api_result, 'response.records').length) {
            return Spice.failed('dns');
        }

        api_result.response.records.sort(function(a, b) {
            if (a.type < b.type) 
              return -1 
            if (a.type > b.type)
              return 1
            return parseInt(a.priority) - parseInt(b.priority);
        });

        Spice.add({
            id: 'dns',
            name: "Answer",
            data: api_result.response,
            meta: {
                sourceUrl: 'http://www.viewdns.info/dnsrecord/?domain=' + api_result.query.domain,
                sourceName: 'ViewDNS'
            },
            templates: {
                group: 'base',
                options: {
                    content: Spice.dns.content,
                    moreAt: true
                }
            }
        });
    };
})(this);
