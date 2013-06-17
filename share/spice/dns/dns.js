function ddg_spice_dns(api_result) {
    if (!api_result.response.records > 0) return;

    Spice.render({
        data              : api_result,
        //header1         : api_result.query.domain + ' (ViewDNS)',
        source_url        : 'http://www.viewdns.info/dnsrecord/?domain=' + api_result.query.domain,
        source_name       : 'ViewDNS',
        template_normal   : 'dns',
        force_favicon_url : 'http://viewdns.info/favicon.ico'
    });
}
