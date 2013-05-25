function ddg_spice_ruby_gems(response) {
    if (response.length == 0)
        return;

    var query = DDG.get_query();
    query = query.replace(/\s*(?:(?:ruby(?:gems?)?)|(?:gems?))\s*/i, '');
    Spice.render({
        data             : response,
        header1          : query + " (RubyGems)",
        source_url       : 'http://rubygems.org/search?utf8=%E2%9C%93&query=' + encodeURIComponent(query),
        source_name      : 'RubyGems',
        template_normal  : 'ruby_gems',
        force_big_header : true
    });
}
