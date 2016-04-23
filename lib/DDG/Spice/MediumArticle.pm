package DDG::Spice::MediumArticle;

# ABSTRACT: Search for medium.com articles

use DDG::Spice;

spice is_cached => 1;
spice proxy_cache_valid => "200 1d";
spice wrap_jsonp_callback => 1;
spice to => 'https://medium-abhisheksp.rhcloud.com/medium/posts/$1';
triggers any => 'medium.com article', 'medium article', 'medium.com', 'medium';

handle remainder => sub {
    return $_ if $_;
    return;
};

1;
