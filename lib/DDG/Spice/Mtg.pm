package DDG::Spice::Mtg;

# mtg <card name> Returns infos on the Magic The Gathering Card

use DDG::Spice;

triggers start => 'mtg';
spice to => 'http://api.mtgdb.info/cards/$1';
spice wrap_jsonp_callback => 1;

handle remainder => sub {
	$_ =~ s/\://;
    return $_ if $_;
    return;
};

1;

