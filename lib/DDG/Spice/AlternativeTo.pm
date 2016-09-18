package DDG::Spice::AlternativeTo;
# ABSTRACT: Alternative software for some other software

use strict;
use DDG::Spice;

triggers start => "free","opensource","commercial";
triggers any => "alternative","alternatives","alternativeto";

spice from => '([^/]+)/(.*?)/([^/]*)';
spice to => 'http://api.alternativeto.net/software/$1/?platform=$2&license=$3&count=12&callback={{callback}}&key={{ENV{DDG_SPICE_ALTERNATIVETO_APIKEY}}}';

my %alternatives = (
    'google' => 'googlecom',
    'photoshop' => 'adobe-photoshop',
    'yahoo' => 'yahoo-search',
    'bing' => 'bingcom',
    'mac-os-x' => 'mac-os'
);

handle query_lc => sub {
    if (/^(?:(free|open\s?source|commercial))?\s*(?:alternative(?:s|)?\s*?(?:to|for)\s*?)(\b(?!for\b).*?\b)(?:\s*?for\s(.*))?$/) {
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
