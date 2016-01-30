package DDG::Spice::MagicTheGathering;


use DDG::Spice;

spice is_cached => 1;
spice proxy_cache_valid => "200 1d"; # defaults to this automatically

spice wrap_jsonp_callback => 1; # only enable for non-JSONP APIs (i.e. no &callback= parameter)

spice to => 'https://api.deckbrew.com/mtg/cards?name=$1';

triggers startend => 'magic the gathering', 'magic card', 'magic cards', 'magic';

handle remainder => sub {
    
    return $_ unless !$_;
    return;
};

1;
