package DDG::Spice::Drinks;

use DDG::Spice;

triggers start => "drink", "drink mix", "drink recipe", "mixed drink";

spice to => 'http://www.drinkproject.com/api/?type=json&name=$1&callback={{callback}}';

handle query_lc => sub {
    if ($_ =~ /^drink\s+([0-9a-z #]+)$/i) {
            return $1 if $1;
    }
    return;
};


1;

