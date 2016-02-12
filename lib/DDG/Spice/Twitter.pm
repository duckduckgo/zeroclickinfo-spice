package DDG::Spice::Twitter;
# ABSTRACT: Twitter information about a user

use strict;
use DDG::Spice;

spice to => 'https://duckduckgo.com/tw.js?user=$1&callback={{callback}}&current=1';
triggers query => qr/^(?:twitter\s)?@([a-z0-9_]+)$|^twitter\s([a-z0-9_]+)$/i;

# skip words from file
my $skip = join "|", share('skipwords.txt')->slurp(chomp => 1);

handle matches => sub {
    if ($1) {
       return $1;
    } elsif ($2) {
       return $2 unless ($2 =~ m/^($skip)$/i)
    }
    return;
};

1;
