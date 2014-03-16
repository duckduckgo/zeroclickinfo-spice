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

spice to => 'http://httpbin.org/get';
spice wrap_jsonp_callback => 1;

triggers startend => "editor";

my @supported_languages = ("javascript", "python");
my %supported_languages = map { $_ => 1 } @supported_languages;

handle remainder => sub {

    foreach my $param (0, 1) {

        my $lan = $_[$param];        
        if ($lan && exists($supported_languages{$lan})) {
            return $lan;
        }
    }    

    return;
};

1;