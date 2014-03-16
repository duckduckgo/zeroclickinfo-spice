function ddg_spice_dns(api_result) {
    "use strict";

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

    Spice.render({
        data              : api_result.response,
        //header1         : api_result.query.domain + ' (ViewDNS)',
        source_url        : 'http://www.viewdns.info/dnsrecord/?domain='
                            + api_result.query.domain,
        source_name       : 'ViewDNS',
        template_normal   : 'dns',
        force_favicon_url : 'http://viewdns.info/favicon.ico',
        force_no_fold     : true
    });
}
