package DDG::Spice::TravisStatus;
# ABSTRACT: Search for the current status of Travis CI.

use strict;
use DDG::Spice;
use Text::Trim;

primary_example_queries "travis status";
description "Travis CI status";
name "Travis Status";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/TravisStatus.pm";
topics "computing", "programming";
category "programming";
attribution github => ['https://github.com/josephwegner','Joe Wegner'],
            twitter => ['https://www.twitter.com/Joe_Wegner','Joe_Wegner'];

my @triggers = ('travisci', 'travis continuous integration', 'travis ci', 'travis');
my $triggers = join '|', @triggers;
triggers any => @triggers;

spice to => 'http://www.traviscistatus.com/index.json';
spice wrap_jsonp_callback => 1;

handle query_lc => sub {
    my $query = trim($_); # trim
    return $query if $query =~ m/^travis(\s)?ci$/; # return if travisci, travis ci
    $query =~ s/$triggers\s+//g; # remove triggers
    return trim($query) if $query =~ /^(is\s*)?(system)?\s*(status|up|down)\??$/i; # return if query contains status etc
    return;
};

1;
