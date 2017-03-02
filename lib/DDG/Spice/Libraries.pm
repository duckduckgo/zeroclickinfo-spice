package DDG::Spice::Libraries;

use strict;
use DDG::Spice;

spice to => 'https://libraries.io/api/search?q=$1';
spice is_cached => 1;
spice proxy_cache_valid => "200 7d";

triggers start => "go", "wordpress", "clojars", "atom", "homebrew", "elm", "scala", "dart", "groovy", "emacs", "pypi", "bower";

handle remainder => sub {
    my ($term) = @_;
    return $term if $term;
    return;
};
1;
