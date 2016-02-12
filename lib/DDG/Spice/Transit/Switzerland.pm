package DDG::Spice::Transit::Switzerland;
# ABSTRACT: Returns train times between stations in Switzerland (and some major European cities)

use strict;
use utf8;
use DDG::Spice;
use YAML::XS 'LoadFile';

spice to => 'http://transport.opendata.ch/v1/connections?from=$1&to=$2';
spice from => '(.*)/(.*)';
spice wrap_jsonp_callback => 1;
spice proxy_cache_valid => "418 1d";

triggers startend => "next train", "train times", "train schedule";

#load a list of stops so we don't trigger this if we don't get train stops
#(the triggers are similar to SEPTA's)
my $stops = LoadFile(share('stops.yml'));

handle remainder => sub {
    return unless /(?:from |to )?(.+) (to|from) (.+)/;
    my $orig = $1;
    my $direction = $2;
    my $dest = $3;
    #check if the stop name is in the list of stops
    if (exists $stops->{$orig} && exists $stops->{$dest}) {
        #lowercase the stop names found in the query and change the spaces to dashes
        my $orig = join "-", map { lc } split /\s+/, $orig;
        my $dest = join "-", map { lc } split /\s+/, $dest;
        $orig =~ s/airport/airp\./ig;
        $dest =~ s/airport/airp\./ig;
        #if the word between the two stop names is "to", then we're going from the first stop to the second
        #if it's "from", then we're going from the second stop to the first
        return $direction eq 'to' ? ($orig, $dest) : ($dest, $orig);
    }
    return;
};

1;
