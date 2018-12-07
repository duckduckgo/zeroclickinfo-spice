package DDG::Spice::Hex;

# ABSTRACT: Returns package information from Hex package manager

use DDG::Spice;

spice is_cached => 1;
spice proxy_cache_valid => "200 1d";

spice wrap_jsonp_callback => 1;

spice to => 'https://hex.pm/api/packages/$1';

triggers startend => 'hex';
triggers start => [
  'hex install',
  'hex package',
  'hex library',
  'elixir install',
  'elixir package',
  'elixir library'
];

handle remainder => sub {
    return $_ if $_;
    return;
};

1;
