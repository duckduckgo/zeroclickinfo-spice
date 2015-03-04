(function (env) {
    "use strict";
    env.ddg_spice_namecheap = function(api_result){
        // turns on/off debugging output
        var is_debug = false;

        if (!api_result) {
            return Spice.failed('namecheap');
        }

        var item = api_result.ApiResponse.CommandResponse.DomainCheckResult;


        if (!item) {
            return Spice.failed('namecheap');
        }

        /* extract data from JSON */
        var available = item.Available;
        var domainName = item.Domain;

        if ( !available || !domainName ) {
            return Spice.failed('namecheap');
        }

        var data = {
            domainAvailable: available === "true",
            domainName: domainName
        };

        Spice.add({
            id               : 'namecheap',
            name             : 'Namecheap',
            data             : data,
            meta             : {
                sourceName       : 'Namecheap',
                sourceUrl        : "https://www.namecheap.com/domains/registration/results.aspx?domain=" + domainName
            },
            normalize: function(item) {
                return {
                    title: item.domainName,
                    subtitle: "Namecheap Domain Search"
                };
            },
            templates: {
                group: 'text',
                options:{
                    content: Spice.namecheap.namecheap,
                    moreAt: true
                }
            }
        });
    }
}(this));
