package DDG::Spice::Drinks;

use DDG::Spice;

primary_example_queries "how to mix a tom collins";
secondary_example_queries "mixing 007", "how to make a 1.21 gigawatts";
description "Bartending info";
name "Drinks";
source "Drink Project";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Drinks.pm";
topics "food_and_drink";
category "entertainment";
attribution github => ['https://github.com/mutilator','mutilator'];

triggers any => "mix", "make";
triggers startend => "drink", "ingredients", "mixing", "making";

spice to => 'http://drinkproject.com/api/?type=json&name=$1&callback={{callback}}';

handle query_lc => sub {

    my $drink;

    # enforce "drink" to be in queries with
    # "make" or "making"
    # too ambiguous otherwise
    # e.g. "making a rails 4 backend"
    if (/^(?:how to make|making) an? (.+)/){
    	$drink = $1;
        return unless $drink =~ /\bdrink\b/;
    } elsif (/^(?:how to mix|mixing) an? (.+)/){
    	$drink = $1;
    } elsif (/^ingredients for an? (.+)|(.+) ingredients/){
	$drink = $1||$2;
    } elsif (/^(.+) drink$|^drink (.+)$/){
        $drink = $1;
    }
    
    if ($drink){
    	$drink =~ s/drink//g;
    	$drink =~ s/^\s+|\s+$//g;
	return $drink;
    }
    return;
};

1;
