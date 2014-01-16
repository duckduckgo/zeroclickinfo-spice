package DDG::Spice::Maps::Directions;

use DDG::Spice;

spice to => 'https://127.0.0.1/directions/$1,$2,$3,$4';
spice is_cached => 0;
spice proxy_cache_valid => "418 1d";

triggers any => (
    'directions to',
    'directions from',
    'directions',
);

handle query_lc => sub {
    return $_ if $_;
    return;
};

1;

