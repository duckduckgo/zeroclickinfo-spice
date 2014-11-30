package DDG::Spice::EncyclopediaOfLife;

use DDG::Spice;

triggers startend => 'animal';

spice to => 'http://eol.org/api/search/$1.json?callback={{callback}}';

attribution web => ['http://www.steveglick.net', 'Steve Glick'],
            github => ['https://github.com/stevenmg', 'stevenmg'],
            twitter => ['https://twitter.com/stevenmglick', 'stevenmglick'];

handle remainder => sub {
    return $_ if $_;
    return;
};

1;