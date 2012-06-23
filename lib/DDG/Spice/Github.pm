package DDG::Spice::Github;

use DDG::Spice;

triggers any => "github";
spice to => 'https://api.github.com/legacy/repos/search/$1?callback={{callback}}';

handle query_lc => sub {
    if (/^github\s+(?!jobs?)(.+)$/) {
        return $1;
    }
    return;
};

1;
