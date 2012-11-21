package DDG::Spice::AlternativeTo;

use DDG::Meta::Information;
use DDG::Spice;

triggers start => "free","opensource","commercial";
triggers any => "alternative","alternatives";

spice from => '([^/]+)/?(?:([^/]+)/?(?:([^/]+)|)|)';
spice to => 'http://api.alternativeto.net/software/$1/?platform=$2&license=$3&count=6&callback={{callback}}';

primary_example_queries "alternative to notepad";
secondary_example_queries "alternative to photoshop for mac", "free alternative to spotify for windows";
description "Find software alternatives";
name "AlternativeTo";
icon_url "/i/alternativeto.net.ico";
source "AlternativeTo";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/AlternativeTo.pm";
topics  "everyday", "programming";
category  "computing_tools";

attribution github => ['https://github.com/Getty','Torsten Raudssus'],
           twitter => ['https://twitter.com/raudssus','Torsten Raudssus'];

my %alternatives = (
    'google' => 'googlecom',
    'photoshop' => 'adobe-photoshop',
    'yahoo' => 'yahoo-search',
    'bing' => 'bingcom',
);

handle query_lc => sub {
    if (/^(?:(free|opensource|commercial))?\s*(?:alternative(?:s|)?\s*?(?:to|for)\s*?)(\b(?!for\b).*?\b)(?:\s*?for\s(.*))?$/) {
        my ($license, $prog, $platform) = ($1, $2, $3);
        $prog =~ s/\s+$//g;
        $prog =~ s/^\s+//g;
        $prog =~ s/\s+/-/g;
        $prog = $alternatives{$prog} if exists $alternatives{$prog};
	
        if ($license && $prog && $platform) {
            # license and platform specified - queries like:
            # -> free alternative to firefox for mac
            # -> opensource matlab for linux
            return $prog, $platform, $license;
        } elsif ($license && $prog) {
            # lincense secified only:
            # -> free nod32
            # -> opensource alternative to omnigraffle
            return $prog, $license;
        } elsif ($platform && $prog) {
            # platform specified:
            # -> TextMate for windows
            # -> alternative to vim for linux
            return $prog, $platform;
        } elsif($prog) {
            # license and platform not specified
            # in this case we need to match 'alternative(s) to':
            # -> alternative to firefox
            return $prog;
        }
    }
    return;
};

1;
