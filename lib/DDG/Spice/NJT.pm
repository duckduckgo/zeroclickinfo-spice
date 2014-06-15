package DDG::Spice::NJT;

use DDG::Spice;

primary_example_queries "next train from Metropark to New York Penn";
secondary_example_queries "train times to Trenton from Secaucus";
description "Lookup the next NJ Transit train going your way";
name "NJT";
source "NJT";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/NJT.pm";
topics "everyday";
category "time_sensitive";
attribution twitter => 'mattr555',
            github => ['https://github.com/mattr555/', 'Matt Ramina'];

spice to => 'http://njt-api.appspot.com/times/$1';
spice wrap_jsonp_callback => 1;
triggers any => "next train", "train times", "train schedule", "njt", "nj transit", "new jersey transit";

handle remainder => sub {
	/(?:from|to)? (.+) (to|from) (.+)/;
	my $orig = join "-", map { lc } split /\s+/, $1;
	my $dest = join "-", map { lc } split /\s+/, $3;
	return $2 eq 'to' ? ($orig, $dest) : ($dest, $orig);
};

1;