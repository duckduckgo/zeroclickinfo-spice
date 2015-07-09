package DDG::Spice::Symbolab;

use DDG::Spice;

spice is_cached => 1;

name "Symbolab";
description "Get a solution to a math problem from symbolab.com";
primary_example_queries "compute integral of x^2", "solve x+2>3x";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Symbolab.pm";

spice to => 'http://www.symbolab.com/ddg?query=$1';
spice wrap_jsonp_callback => 1;

triggers start => "calculate", "solve", "compute";
handle query => sub {
    return $_;
};

1;
