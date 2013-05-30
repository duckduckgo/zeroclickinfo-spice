package DDG::Spice::RandNums;
# ABSTRACT: Get a sequence of random numbers

use DDG::Spice;

primary_example_queries "random numbers 10 11";
description "Displays a random number";
name "RandNums";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/RandNums.pm";
topics "special_interest", "everyday", "math";
category "random";
attribution github  => ['https://github.com/ghedo', 'ghedo'      ],
            web     => ['http://ghedini.me', 'Alessandro Ghedini'];
status "disabled";

spice to   => 'http://www.random.org/integers/?num=10&min=$1&max=$2&col=10&base=10&format=plain&rnd=new';
spice from => '(\-?[0-9]+)\/(\-?[0-9]+)';

spice is_cached => 0;
spice proxy_cache_valid => "418 1d";
spice wrap_string_callback => 1;

triggers query_lc => qr/^(?:rand|random) (?:numbers?|nums?)(?: (\-?[0-9]+)\s*-?\s*(\-?[0-9]+))?$/;

handle matches => sub {
    my ($min, $max) = @_;

	$min = 1   unless defined $min;
	$max = 100 unless defined $max;

	$min = -1000000000 if $min < -1000000000;
	$max =  1000000000 if $max >  1000000000;

	return $max, $min if $min >= $max;
    return $min, $max;
};

1;
