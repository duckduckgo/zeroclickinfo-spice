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

my @triggers = ( 
"dogonews", 
"dogo news", 

"kids current event", 
"kids current event article", 
"kids current event articles", 
"kids current event news", 

"kids current events", 
"kids current events article", 
"kids current events articles", 
"kids current events news",

"kids news", 
"kids news article", 
"kids news articles", 

"news article for children", 
"news article for kids", 
"news article for students", 

"news articles for children", 
"news articles for kids", 
"news articles for students", 

"news for children",
"news for kids",
"news for students", 

"children's current event", 
"children's current event article", 
"children's current event articles", 

"children's current events", 
"children's current events article", 
"children's current events articles", 

"children's news", 

"current event article",

"current event article for children", 
"current event article for kids", 
"current event article for students", 

"current event articles",

"current event articles for children", 
"current event articles for kids", 
"current event articles for students", 

"current event for children", 
"current event for kids", 
"current event for students", 

"current events article for children", 
"current events article for kids", 
"current events article for students", 

"current events articles",

"current events articles for children", 
"current events articles for kids", 
"current events articles for students", 

"current events for children", 
"current events for kids", 
"current events for students", 

"current event",
"current events"
);
triggers startend => @triggers;

spice to => 'http://api.dogomedia.com/api/v2/news/search.json?query=$1&api_key={{ENV{DDG_SPICE_DOGO_NEWS_APIKEY}}}';
spice wrap_jsonp_callback => 1;

handle remainder => sub {
    return $_ if $_;
    return "latest";
};

1;
