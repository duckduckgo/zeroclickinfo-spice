package DDG::Spice::PoliticalPolls;
# ABSTRACT: Election and political polls from HuffPost Pollster

use DDG::Spice;

spice is_cached => 1;

name "Political Polls";
source "HuffPost Pollster";
icon_url "http://elections.huffingtonpost.com/favicon.ico";
description "Provides polling data from the United States.";
primary_example_queries "US polls", "polls";
secondary_example_queries "election polls";
category "reference";
topics "special_interest";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/PoliticalPolls.pm";
attribution github => ["alexander95015", "Alexander"],
            facebook => "alexander95015",
            twitter => "alexander95015";

spice wrap_jsonp_callback => 1;

spice to => 'http://elections.huffingtonpost.com/pollster/api/charts.json?state=US';

triggers startend => "poll", "polls";

handle remainder => sub {
    return $_;
};

1;
