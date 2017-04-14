package DDG::Spice::Riffsy;

# ABSTRACT: Search Tenor (https://www.tenor.co/) for animated GIFs. Note: Previously called Riffsy.
use DDG::Spice;
use utf8;

spice is_cached => 1;
spice proxy_cache_valid => "200 1d";

spice to => 'http://api1.riffsy.com/v1/search?tag=$1&key={{ENV{DDG_SPICE_RIFFSY_APIKEY}}}&safesearch=strict&searchtype=ddg&limit=50';
spice wrap_jsonp_callback => 1;

triggers query_lc => qr/^(?<match>\X)$|^(\X+|[\w\s]+?) gifs?$/;

my @emojis = map { chomp $_; $_ } share('emoji_sources.txt')->slurp;
my $emoji_regex = join '|', @emojis;

handle query_lc => sub {
    return if !$_ || $_ =~ /^[a-zA-Z0-9]$/;
    return if defined $+{match} && $+{match} !~ qr#$emoji_regex#i;
    return $_;
};

1;
