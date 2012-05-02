package DDG::Spice::Drinks;

use DDG::Spice;

triggers any => "drink", "drink mix", "drink recipe", "mixed drink", "drink ingredients";

spice to => 'http://www.drinkproject.com/api/?type=json&name=$1&callback=ddg_spice_drinks';

handle query_lc => sub {
    if (/^(mixed\s+)*drink(\s+recipe)*\s+([0-9a-z #]+)$) {
            return $3 if $3;
    }
    if (/^([0-9a-z #]+)\s+(drink|mixed) (drink|mix|recipe|ingredients)$) {
            return $1 if $1;
    }
    return;
};


1;

