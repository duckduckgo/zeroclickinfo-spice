package DDG::Spice::Octopart;

use DDG::Spice;

triggers any => "datasheet", "specs";

spice to => 'http://octopart.com/api/v2/parts/search?apikey={{ENV{DDG_SPICE_OCTOPART_APIKEY}}}&limit=3&optimize.hide_offers=1&optimize.hide_specs=1&q=$1&callback={{callback}}';

handle remainder => sub {
    return $_ if $_;
    return;
};
1;
