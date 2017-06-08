package DDG::Spice::Catfacts;

# ABSTRACT: Gives random facts about cats

use DDG::Spice;

spice is_cached => 0;
spice proxy_cache_valid => "418 1d"; # defaults to this automatically

spice wrap_jsonp_callback => 1; # only enable for non-JSONP APIs (i.e. no &callback= parameter)

spice to => 'http://catfacts-api.appspot.com/api/facts';

triggers any => 'random cat fact', 'random cat facts', 'random facts about cats', 'random fact about cats';

handle remainder => sub {

    return $_;
};

1;
