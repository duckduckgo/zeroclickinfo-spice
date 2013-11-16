package DDG::Spice::Editor;

use DDG::Spice;

primary_example_queries "editor";
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

triggers any => "editor";

handle remainder => sub {    

    return $_;
};

1;