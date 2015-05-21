(function(env) {
    "use strict";
    env.ddg_spice_tlds = function(api_result) {
        if(!api_result) {
            return Spice.failed('namecheap');
        }
        var item = api_result.ApiResponse.CommandResponse.DomainCheckResult;
        if(!item) {
            return Spice.failed('namecheap');
        }
        /* extract data from JSON */
        var available = item.Available;
        var domainName = item.Domain;
        if(!available || !domainName) {
            return Spice.failed('namecheap');
        }
        var data = {
            domainAvailable: available === "true",
            domainName: domainName
        };
        Spice.add({
            id: 'namecheap',
            name: 'tldlist',
            data: data,
            meta: {
                sourceName: 'Namecheap',
                sourceUrl: "http://api.namecheap.com/xml.response"
            },
            normalize: function(item) {
                return {
                    title: item.domainName
                };
            },
            templates: {
                group: 'text',
                options: {
                    content: Spice.namecheap.namecheap,
                    moreAt: true
                }
            }
        });
    };
}(this));
