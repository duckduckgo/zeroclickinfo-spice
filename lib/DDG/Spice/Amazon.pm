package DDG::Spice::Amazon;

use DDG::Spice;

spice to => 'https://duckduckgo.com/m.js?q=$1&cb=ddg_spice_amazon';

triggers any => 'amazon', 'isbn';

handle remainder => sub {
    # ISBN extraction
    $_ =~ qr/^(?:isbn |)(\d+)(?: isbn|)$/;
    $_ = $1 if $1;

    return "$_" if $_;
};

1;

