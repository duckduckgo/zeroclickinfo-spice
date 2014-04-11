function ddg_spice_time_and_date_holiday(api_result) {
    if(!api_result || !api_result.h || api_result.h.length === 0) {
        return;
    }
    var query = DDG.get_query(),
        header = 'When is '+api_result.q+' in '+api_result.c,
        url = 'http://www.timeanddate.com/',
        source = url + 'search/results.html?query=' + encodeURIComponent(query);

    Spice.render({
        data: api_result.h,
        header1: header,
        source_name: 'timeanddate.com',
        source_url: source,
        spice_name: 'time_and_date_holidays',
        template_frame: 'list',
        template_options: {
            items: api_result.h,
            show: 2,
            max: 10,
            template_item: 'time_and_date_holiday'
        },
        force_big_header: true
    });
};
