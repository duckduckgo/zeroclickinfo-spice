package DDG::Spice::TravisStatus;
# ABSTRACT: Search for the current status of Travis CI.

use strict;
use DDG::Spice;
use Text::Trim;

my @triggers = ('travisci', 'travis continuous integration', 'travis ci', 'travis');
my $triggers = join '|', @triggers;
triggers any => @triggers;

spice to => 'https://www.traviscistatus.com/index.json';
spice wrap_jsonp_callback => 1;

handle query_lc => sub {
    my $query = trim($_); # trim
    return $query if $query =~ m/^travis(\s)?ci$/; # return if travisci, travis ci
    $query =~ s/$triggers\s+//g; # remove triggers
    return trim($query) if $query =~ /^(is\s*)?(system)?\s*(status|up|down)\??$/i; # return if query contains status etc
    return;
};

1;
