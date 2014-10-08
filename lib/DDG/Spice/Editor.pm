package DDG::Spice::Editor;

use DDG::Spice;
use URI::Escape;
use Encode;

primary_example_queries "python editor";
secondary_example_queries "python editor", "javascript editor";
description "Show a text editor with sintax highlighting";
name "Editor";
source "http://ace.c9.io/";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Editor.pm";
topics "programming";
category "software";

attribution github => ['https://github.com/jmg','Juan Manuel García'],
            email => ['jmg.utn@gmail.com','Juan Manuel García'];


triggers startend => 'web editor', 'online editor', 'syntax highlighter', 'syntax highlighting', 'code viewer';
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
