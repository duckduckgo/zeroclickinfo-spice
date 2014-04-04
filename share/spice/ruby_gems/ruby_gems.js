function ddg_spice_ruby_gems(api_result) {
    
    if (api_result.length === 0) return;

    // Get the original query.
    var script = $('[src*="/js/spice/ruby_gems/"]')[0];
    var source = $(script).attr("src");
    var query = source.match(/ruby_gems\/([^\/]*)/)[1];

    // Display the instant answer.
    Spice.add({
        data             : api_result,
        header1          : decodeURIComponent(query) + " (RubyGems)",
        sourceUrl       : 'http://rubygems.org/search?utf8=%E2%9C%93&query=' + encodeURIComponent(query),
        sourceName      : 'RubyGems',
        id       : 'ruby_gems',
        template_frame   : 'list',
        template_options : {
            items: api_result,
            show: 5,
	    max: 10,
            template_item: 'ruby_gems'
        },
        
        
    });
}
