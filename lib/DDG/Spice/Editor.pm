package DDG::Spice::Editor;
# ABSTRACT: Editor with syntax highlighting

use strict;
use utf8;
use DDG::Spice;
use URI::Escape;
use Encode;

triggers startend => 'web editor', 'online editor', 'syntax highlighter', 'syntax highlighting', 'code viewer', 'scratchpad', 'scratch pad';
spice call_type => 'self';

my @supported_languages = ("javascript", "python");
my %supported_languages = map { $_ => 1 } @supported_languages;

handle remainder => sub {

    foreach my $param (0, 1) {
        my $lan = $_[$param];
        if ($lan && exists($supported_languages{lc $lan})) {
            return $lan;
        }
    }

    return;
};

1;
