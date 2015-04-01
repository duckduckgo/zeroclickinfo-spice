package DDG::Spice::DogoNews;

use DDG::Spice;

primary_example_queries "kids news", "current events", "news for kids";
secondary_example_queries "obama kids news", "nasa news articles", "kids science", "social studies for kids";
description "Search for kids news articles and current events";
name "DOGOnews";
code_url "https://github.com/dogomedia/zeroclickinfo-spice/blob/master/lib/DDG/Spice/DogoNews.pm";
topics "everyday", "social", "science";
category "time_sensitive";
attribution twitter => ['http://twitter.com/dogonews','dogonews'],
            facebook => ['https://www.facebook.com/pages/DOGONews/132351663495902', 'DOGOnews'],            
            github  => ['https://github.com/dogomedia','DOGO Media, Inc.'];

triggers any => "dogo", "kids", "kid", "child", "children", "student", "students";

spice to => 'http://api.dogomedia.com/api/v2/news/search.json?query=$1&api_key={{ENV{DDG_SPICE_DOGO_APIKEY}}}';
spice wrap_jsonp_callback => 1;

handle query_lc => sub {
    return $_ if $_ =~ /(news|newspaper|current event)/i;
    return;
};

1;
