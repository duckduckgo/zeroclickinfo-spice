package DDG::Spice::DogoNews;

use DDG::Spice;

primary_example_queries "kids news";
secondary_example_queries "obama kids news", "nasa news articles for kids";
description "Search the DOGOnews database for kids news articles and current events";
name "DOGOnews";
code_url "https://github.com/dogomedia/zeroclickinfo-spice/blob/master/lib/DDG/Spice/DogoNews.pm";
topics "everyday", "social", "science";
category "time_sensitive";
attribution github => ['https://github.com/dogomedia','DOGO Media'];

triggers any => "dogonews", "dogo news", "news", "newspaper", "current event", "current events", "article", "articles";
triggers start => "kids", "children's", "childrens", "student's", "students";
triggers end => "for kids", "for children", "for students";

spice to => 'http://api.dogomedia.com/api/v2/news/search.json?query=$1&api_key={{ENV{DDG_SPICE_DOGO_NEWS_APIKEY}}}';
spice wrap_jsonp_callback => 1;

handle remainder => sub {
    return $_ if $_ =~ /(kid|children|student)/i;
    
    # Handles queries like 'science for kids', 'social studies for students'
    # Handles queries like 'kids science', 'student's social studies'
    return $_ if $_ =~ /(science|social studies)/i;     
    
    # Handles queries like 'kids news', 'kids current events'
    return $_ if $_ =~ /(news|current event|article)/i; 
    
    return "latest" if $_ eq '';
    return;
};

1;
