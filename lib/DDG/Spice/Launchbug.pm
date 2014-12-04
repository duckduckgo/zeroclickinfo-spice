package DDG::Spice::Launchbug;
# ABSTRACT: Write an abstract here
# Start at https://duck.co/duckduckhack/spice_overview if you are new
# to instant answer development

use DDG::Spice;

spice is_cached => 1;

# Metadata.  See https://duck.co/duckduckhack/metadata for help in filling out this section.
name "Launchbug";
description "Succinct explanation of what this instant answer does";
primary_example_queries "first example query", "second example query";
secondary_example_queries "optional -- demonstrate any additional triggers";
# Uncomment and complete: https://duck.co/duckduckhack/metadata#category
# category "";
# Uncomment and complete: https://duck.co/duckduckhack/metadata#topics
# topics "";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Launchbug.pm";
attribution github => ["GitHubAccount", "Friendly Name"],
            twitter => "twitterhandle";

# Triggers
triggers startend => "launchbug";
spice to => 'https://api.launchpad.net/devel/bugs/$1?ws.accept=application%2Fjson';
spice wrap_jsonp_callback => 1;

# Handle statement
handle remainder => sub {

    my $num = shift;
    return unless $num;
    return unless $num =~ qr/^\d+$/;
    return $num;
    return $_;

};

1;
