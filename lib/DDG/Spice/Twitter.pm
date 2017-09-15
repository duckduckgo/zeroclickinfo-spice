package DDG::Spice::Twitter;
# ABSTRACT: Twitter information about a user

use strict;
use DDG::Spice;

spice to => 'https://duckduckgo.com/tw.js?user=$1&callback={{callback}}&current=1';

my $grammar = qr/on|at/;
my $other = qr/user|account|id/;

triggers query_lc => qr/^(?:twitter\s)?(?:$other\s)?@([a-z0-9_]+)$/i;
triggers query_lc => qr/^twitter\s(?:$other\s)?([a-z0-9_]+)$/i;
triggers query_lc => qr/^@([a-z0-9_]+)(?:'s)?\s(?:$other\s)?(?:$grammar\s)?twitter?(?:\s$other)?$/i;

# skip words from file
my $skip = join "|", share('skipwords.txt')->slurp(chomp => 1);

handle matches => sub {
    if ($1) {
       return $1 unless ($1 =~ m/^$skip$/i);
    }
    return;
};

1;
