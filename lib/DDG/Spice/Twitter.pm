package DDG::Spice::Twitter;
# ABSTRACT: Twitter information about a user

use strict;
use DDG::Spice;

spice to => 'https://duckduckgo.com/tw.js?user=$1&callback={{callback}}&current=1';
spice proxy_cache_valid => '200 1h';

my $grammar = qr/(?:on)?(?:at)?/io;
my $other = qr/(?:user)?(?:account)?(?:id)?/io;

triggers query => qr/^(?:twitter\s)?(?:$other\s)?@([a-z0-9_]+)$|^twitter\s(?:$other\s)?([a-z0-9_]+)$|^([a-z0-9_]+)\s(?:$other\s)?(?:$grammar\s)?(?:twitter)$|^@([a-z0-9_]+)\s(?:$other\s)?(?:$grammar\s)?(?:twitter)?$/i;

# skip words from file
my $skip = join "|", share('skipwords.txt')->slurp(chomp => 1);

handle matches => sub {
    if ($1) {
       return $1;
    } elsif ($2) {
       return $2 unless ($2 =~ m/^($skip)$/i);
    } elsif($3) {
        return $3 unless ($3 =~ m/^($skip)$/i);
    } elsif($4) {
        return $4;
    }
    return;
};

1;
