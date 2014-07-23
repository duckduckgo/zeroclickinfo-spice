(function(env) {    
    env.ddg_spice_ruby_gems = function(api_result) {
        "use strict";
        
        if (!api_result || api_result.length === 0) {
            return Spice.failed("ruby_gems");
        }

        // Get the original query.
        var script = $('[src*="/js/spice/ruby_gems/"]')[0];
        var source = $(script).attr("src");
        var query = source.match(/ruby_gems\/([^\/]*)/)[1];

        // Display the instant answer.
        Spice.add({
            id: "ruby_gems",
            name: "Software",
            data: api_result,
            meta: {
                sourceUrl: 'http://rubygems.org/search?utf8=%E2%9C%93&query=' + encodeURIComponent(query),
                sourceName: 'RubyGems',
                total: api_result.length,
                itemType: "gems",
            },
            templates:{
                group: 'text',
                detail: false,
		item_detail: false
            },
            normalize : function(item){
                return{
                    title: item.name,
                    url: item.project_uri,
                    description: item.info
                }
            }
        });
    }
}(this));
