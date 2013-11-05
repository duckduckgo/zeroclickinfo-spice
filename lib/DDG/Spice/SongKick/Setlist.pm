package DDG::Spice::SongKick::Setlist;

use DDG::Spice;

triggers any => "songkick setlist";

spice to => 'http://api.songkick.com/api/3.0/events/$1/setlist.json?&apikey={{ENV{DDG_SPICE_SONGKICK_APIKEY}}}&jsoncallback={{callback}}_setlist';

handle remainder => sub {
	my $event_id;
	if ($_ =~ qr/event_id:(\d+)/) {
		$event_id = $1;
		return $event_id;
	}

	return;
};
1;