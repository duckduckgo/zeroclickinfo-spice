package DDG::Spice::Calculator;
# ABSTRACT: Math calculator

use strict;
use DDG::Spice;

# Caching - https://duck.co/duckduckhack/spice_advanced_backend#caching
#spice is_cached => 1; 

# Metadata.  See https://duck.co/duckduckhack/metadata for help in filling out this section.
name 'Calculator';
#source ';
#icon_url ';
description 'Math calculations';
primary_example_queries '5 + 5 =', 'calculate cos(45)';
secondary_example_queries 'optional -- demonstrate any additional triggers';
# Uncomment and complete: https://duck.co/duckduckhack/metadata#category
# category ';
# Uncomment and complete: https://duck.co/duckduckhack/metadata#topics
# topics ';
code_url 'https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Calculator.pm';
attribution github  => ['https://github.com/duckduckgo', 'duckduckgo'];
#attribution github => ['sevastos', 'Sev'],
#            twitter => 'smas';

# Triggers - https://duck.co/duckduckhack/spice_triggers
# TODO more
triggers query_nowhitespace => qr/(?:.+)\=\s*$/;
# QUESTION: Can't have both regex and plain words triggers?
# triggers start => ['calc', 'calculate'];
# triggers end => ['='];

my $calculate = sub {
	#my $query = spacing($_, 1);

    return unless $_;    # Guard against 'no answer'

    return $_;
};

# API endpoint - https://duck.co/duckduckhack/spice_attributes#spice-codetocode
spice call_type => 'self';

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
