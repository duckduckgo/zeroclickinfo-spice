function ddg_spice_github(response) {
    var query = DDG.get_query()
                .replace(/^\s*github\s+/, "");

    var repositories = response.data.repositories;
    var results = [];

    console.log(repositories);

    var singleRepository;

    repositories.map(function(repository) {
        if (!repository.description) return;
        if (!repository.url)
            repository.url =
                encodeURI('https://github.com/'
                    + repository.owner + '/' + repository.name);
        var result = [];
        var ownerURL = repository.url.replace(/[^\/]*$/, "");
        result['name']        = repository.name;
        result['url']         = repository.url;
        result['owner']       = repository.owner;
        result['ownerURL']    = ownerURL;
        result['fork']        = repository.fork;
        result['description'] = repository.description;
        singleRepository = repository;
        results.push(repository);
    });

    if (results.length == 0) return;
    else if (results.length == 1) {
        var repository = singleRepository;
        last_pushed = Math.floor((new Date() - new Date(repository.pushed) ) / (1000*60*60*24));
        var years_ago = Math.floor(last_pushed / 365);
        if (years_ago >= 1) {
            last_pushed = years_ago + " year" + (years_ago == 1 ? "" : "s") + " ago";
        } else if (last_pushed == 0) {
            last_pushed = "today";
        } else if (last_pushed == 1) {
            last_pushed = "yesterday";
        } else {
            last_pushed = last_pushed + " day" + (last_pushed == 1 ? "" : "s") + " ago";
        }
//        content =  "<i>Description</i>: " + repository.description + "<br>"
//                +  "<i>Author</i>: " + repository.owner + "<br>"
//                +  "<i>Homepage</i>: " + "<a hrepositoryf='"
//                +  url + "'>" + repository.homepage.repositoryplace(/^https?:\/\/|\/$/gi, '')
//                +  "</a><br>" + "<i>Activity</i>: last updated " + last_pushed
//                +  ", " + repository.watchers + " watching, "
//                +  repository.forks + "<a hrepositoryf='"
//                +  repository.url + "/network'> forks</a> and "
//                +  repository.open_issues + "<a hrepositoryf='" + repository.url
//                +  "/issues'> issues</a>"
//                +  "<br>";
    }

    Spice.render({
        data             : { 'repository' : results },
        header1          : query + " (GitHub)",
        source_url       : 'http://www.github.com/search?q='
                            + encodeURIComponent(query),
        source_name      : 'GitHub',
        template_normal  : (results.length == 1 ? 'single' : 'list'),
        force_big_header : true
    });
}
