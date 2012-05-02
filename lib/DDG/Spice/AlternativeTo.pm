package DDG::Spice::AlternativeTo;

use DDG::Spice;

triggers start => "free","opensource","commercial";
triggers any => "alternative","alternatives";

spice from => '([^/]+)/(?:([^/]+)/(?:([^/]+)|)|)';
spice to => 'http://api.alternativeto.net/software/$1/?$2&$3&count=6&callback={{callback}}';

my %alternatives = (
    'google' => 'googlecom',
    'photoshop' => 'adobe-photoshop',
    'yahoo' => 'yahoo-search',
    'bing' => 'bingcom',
);

handle query_lc => sub {
    if ($_ =~ /^(?:(free|opensource|commercial))?\s*(?:alternative(?:s|)?\s*?(?:to|for)\s*?)(\b(?!for\b).*?\b)(?:\s*?for\s(.*))?$/) {
	my $prog = $2;
	$prog =~ s/\s+$//g;
	$prog =~ s/^\s+//g;
	$prog =~ s/\s+/-/g;
	$prog = $alternatives{$prog} if exists $alternatives{$prog};

        if ($1 and $3) {
            # license and platform specified - queries like:
            # -> free alternative to firefox for mac
            # -> opensource matlab for linux
            return $prog, "platform=".$3, "license=".$1.'/';
        } elsif ($1 and $prog) {
            # lincense secified only:
            # -> free nod32
            # -> opensource alternative to omnigraffle
            return $prog, "license=".$1.'/';
        } elsif ($3) {
            # platform specified:
            # -> TextMate for windows
            # -> alternative to vim for linux
            return $prog, "platform=".$3.'/';
        } elsif($prog) {
            # license and platform not specified
            # in this case we need to match 'alternative(s) to':
            # -> alternative to firefox
            return $prog.'/';
        }
    }
    return;
};

1;
