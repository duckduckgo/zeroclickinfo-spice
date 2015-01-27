package DDG::Spice::Transit::PATH;

use DDG::Spice;

primary_example_queries "next train from JSQ to WTC";
secondary_example_queries "train times to hoboken from 33rd street";
description "Lookup the next PATH train going your way";
name "PATH";
source "PATH";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/PATH.pm";
topics "everyday";
category "time_sensitive";
attribution twitter => 'mattr555',
            github => ['https://github.com/mattr555/', 'Matt Ramina'];

spice to => 'http://njt-api.appspot.com/path/times/$1';
spice wrap_jsonp_callback => 1;
spice proxy_cache_valid => "418 1d";

#load a list of stops so we don't trigger this if we don't get njt stops
#(the triggers are similar to other transit IAs)
my @stops = share('stops.txt')->slurp;

#check if the stop name is in the list of stops
#(using the same matching algorithm as the backend)
sub is_stop {
    foreach my $stop (@stops){
        return 1 if index(lc $stop, lc $_[0]) > -1;
    }
    return;
};

triggers any => "next train", "train times", "train schedule", "path", "trans hudson";

handle remainder => sub {
    return unless /(?:from |to )?(.+) (to|from) (.+)/;
    my $orig = $1;
    my $dest = $3;
    if (is_stop($orig) and is_stop($dest)){
        #lowercase the stop names found in the query and change the spaces to dashes
        my $orig = join "-", map { lc } split /\s+/, $orig;
        my $dest = join "-", map { lc } split /\s+/, $dest;
        #if the word between the two stop names is "to", then we're going from the first stop to the second
        #if it's "from", then we're going from the second stop to the first
        return $2 eq 'to' ? ($orig, $dest) : ($dest, $orig);
    }
    return;
};

1;