package DDG::Spice::Vimeo::Search;
# ABSTRACT: Searches for videos on vimeo

use DDG::Spice;

spice to => '';

triggers startend => 'vimeo';

handle matches => sub {
    return $_ if defined $_; 
    return;
};

1;
