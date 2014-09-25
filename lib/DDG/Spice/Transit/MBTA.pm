package DDG::Spice::Transit::MBTA;
# ABSTRACT: Show MBTA Commuter Rail departures for a given station

use strict;
use DDG::Spice;
use YAML::XS qw(Load);

primary_example_queries 'MBTA trains leaving from Plymouth';
secondary_example_queries 'Next MBTA train from Forge Park';
description 'Show MBTA Commuter Rail departures for a given station';
name 'MBTA';
source 'MBTA';
code_url 'https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Transit/MBTA.pm';
topics 'everyday';
category 'time_sensitive';
attribution twitter => 'mattr555',
            github => ['https://github.com/mattr555/', 'Matt Ramina'],
            github => ['elebow', 'Eddie Lebow'];

spice to => 'http://realtime.mbta.com/developer/api/v2/predictionsbystop?api_key={{ENV{DDG_SPICE_MBTA_APIKEY}}}&stop=$1&format=jsonp&jsonpcallback={{callback}}';
spice proxy_cache_valid => '418 1d';

triggers any => 'mbta', 'next train', 'train leaving', 'trains leaving', 'train from', 'train times', 'train schedule';

my %stops = yaml_to_stops(scalar share('stops.yml')->slurp);

#add the canonical names to the arrays in the stop hash
sub yaml_to_stops {
    my $yaml = shift;
    my %data;

    my %yml = %{Load($yaml)};

    while (my ($key, $value) = each %yml) {
        push(@$value, $key); #add the canonical station name to the list of aliases

        foreach (@$value) {    #add a mapping for every alias to the canonical name
            $data{$_} = $key;
        }
    }

    return %data;
}

#find a stop from a partial name (e.g. converts "Plymo" -> "Plymouth")
sub normalize_stop {
    my @matches = ();  #list of stop matches
    my $in = lc $_[0];
    $in =~ s/\bstation//;

    foreach my $alias (keys %stops) {
        #look through each alias of each stop
        return $stops{$alias} if ($in) eq (lc $alias);
        #if the stop name contains the input, add it to matches
        if (index(lc $alias, $in) > -1) {
            push(@matches, $stops{$alias});
            last;
        }
    }
    return $matches[0] if scalar(@matches) == 1;  #if we have one match, return it
    return;  #if we have no matches or too many, then we don't know the stop :(
}

handle remainder => sub {
    s/\b(?:inbound|outbound)\b//g;    #this is handled in the JavaScript, so just strip it here
    return unless /(?:.*from\s+)?(.+)/;

    my $curr = normalize_stop($1);
    return $curr if $curr;

    return;
};

1;
