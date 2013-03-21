function ddg_spice_github(response) {
    var query = DDG.get_query()
                .replace(/^\s*github\s+/, "");

    repos = re.data.repositories;
    console.log(repos);

    Spice.render({
        data             : { 'test' : 'test' },
        header1          : query + " (GitHub)",
        source_url       : 'http://www.github.com/search?q='
                            + encodeURIComponent(query),
        source_name      : 'GitHub',
        template_normal  : 'github',
        force_big_header : true
    });
}
