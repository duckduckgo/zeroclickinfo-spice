package DDG::Spice::Calculator;
# ABSTRACT: Math calculator

use strict;
use DDG::Spice;

name 'Calculator';
description 'Math calculations';
primary_example_queries '5 + 5 =';
category 'calculations';
topics 'math', 'computing', 'geek';
code_url 'https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Calculator.pm';
attribution github  => ['https://github.com/duckduckgo', 'duckduckgo'];

spice call_type => 'self';

# TODO Proper triggers plan
# Triggers - https://duck.co/duckduckhack/spice_triggers
triggers query_nowhitespace => qr/(?:.+)\=\s*$/;
# QUESTION: Can't have both regex and plain words triggers?
# triggers start => ['calc', 'calculate'];
# triggers end => ['='];

my $calculate = sub {
	#my $query = spacing($_, 1);
    return unless $_;    # Guard against 'no answer'
    return call;
};

# Handle statement
handle query_nowhitespace => $calculate;
# handle remainder => $calculate;


#separates symbols with a space
#spacing '1+1'  ->  '1 + 1'
# sub spacing {
#     my ($text, $space_for_parse) = @_;

#     $text =~ s/\s{2,}/ /g;
#     $text =~ s/(\s*(?<!<)(?:[\+\-\^xX\*\/\%]|times|plus|minus|dividedby)+\s*)/ $1 /ig;
#     $text =~ s/\s*dividedby\s*/ divided by /ig;
#     $text =~ s/(\d+?)((?:dozen|pi|gross|squared|score))/$1 $2/ig;
#     $text =~ s/([\(\)])/ $1 /g if ($space_for_parse);

#     return $text;
# }

1;
