package DDG::Spice::Automeme;

# ABSTRACT: DuckDuckGo + Automeme.net = profound nonsense

use DDG::Spice;

primary_example_queries "random meme";
secondary_example_queries "automeme", "meme generator";
description "Generate a random meme";
name "Automeme";
icon_url "/i/blog.automeme.net.ico";
source "Automeme";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Automeme.pm";
topics "special_interest";
category "random";
attribution github => ['https://github.com/mjgardner','Mark Gardner'];

spice to => 'http://api.automeme.net/html.json?lines=1$1&callback={{callback}}';
spice wrap_jsonp_callback => 1;
spice proxy_cache_valid   => "418 1d";
spice is_unsafe => 1;

triggers any => "automeme", "random meme", "meme generator";

handle remainder => sub {

   # If you liked Automeme before it was cool, use the vocab=hipster parameter
   # for some unique hipster words.
    /hipster/i and return '&vocab=hipster';
    return q{};
};

1;
