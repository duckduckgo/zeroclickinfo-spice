function ddg_spice_9wsearch (api_result) {
    if (api_result.error) return;

    Spice.render({
         data              : api_result,
         force_big_header  : true,
         header1           : api_result.name + ' (' + api_result.primary_symbol + ')',
         source_name       : "9wsearch.com", // More at ...
         source_url        : 'http://www.9wsearch.com/companies/' + api_result.primary_symbol,
         template_normal   : '9wsearch',
    });
}