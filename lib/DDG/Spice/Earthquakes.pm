package DDG::Spice::Earthquakes;

use DDG::Spice;
use POSIX;

triggers any => 'earthquake', 'earthquakes';

spice to => 'http://www.seismi.org/api/eqs/$1/$2?limit=900';
spice from => '([^/]+)(?:/([^/]+))?';

spice proxy_cache_valid => "1h";
spice wrap_jsonp_callback => 1;

my %months = (
	'january'   => '01',
	'february'  => '02',
	'march'     => '03',
	'april'     => '04',
	'may'       => '05',
	'june'      => '06',
	'july'      => '07',
	'august'    => '08',
	'september' => '09',
	'october'   => '10',
	'november'  => '11',
	'december'  => '12',
); 

handle remainder => sub {
	my $year = 'foo';
	my $month = 'foo';
	foreach my $word (split(' ', $_)) {
		$year = $word if ($word =~ /\d{4}/);
		$month = $months{lc $word} if (exists $months{lc $word});
	}
	if (($month ne "foo") && ($year eq "foo")) { $year = floor(time / 31536000) + 1970; }
	return $year, $month
};

1;
