package DDG::Spice::SongKick::Event;

use DDG::Spice;

triggers any => "songkick event", "songkick", "event";

spice to => 'http://api.songkick.com/api/3.0/events.json?artist_name=$1&location=$2&apikey={{ENV{DDG_SPICE_SONGKICK_APIKEY}}}&jsoncallback={{callback}}_event';
spice from => '(.*)?-(.*)?';

handle remainder => sub {
	if ($_ =~ qr/(?:artist_name=(\w+))?(?:location=(\w+))?/i) {
		my $artist = $1 if defined $1;
		my $location = $2 if defined $2;
		return $1."-".$2;
	};
	return;
};
1;