package DDG::Spice::CodeSearch;

use DDG::Spice;

triggers startend => "code", "example";

spice to => 'http://searchco.de/api/jsonp_codesearch_I/?q=$1&callback={{callback}}';

handle remainder => sub {
    my $words = 'actionscript|ada|asp|asp\.net|assembly|awk|bc|bourneagainshell|bourneshell|c|cshell|c\/c\+\+header|c\#|c\+\+|cmake|cobol|coldfusion|css|cython|d|dal|dart|dosbatch|dtd|erlang|expect|fortran77|fortran90|fortran95|go|groovy|haskell|html|idl|java|javascript|jsp|kermit|kornshell|lex|lisp|lua|m4|make|matlab|modula3|msbuildscripts|mumps|mxml|nantscripts|objectivec|objectivec\+\+|ocaml|octave|oracleforms|oraclereports|pascal|patrancommandlanguage|perl|php|python|rexx|ruby|rubyhtml|scala|sed|skill|smarty|softbridgebasic|sql|sqldata|tcl\/tk|teamcenterdef|teamcentermet|teamcentermth|vhdl|vimscript|visualbasic|xaml|xml|xsd|xslt|yacc|yaml';
    if ($_ =~ qr/(\w+\s*$words|$words\s*\w+)/i) {
        return "lang:".$_;
    }
    return;
};

1;
