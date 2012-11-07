package DDG::Spice::CodeSearch;

use DDG::Spice;

triggers startend => "code", "example";

spice to => 'http://searchco.de/api/jsonp_codesearch_I/?q=$1&callback={{callback}}';

primary_example_queries "cobol sin";
secondary_example_queries "string php";
description "Code search";
name "CodeSearch";
icon_url "/i/searchco.de.ico";
source "search[code]";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/CodeSearch.pm";
topics "sysadmin", "programming";
category "programming";
attribution github => ['https://github.com/boyter','Ben Boyter'],
           twitter => ['http://twitter.com/boyter','boyter'];

handle remainder => sub {
   
    if ($_ =~ m/\b(yaml|yacc|xslt|xsd|xml|xaml|visualbasic|vimscript|vhdl|teamcentermth|teamcentermet|teamcenterdef|tcl\/tk|sqldata|sql|softbridgebasic|smarty|skill|sed|scala|rubyhtml|ruby|rexx|python|php|perl|patrancommandlanguage|pascal|oraclereports|oracleforms|octave|ocaml|objectivec\+\+|objectivec|nantscripts|mxml|mumps|msbuildscripts|modula3|matlab|make|m4|lua|lisp|lex|kornshell|kermit|jsp|javascript|java|idl|html|haskell|groovy|go|fortran95|fortran90|fortran77|expect|erlang|dtd|dosbatch|dart|dal|d|cython|css|cshell|coldfusion|cobol|cmake|c#?|c\+\+|bourneshell|bourneagainshell|bc|awk|assembly|asp.net|as|ada|actionscript)\b/) {
	    my $match = $1;

	    $match =~ s/\+/\\+/g;

	    s/\s*$match\s*//i;

	    return "lang:".$match." ".$_;
    }
    return;
};

1;
