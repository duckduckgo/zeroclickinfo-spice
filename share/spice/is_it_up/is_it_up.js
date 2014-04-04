function ddg_spice_is_it_up(response) {
    response['status_code'] = response['status_code'] === 1 ? true : false;

    Spice.add({
        data             : response,
        sourceUrl       : 'http://isitup.org/' + response['domain'],
        sourceName      : 'Is it up?',
        template_normal  : 'is_it_up',
    });
}
