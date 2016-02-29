package DDG::Spice::Symbolab;

use DDG::Spice;

spice is_cached => 1;

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
