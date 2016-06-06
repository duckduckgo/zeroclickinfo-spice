package DDG::Spice::Transit::SEPTA;
# ABSTRACT: Information on next trains on SEPTA (Pennsylvania)

use strict;
use DDG::Spice;
use YAML::XS 'LoadFile';

spice to => 'http://www3.septa.org/hackathon/NextToArrive/$1/$2/5/';
spice from => '(.*)/(.*)';
spice wrap_jsonp_callback => 1;
spice proxy_cache_valid => "418 1d";

triggers any => "next train", "train times", "train schedule", "septa";

my %stops = yaml_to_stops(share('stops.yml'));

#add the canonical names to the arrays in the stop hash
sub yaml_to_stops {
    my $yaml = shift;

    my %hash = %{LoadFile($yaml)};
    foreach my $key (keys %hash) {
        if (my $value = $hash{$key}) {
            #there are other aliases, add the canonical name to that array
            push(@$value, $key);
            $hash{$key} = [ @$value ];
        } else {
            #there are no aliases, so just create an anonymous array with the canonical name
            $hash{$key} = [ $key ];
        }
    }
    return %hash;
}

#find a stop from a partial name (e.g. converts "30th street" -> "30th Street Station")
sub normalize_stop {
    my @matches = ();  #list of stop matches
    my $in = lc $_[0];
    $in =~ s/\bstation//;

    foreach my $stop (keys %stops) {
        #look through each alias of each stop
        foreach my $i (@{$stops{$stop}}) {
            #if they're exactly equal, return the stop
            return $stop if ($in) eq (lc $i);
            #if the stop name contains the input, add it to matches
            if (index(lc $i, $in) > -1) {
                push(@matches, $stop);
                last;
            }
        }
    }
    return $matches[0] if scalar(@matches) == 1;  #if we have one match, return it
    return;  #if we have no matches or too many, then we don't know the stop :(
}

handle remainder => sub {
    return unless /^(?:from |to )?(.+) (to|from) (.+)$/;
    my $curr = normalize_stop($1);
    my $tofrom = $2;
    my $dest = normalize_stop($3);

    if ($curr && $dest) {
        #put the stops in the right order (for queries like "septa paoli from strafford")
        return ($tofrom eq 'to' ? ($curr, $dest) : ($dest, $curr));
    }
    return;
};

1;
