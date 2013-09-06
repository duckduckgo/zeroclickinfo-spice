function ddg_spice_python_eggs(response) {
    if (response.length == 0)
        return;

    var query = DDG.get_query();
    query = query.replace(/\s*(?:(?:python(?:pip?)?)|(?:easy_install?))\s*/i, '');
    Spice.render({
        data             : response,
        header1          : query + " (Python Package)",
        source_url       : 'http://rubygems.org/search?utf8=%E2%9C%93&query=' + encodeURIComponent(query),
        source_name      : 'PyPI',
        template_normal  : 'python_eggs',
        force_big_header : true
    });
}
