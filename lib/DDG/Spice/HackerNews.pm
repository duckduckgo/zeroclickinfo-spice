package DDG::Spice::HackerNews;
# ABSTRACT: Returns hacker news based on given input

use DDG::Spice;

triggers startend => "hn";

spice to => 'http://api.thriftdb.com/api.hnsearch.com/items/_search?q=$1&weights[title]=1.1&weights[text]=0.7&weights[domain]=2.0&weights[username]=0.1&weights[type]=0.0&boosts[fields][points]=0.15&boosts[fields][num_comments]=0.15&boosts[functions][pow%282,div%28div%28ms%28create_ts,NOW%29,3600000%29,72%29%29]=200.0&callback=ddg_spice_hacker_news';

handle remainder => sub {
    return $_ if $_;
    return;   
}

1;
