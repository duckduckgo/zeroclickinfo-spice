function ddg_spice_9wsearch (api_result) {

    if (api_result.error || api_result.result == 'not_found' || api_result.primary_symbol == '' || api_result.name == '') return;

        Spice.render({
            data              : api_result,
            force_big_header  : true,
            header1           : api_result.name + ' (' + api_result.primary_symbol + ')',
            source_name       : "9wsearch.com", // More at ...
            source_url        : 'http://www.9wsearch.com/companies/' + api_result.primary_symbol,
            template_normal   : '9wsearch'
        });

}