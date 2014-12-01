package DDG::Spice::TodayInHistory;

use DDG::Spice;

spice is_cached => 0;

name "TodayInHistory";

description "Returns a random event happened the current day in history";
primary_example_queries "today in history", "this day in history";

category "facts";
topics "everyday", "social";

code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/TodayInHistory.pm";
attribution github => ["https://github.com/puskin94", "puskin"];

triggers startend => 'today in history', 'this day in history';

spice to => 'http://history.muffinlabs.com/date';
spice wrap_jsonp_callback => 1;

# Handle statement
handle remainder => sub {

    return $_ if $_;
    return $_;
};

1;
