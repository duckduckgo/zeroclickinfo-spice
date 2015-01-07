package DDG::Spice::UV;
# ABSTRACT: Write an abstract here
# Start at https://duck.co/duckduckhack/spice_overview if you are new
# to instant answer development

use DDG::Spice;

spice is_cached => 1;

# Metadata.  See https://duck.co/duckduckhack/metadata for help in filling out this section.
name "UV Index";
source "EPA - United States Environmental Protection Agency";
icon_url "";
description "Display the UV Index for a given location in the US";
primary_example_queries "uv", "uv index";
secondary_example_queries "optional -- demonstrate any additional triggers";
# Uncomment and complete: https://duck.co/duckduckhack/metadata#category
category "location_aware";
# Uncomment and complete: https://duck.co/duckduckhack/metadata#topics
topics "everyday", "travel", "geography";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/UV.pm";
attribution github => ["https://github.com/Bjoern", "Bjoern Guenzel"],
            twitter => "https://twitter.com/fractality", "Bjoern Guenzel";

# Triggers
triggers any => "triggerWord", "trigger phrase";

# Handle statement
handle remainder => sub {

    # optional - regex guard
    # return unless qr/^\w+/;

    return unless $_;    # Guard against "no answer"

    return $_;
};

1;
