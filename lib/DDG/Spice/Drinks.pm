package DDG::Spice::Drinks;

use DDG::Spice;

triggers any => "drink", "make", "mix", "recipe", "ingredients";
triggers start => "mixing", "making";

spice to => 'http://www.drinkproject.com/api/?type=json&name=$1&callback=ddg_spice_drinks';

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
