function ddg_spice_ruby_gems(response) {
    if (response.length > 0) {
        var query = DDG.get_query();
        query = query.replace(/\s*(?:(?:ruby(?:gems?)?)|(?:gems?))\s*/i, '');
        var output = '<div><ul>';
        for (i = 0; i < response.length; i++) {
            var desc;
            if (response[i].info.length > 128)
                desc = response[i].info.substring(0, 128) + '...';
            else
                desc = response[i].info;

            output += '<li><a href="' + response[i].project_uri + '">' + response[i].name + '</a>' +
                      '&nbsp;' + desc + '</li>';
        }

        output += '</ul></div>';
        var items = new Array();
        items[0] = new Array();
        items[0]['a'] = output;
        items[0]['h'] = query + ' (RubyGems)';
        items[0]['s'] = 'RubyGems.org';
        items[0]['u'] = 'http://rubygems.org/search?utf8=%E2%9C%93&query=' + encodeURIComponent(query);
        items[0]['force_big_header'] = true;
        nra(items);
    }
}
