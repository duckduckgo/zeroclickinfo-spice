function ddg_spice_is_it_up(response) {
    "use strict";

    response['status_code'] = (response['status_code'] === 1);

    Spice.render({
        data             : response,
        source_url       : 'http://isitup.org/' + response['domain'],
        source_name      : 'Is it up?',
        template_normal  : 'is_it_up',
    });
}
