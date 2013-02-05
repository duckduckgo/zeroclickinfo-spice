package DDG::Spice::Dilbert;

use DDG::Spice;

name 'dilbert';
description 'Get the latest Dilbert comic';
source 'dilbert';
primary_example_queries 'dilbert';
category 'special';
topics 'entertainment', 'geek', 'special_interest';
code_url 'https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Dilbert.pm';
attribution web => ['http://dylansserver.com','Dylan Lloyd'],
            email => ['dylan@dylansserver.com','Dylan Lloyd'];
status 'enabled';


triggers any => 'dilbert';

spice to => 'http://comics.signedzero.com/dilbert/feed.json';
spice wrap_jsonp_callback => 1;

spice is_cached => 0;

handle query_lc => sub {
    s/(today'?s )?dilbert( comic)?//g;
    return '' if $_ eq '';
    return;
};

1;
