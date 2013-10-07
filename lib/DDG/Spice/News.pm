package DDG::Spice::News;

use DDG::Spice;

triggers startend => "news";
spice to => 'https://duckduckgo.com/news.js?q=$1&cb={{callback}}';

handle query_lc => sub {
    return $_ if $_;
    return;
};

1;
