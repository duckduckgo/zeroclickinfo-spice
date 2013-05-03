package DDG::Spice::Guidebox::Search;

use DDG::Spice;

spice to => 'http://api.thetvapi.com/v1.3/json/tQudk9zw2SJyooZGV8cO85LfysYklk/search/title/$1/fuzzy';

spice wrap_jsonp_callback => 1;

triggers any => "///***never_trigger***///";

handle remainder => sub {
    return $_ if $_;
    return;
};

1;
