package DDG::Spice::Guidebox::Search;

use DDG::Spice;

spice to => 'http://api.thetvapi.com/v1.2/json/NdlLbziCtRxn7zQQWIe80beqcthMlP/search/title/$1/fuzzy';

spice wrap_jsonp_callback => 1;

triggers any => "///***never_trigger***///";

handle remainder => sub {
    return $_ if $_;
    return;
};

1;
