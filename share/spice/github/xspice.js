function ddg_spice_github(response) {
    var query = DDG.get_query()
                .replace(/^\s*github\s+/, "");

    repositories = response.data.repositories;
    console.log(repositories);
    results = [];

    repositories.map(function(repo) {
        if (!repo.description) return;
        if (!repo.url)
            repo.url = encodeURI('https://github.com/' + repo.owner + '/' + repo.name);
        var repository = [];
        var ownerURL = repo.url.replace(/[^\/]*$/, "");
        repository['name']        = repo.name;
        repository['url']         = repo.url;
        repository['owner']       = repo.owner;
        repository['ownerURL']    = ownerURL;
        repository['fork']        = repo.fork;
        repository['description'] = repo.description;
        results.push(repository);
    });

    Spice.render({
        data             : { 'repository' : results },
        header1          : query + " (GitHub)",
        source_url       : 'http://www.github.com/search?q='
                            + encodeURIComponent(query),
        source_name      : 'GitHub',
        template_normal  : 'github',
        force_big_header : true
    });
}
