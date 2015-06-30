package DDG::Spice::Icon;
# ABSTRACT: Find icons for the given term

use DDG::Spice;

# Caching - https://duck.co/duckduckhack/spice_advanced_backend#caching
spice is_cached => 1;

# Metadata.  See https://duck.co/duckduckhack/metadata for help in filling out this section.
name "Icon";
source "IconFinder";
icon_url "https://api.iconfinder.com/favicon.ico";
description "Find icons for the given term";
primary_example_queries "first example query", "second example query";
secondary_example_queries "optional -- demonstrate any additional triggers";
category "reference";
topics "web_design";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Icon.pm";
attribution github => ["iambibhas", "Bibhas D"],
            twitter => "bibhasdn";

# API endpoint - https://duck.co/duckduckhack/spice_attributes#spice-codetocode
spice to => 'https://api.iconfinder.com/v2/icons/search?query=$1&style=&vector=all&premium=$2';
spice wrap_jsonp_callback => 1;

spice from => '(.+)/(.+)';

# Triggers - https://duck.co/duckduckhack/spice_triggers
triggers startend => "icon", "icons", "free icon", "icon free",
                     "premium icon", "icon premium";

# Handle statement
handle query_lc => sub {
    $_ =~ s/\s?icons?\s?//g;
    my $premium = 'all';

    if (index($_, 'free') != -1) {
        $premium = '0';
        $_ =~ s/\s?free\s?//g;
    } elsif (index($_, 'premium') != -1) {
        $premium = '1';
        $_ =~ s/\s?premium\s?//g;
    }

    # for queries like `free premium icons`
    $_ =~ s/\s?(free|premium)\s?//g;

    return unless $_;
    return $_, $premium;
};

1;
