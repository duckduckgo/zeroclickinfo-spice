package DDG::Spice::Symbolab;

use DDG::Spice;

spice is_cached => 1;

spice to => 'https://www.symbolab.com/ddg?query=$1';
spice wrap_jsonp_callback => 1;

triggers startend => "calculate", "solve", "compute", "integral", "integrate", "integration", "antiderivative", "derivative", "derive", "differentiate", "derivation";
handle query_lc => sub {
    print "Recevied: $_\n";
    if ($_ =~ /[\^\*\=\+\-\/\\]/ or $_ =~ /\b(sin|cos|tan|cot|csc|sec|ln|log|sqrt|integr|deriv|diff)/i) {
        return $_;
    }
    return;
};

1;
