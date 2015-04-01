package DDG::Spice::DogoBooks;

use DDG::Spice;

primary_example_queries "kids books";
secondary_example_queries "smile kids book", "hunger games books";
description "Search for kids book reviews and ratings";
name "DOGObooks";
code_url "https://github.com/dogomedia/zeroclickinfo-spice/blob/master/lib/DDG/Spice/DogoBooks.pm";
topics "entertainment", "everyday";
category "entertainment";
attribution twitter => ['http://twitter.com/dogobooks','DOGObooks'],
            github  => ['https://github.com/dogomedia','DOGO Media, Inc.'];

triggers any => "dogo", "kids", "kid", "child", "children";

spice to => 'http://api.dogomedia.com/api/v2/books/search.json?query=$1&api_key={{ENV{DDG_SPICE_DOGO_APIKEY}}}';
spice wrap_jsonp_callback => 1;

handle query_lc => sub {
    return $_ if $_ =~ /book/i;
    return;
};

1;
