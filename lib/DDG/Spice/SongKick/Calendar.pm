package DDG::Spice::SongKick::Calendar;

use DDG::Spice;

triggers any => "songkick calendar";

spice to => 'http://api.songkick.com/api/3.0/$1/$2/calendar.json?&apikey={{ENV{DDG_SPICE_SONGKICK_APIKEY}}}&jsoncallback={{callback}}_calendar';
spice from => '([^/]+)/([^/]+)';

handle remainder => sub {
		
	my $id;
	my $callback;

	if ($_ =~ qr/(artist)_id:(\d+)/) {$id = $2; $callback = $1."s"}
	if ($_ =~ qr/(venue)_id:(\d+)/)  {$id = $2; $callback = $1."s"}

	return $callback, $id if defined $id;
	return;
};
1;