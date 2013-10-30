package DDG::Spice::CodeEditor;

use DDG::Spice;

primary_example_queries "js code editor";
description "Show a code editor for a programming language";
name "Code Editor";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/CodeEditor.pm";
topics "everyday", "programming";
category "software";
attribution github => ['https://github.com/TopHattedCoder','Tom Bebbington'];

triggers startend => "code editor", "editor";

spice call_type => 'self';

handle remainder => sub {
    return $_ if $_;
    return;
};

1;
