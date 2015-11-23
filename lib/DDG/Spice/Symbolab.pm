package DDG::Spice::Symbolab;

use DDG::Spice;

spice is_cached => 1;

name "Symbolab";
description "Get a solution to a math problem from symbolab.com";
primary_example_queries "compute integral of x^2", "solve x+2>3x";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Symbolab.pm";

spice to => 'https://www.symbolab.com/ddg?query=$1';
spice wrap_jsonp_callback => 1;

triggers query_lc => qr/\>|\<|\+|\^|\*|\=|\\|\/|\b(tan|sin|cos|csc|cot|sec|ln|log|sqrt|derivative|integral|limit)\b/;

handle query_lc => sub {
    my $query = $_;
    
    $query =~ s/(calculate|solve|compute) ?//;
    
    # checks if its a simple case that only has numbers, and math operations, in which case it assumes 
    # DDG calculator goodie should handle this and returns
    if ($query =~ /^(\d| |\+|\-|\*|\^|\/|sqrt|sin|cos|tan|cot|ln|log|sec|csc|\(|\))+$/){
        return;
    }
    
    return $query;
};

1;
