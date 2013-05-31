package DDG::Spice::AlternativeTo;

use DDG::Meta::Information;
use DDG::Spice;

triggers start => "free","opensource","commercial";
triggers any => "alternative","alternatives";

spice from => '([^/]+)/(.*?)/([^/]*)';
spice to => 'http://api.alternativeto.net/software/$1/?platform=$2&license=$3&count=12&callback={{callback}}';

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
    'mac-os-x' => 'mac-os'
);

handle query_lc => sub {
    if (/^(?:(free|open\ssource|commercial))?\s*(?:alternative(?:s|)?\s*?(?:to|for)\s*?)(\b(?!for\b).*?\b)(?:\s*?for\s(.*))?$/) {
        my $license = $1 || "";
        my $prog = $2 || "";
        my $platform = $3 || "";

        $license =~ s/\s+//;

        $prog =~ s/\s+$//g;
        $prog =~ s/^\s+//g;
        $prog =~ s/\s+/-/g;
        $prog = $alternatives{$prog} if exists $alternatives{$prog};

        if($platform) {
            return $prog, $platform, $license;
        }
        return $prog, "all", $license;
    }
    return;
};

1;
