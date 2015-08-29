package DDG::Spice::PoliticalPolls;
# ABSTRACT: Election and political polls from HuffPost Pollster

use DDG::Spice;

# Caching - https://duck.co/duckduckhack/spice_advanced_backend#caching-api-responses
spice is_cached => 1;

# Metadata.  See https://duck.co/duckduckhack/metadata for help in filling out this section.
name "Political Polls";
source "HuffPost Pollster";
icon_url "http://elections.huffingtonpost.com/favicon.ico";
description "Provides polling data from the United States.";
primary_example_queries "US polls", "polls";
secondary_example_queries "election polls";
# Uncomment and complete: https://duck.co/duckduckhack/metadata#category
category "reference";
# Uncomment and complete: https://duck.co/duckduckhack/metadata#topics
topics "special_interest";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Polls.pm";
attribution github => ["alexander95015", "Alexander"],
            facebook => "alexander95015",
            twitter => "alexander95015";

spice wrap_jsonp_callback => 1;

# API endpoint - https://duck.co/duckduckhack/spice_attributes#spice-codetocode
spice to => 'http://elections.huffingtonpost.com/pollster/api/charts.json';

# Triggers - https://duck.co/duckduckhack/spice_triggers
triggers startend => "poll", "polls";

# Handle statement
handle remainder => sub {

    # optional - regex guard
    # return unless qr/^\w+/;

    return $_;
};

1;
