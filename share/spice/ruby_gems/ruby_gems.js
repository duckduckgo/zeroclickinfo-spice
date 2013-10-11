function ddg_spice_ruby_gems(api_result) {
    
    if (api_result.length === 0) return;

    var query = DDG.get_query()
    query = query.replace(/\s*(?:(?:ruby(?:gems?)?)|(?:gems?))\s*/i, '');

    Spice.render({
        data             : api_result,
        header1          : query + " (RubyGems)",
        source_url       : 'http://rubygems.org/search?utf8=%E2%9C%93&query=' + encodeURIComponent(query),
        source_name      : 'RubyGems',
        spice_name       : 'ruby_gems',
        template_frame   : 'list',
        template_options : {
            items: api_result,
            show: 5,
            template_item: 'ruby_gems'
        },
        force_no_fold    : true,
        force_big_header : true
    });
}
