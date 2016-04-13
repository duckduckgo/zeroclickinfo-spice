package DDG::Spice::Sentencer;

# ABSTRACT: Output a random number of metaphor sentences.

use strict;
use DDG::Spice;

# spice proxy_cache_valid => "418 1d";

triggers startend => "metaphor", "metaphors", "metaphorpsum", "sentencer";

spice to => 'http://metaphorpsum.com/sentences/$1?format=json';
spice wrap_jsonp_callback => 1;

handle remainder => sub {
    #  print "SAAAAAMMMMMM!!!!!!";
    #     print $_;
    #     $_ = "$_";
    #     print $_;
    
    my $num = shift;

    if (!($num)) {
        $num = 1;
    }
    
    return unless $num && $num =~ qr/^\d+$/;
    return $num;
    return $_;
};

1;
