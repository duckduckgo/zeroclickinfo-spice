package DDG::Spice::HackerNews;

use DDG::Spice;

triggers startend => "hn", "hackernews", "hacker news", "news.yc", "news.ycombinator.com", "hn search";

spice to => 'http://api.thriftdb.com/api.hnsearch.com/items/_search?q=$1&limit=50&weights[title]=1.1&weights[text]=0.7&weights[domain]=2.0&weights[username]=0.1&weights[type]=0.0&weights[points]=1.25&boosts[fields][points]=0.15&boosts[fields][num_comments]=0.15&boosts[functions][pow%282,div%28div%28ms%28create_ts,NOW%29,3600000%29,72%29%29]=200.0&callback={{callback}}';

handle remainder => sub {
    return $_;
};

1;