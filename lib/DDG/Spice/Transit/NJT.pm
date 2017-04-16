package DDG::Spice::Transit::NJT;
# ABSTRACT: Information on next trains on New Jersey Transit

use strict;
use DDG::Spice;
use YAML::XS qw(Load);

spice to => 'http://njt-api.appspot.com/njt/times/$1';
spice wrap_jsonp_callback => 1;
spice proxy_cache_valid => "418 1d";

#load a list of stops so we don't trigger this if we don't get njt stops
#(the triggers are similar to SEPTA's)
my $stops = Load(scalar share('stops.yml')->slurp);

triggers any => "next train", "train times", "train schedule", "njt", "nj transit", "new jersey transit";

handle remainder => sub {
    return unless /(?:from |to )?(.+) (to|from) (.+)/;
    #lowercase the stop names found in the query and remove some punctuation
    my $orig = lc $1;
    my $dest = lc $3;
    my $direction = lc $2;
    $orig =~ s/[\.\/\(\)]//g;
    $dest =~ s/[\.\/\(\)]//g;
    
    if (exists $stops->{$orig} && exists $stops->{$dest}) {
        #change the spaces to dashes
        $orig =~ s/\s+/-/g;
        $dest =~ s/\s+/-/g;
        #if the word between the two stop names is "to", then we're going from the first stop to the second
        #if it's "from", then we're going from the second stop to the first
        return $direction eq 'to' ? ($orig, $dest) : ($dest, $orig);
    }
    return;
};

1;
