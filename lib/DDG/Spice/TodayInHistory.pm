package DDG::Spice::TodayInHistory;

use DDG::Spice;

name 'Today In History';
description 'this day in history';
source 'History.com';
primary_example_queries 'xkcd';
secondary_example_queries 'xkcd 102';
category 'facts';
topics 'everyday', 'special_interest';
icon_url 'http://www.history.com/favicon.ico';
code_url 'https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/TodayInHistory.pm';
attribution web => [ 'https://www.duckduckgo.com', 'DuckDuckGo' ],
            github => [ 'https://github.com/duckduckgo', 'duckduckgo'],
            twitter => ['http://twitter.com/duckduckgo', 'duckduckgo'];

triggers startend => (
    'today in history',
    'todays in history',
    'this day in history',
);

spice to => 'http://www.history.com/this-day-in-history/rss';

spice wrap_string_callback => 1;

handle remainder => sub {
	return '' if $_ eq '';
	return;
};

1;
