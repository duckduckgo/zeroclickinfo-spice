package DDG::Spice::Symbolab;

use DDG::Spice;

spice is_cached => 1;

name "Symbolab";
description "Get a solution to a math problem from symbolab.com";
primary_example_queries "compute integral of x^2", "solve x+2>3x";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Symbolab.pm";

spice to => 'https://www.symbolab.com/ddg?query=$1';
spice wrap_jsonp_callback => 1;

triggers startend => "calculate", "solve", "compute";
handle remainder => sub {
    if ($_ =~ /[\^\*\=\+\-\/\\]/ or $_ =~ /\b(sin|cos|tan|cot|csc|sec|ln|log|sqrt|integral)/i) {
        return $_;
    }
    return;
};

1;
