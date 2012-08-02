package DDG::Spice::RandNums;

use DDG::Spice;

attribution github  => ['https://github.com/AlexBio', 'AlexBio'  ],
            web     => ['http://ghedini.me', 'Alessandro Ghedini'];

spice to   => 'http://www.random.org/integers/?num=10&min=$1&max=$2&col=10&base=10&format=plain&rnd=new';
spice from => '([0-9]+)\/([0-9]+)';

spice is_cached => 0;
spice wrap_string_callback => 1;

triggers query_lc => qr/^random (numbers|nums)(?: ([0-9]+)\-([0-9]+)|)$/;

handle matches => sub {
	my (undef, $a, $b) = @_;

	my $min = $a ? $a : 1;
	my $max = $b ? $b : 100;

	return ($min, $max)
};

1;
