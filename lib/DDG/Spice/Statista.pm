package DDG::Spice::Statista;
# ABSTRACT: Returns statistics from statista.com.

use strict;
use DDG::Spice;

primary_example_queries "statistics about soccer";
description "Shows example statistics";
name "Statista";
category "facts";

my $limit = 16;
my $lang = "en";

triggers startend => "statistic", "statistics", "stats";

spice to => 'https://api.statista.com/searchJson/apiKey/{{ENV{DDG_SPICE_STATISTA_APIKEY}}}/q/$1/sort/0/lang/'.$lang.'/limit/'.$limit.'/datefrom/0/dateto/0';

spice wrap_jsonp_callback => 1;

handle query_lc => sub {
    if(m{stat(istic)?s? (on|of|for|about) (.+)}) {
        return $3;
    }
    if(m{stat(istic)?s? (.+)}) {
        return $2;
    }
    if(m{(.+) stat(istic)?s?$}) {
        return $1;
    }
    return;
};

1;
