package DDG::Spice::Images;

use DDG::Spice;
use String::Trim;

spice to => 'https://duckduckgo.com/i.js?q=$1&cb=DDG.duckbar.images.display';
triggers query => qr/^(.*)\bimages?\b(.*)$/i;

handle query => sub {
    return trim($1) . " " . trim($2) if $_;
    return;
};

1;
