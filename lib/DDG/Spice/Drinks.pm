package DDG::Spice::Drinks;

use DDG::Spice;

triggers any => "drink", "drink mix", "drink recipe", "mixed drink", "drink ingredients";

spice to => 'http://www.drinkproject.com/api/?type=json&name=$1&callback=ddg_spice_drinks';

handle query_lc => sub {
    if ($_ =~ /^drink\s+([0-9a-z #]+)$/i) {
            return $1 if $1;
    }
    if ($_ =~ /^([0-9a-z #]+)\s+drink mix$/i) {
            return $1 if $1;
    }
    if ($_ =~ /^([0-9a-z #]+)\s+mixed drink$/i) {
            return $1 if $1;
    }
    if ($_ =~ /^([0-9a-z #]+)\s+drink recipe$/i) {
            return $1 if $1;
    }
    if ($_ =~ /^([0-9a-z #]+)\s+drink ingredients$/i) {
            return $1 if $1;
    }
    if ($_ =~ /^mixed drink\s([0-9a-z #]+)$/i) {
            return $1 if $1;
    }
    if ($_ =~ /^drink recipe\s+([0-9a-z #]+)$/i) {
            return $1 if $1;
    }
    return;
};


1;

