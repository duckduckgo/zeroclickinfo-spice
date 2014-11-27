package DDG::Spice::EncyclopediaOfLife;

use DDG::Spice;

triggers startend => 'animal';

spice to => 'http://eol.org/api/search/$1.json?callback={{callback}}';

handle remainder => sub {
    return $_ if $_;
    return;
};

1;