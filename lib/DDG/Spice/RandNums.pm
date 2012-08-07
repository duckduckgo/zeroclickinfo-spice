package DDG::Spice::RandNums;
# ABSTRACT: Get a sequence of random numbers

use DDG::Spice;

use Encode;

attribution github  => ['https://github.com/AlexBio', 'AlexBio'  ],
            web     => ['http://ghedini.me', 'Alessandro Ghedini'];

spice to   => 'http://www.random.org/integers/?num=10&min=$1&max=$2&col=10&base=10&format=plain&rnd=new';
spice from => '(\-?[0-9]+)\/(\-?[0-9]+)';

spice is_cached => 0;
spice proxy_cache_valid => "418 1d";
spice wrap_string_callback => 1;

triggers query_lc => qr/^(rand|random) (numbers|nums)(?: (\-?[0-9]+)\-(\-?[0-9]+)|)$/;

handle matches => sub {
	my (undef, undef, $a, $b) = @_;

	my $min = $a ? decode_utf8($a) : 1;
	my $max = $b ? decode_utf8($b) : 100;

	$min = -1000000000 if $min < -1000000000;
	$max =  1000000000 if $max >  1000000000;

	return ($min, $max)
};

1;
