package DDG::Spice::Drinks;

use DDG::Spice;

triggers any => "drink", "make", "mix", "recipe", "ingredients";
triggers start => "mixing", "making";

spice to => 'http://drinkproject.com/api/?type=json&name=$1&callback={{callback}}';

primary_example_queries => "how to mix a tom collins";
secondary_example_queries => "mixing 007", "how to make a 1.21 gigawatts";
description "Bartending info";
name "Drinks";
source "Drink Project";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Drinks.pm";
topics => "food and drink";
category => "entertainment";
attribution github => ['https://github.com/mutilator','mutilator'];

handle query_lc => sub {
    if (/^((((making|mixing)+|(how\sto\s(make|mix)+)+)+(\s(a|an|the)*)*)|(mixed\s+)*drink(\s+(recipe|mix))*)+\s+(.+)$/) {
            return $12 if $12;
    }
    if (/^(.+)\s+(drink|mixed)\s(drink|mix|recipe|ingredients)$/) {
            return $1 if $1;
    }
    return;
};

1;
