(function (env) {
    "use strict";
    env.ddg_spice_namecheap = function(api_result){
        // turns on/off debugging output
        var is_debug = false;

        if (!api_result) {
            if(is_debug) console.log('No API response');/*DEBUG*/
            return Spice.failed('namecheap');
        }

        var item = $( $.parseXML(api_result) ).find('DomainCheckResult');

        if (!item) {
            if(is_debug) console.log('Parsed response does not contain DomainCheckResult');/*DEBUG*/
            return Spice.failed('namecheap');
        }

        /* extract data from XML attributes */
        var available = item.attr('Available');
        var domainName = item.attr('Domain');

        if ( !available || !domainName ) {
            if(is_debug) console.log('DomainCheckResult does not return availability');/*DEBUG*/
            return Spice.failed('namecheap');
        }

        var data = {
            domainAvailable: available === "true",
            domainName: domainName
        };
        if(is_debug) console.log('data for template', data);/*DEBUG*/

        Spice.add({
            id               : 'namecheap',
            name             : 'Namecheap',
            data             : data,
            meta             : {
                sourceName       : 'Namecheap',
                sourceUrl        : "https://www.namecheap.com/domains/registration/results.aspx?domain=" + domainName
            },
            templates: {
                group: 'base',
                options:{
                    content: Spice.namecheap.namecheap,
                    moreAt: true
                }
            }
        });
    }
}(this));