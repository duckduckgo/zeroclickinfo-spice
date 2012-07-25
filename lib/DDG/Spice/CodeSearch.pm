package DDG::Spice::CodeSearch;

use DDG::Spice;

triggers startend => "code", "example";

spice to => 'http://searchco.de/api/jsonp_codesearch_I/?q=$1&callback={{callback}}';

handle remainder => sub {
   
    if ($_ =~ m/(yaml|yacc|xslt|xsd|xml|xaml|visualbasic|vimscript|vhdl|teamcentermth|teamcentermet|teamcenterdef|tcl\/tk|sqldata|sql|softbridgebasic|smarty|skill|sed|scala|rubyhtml|ruby|rexx|python|php|perl|patrancommandlanguage|pascal|oraclereports|oracleforms|octave|ocaml|objectivec\+\+|objectivec|nantscripts|mxml|mumps|msbuildscripts|modula3|matlab|make|m4|lua|lisp|lex|kornshell|kermit|jsp|javascript|java|idl|html|haskell|groovy|go|fortran95|fortran90|fortran77|expect|erlang|dtd|dosbatch|dart|dal|d|cython|css|cshell|coldfusion|cobol|cmake|c#|c\+\+|bourneshell|bourneagainshell|bc|awk|assembly|asp.net|as|ada|actionscript)/) {
	    my $match = $1;
	    $_ =~ s/$match//i;
	    return "lang:".$match." ".$_;
    }
    return;
};

1;