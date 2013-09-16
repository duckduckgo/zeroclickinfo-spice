function ddg_spice_py_pi(response) {
    if (response.length == 0)
        return;

    var query = DDG.get_query();
    query = query.replace(/\s*(?:(?:python(?:pip?)?)|(?:easy_install?))\s*/i, '');
    Spice.render({
        data             : response,
        header1          : query + " (Python Packages)",
        source_url       : 'http://ddg.absent.co.in/pypi?query=' + encodeURIComponent(query),
        source_name      : 'PyPI',
        template_normal  : 'py_pi',
        force_big_header : true
    });
}
