package DDG::Spice::PoliticalPolls;
# ABSTRACT: Election and political polls from HuffPost Pollster

use DDG::Spice;

spice is_cached => 1;

spice wrap_jsonp_callback => 1;

spice to => 'http://elections.huffingtonpost.com/pollster/api/charts.json?state=US';

# Triggers - https://duck.co/duckduckhack/spice_triggers
triggers startend => "election poll", "election polls";

handle remainder => sub {
    return $_;
};

1;
