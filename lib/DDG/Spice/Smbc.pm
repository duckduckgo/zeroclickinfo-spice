package DDG::Spice::Smbc;

use DDG::Spice;

name 'smbc';
description 'Get the latest Saturday Morning Breakfast Cereal comic';
source 'smbc';
primary_example_queries 'smbc';
category 'special';
topics 'entertainment', 'geek', 'special_interest';
code_url 'https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Smbc.pm';
attribution web => ['http://dylansserver.com','Dylan Lloyd'],
            email => ['dylan@dylansserver.com','Dylan Lloyd'];
status 'enabled';


triggers any => 'smbc';

spice to => 'http://comics.signedzero.com/smbc/feed.json';
spice wrap_jsonp_callback => 1;

spice is_cached => 0;

handle query_lc => sub {
    s/(today'?s )?smbc( comic)?//g;
    return '' if $_ eq '';
    return;
};

1;
