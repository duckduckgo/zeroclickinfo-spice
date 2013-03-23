function ddg_spice_reddit(response) {    
    var query = DDG.get_query();
    var subreddit = query.match(/\/?r\/\w+/);
    var restrict_sr = false;
    var header = '(Reddit)';
    if (subreddit) {
        subreddit = subreddit[0];
        restrict_sr = 'true';
    } else if (query.split(' ')[0] == 'subreddit') {
        subreddit = query.split(' ')[1];
        restrict_sr = 'true';
    }
    if (restrict_sr == 'true') {
        subreddit.replace(/^\/?r\//g, '');
        header = '(<a href="http://reddit.com' + subreddit
               + '">subreddit ' + subreddit + '</a>)';
    }
    query = query.replace(/^\s*(\/?r\/\w+|reddit|subreddit\s*\w+)\s+/, "");
    header = query + ' ' + header;

    var source = "http://www.reddit.com/r/";
    if (restrict_sr) {
        source += subreddit.substr(3)
                + '/search?q=' + query
                + '&restrict_sr=true&sort=relevance';
    } else {
        source += 'duckduckgo/search?q=' + query
                + '&restrict_sr=false&sort=relevance';
    }

    var repositories = response.data.children.splice(0, 4)
                       .map(function(repository) {
                           repository = repository.data;
                           repository.comments = repository.num_comments + " comment"
                                               + (repository.num_comments === 1 ? '' : 's');
                           repository.score = repository.score
                                            + (repository.score === 1 ? " point)" : " points)")
                           return repository;
                       });

    Spice.render({
        data              : { 'repository' : repositories },
        header1           : header,
        source_url        : source,
        source_name       : 'Reddit',
        template_normal   : 'reddit',
        force_big_header  : true,
        force_space_after : true,
    });
};
