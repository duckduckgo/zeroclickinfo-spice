package DDG::Spice::Symbolab;

use DDG::Spice;

spice is_cached => 1;

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
