package DDG::Spice::Statista;
# ABSTRACT: Returns statistics from statista.com.

use strict;
use DDG::Spice;

primary_example_queries "statistics about soccer";
description "Shows example statistics";
name "Statista";
category "facts";

my $api_key = '5db81c2a174170dac75620a16f553dd9';
my $limit = 16;
my $lang = 2;
my @triggers = share('triggers.txt')->slurp;

triggers any => @triggers;

spice to => 'http://ec2-use-api-1397534038.us-east-1.elb.amazonaws.com/searchJson/apiKey/'.$api_key.'/q/$1/sort/0/lang/'.$lang.'/limit/'.$limit.'/datefrom/0/dateto/0';

spice wrap_jsonp_callback => 1;

handle remainder => sub {
    return $_ if $_;
    return;
};

1;
