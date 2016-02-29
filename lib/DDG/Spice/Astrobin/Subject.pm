package DDG::Spice::Astrobin::Subject;
# ABSTRACT: Retrieve images based on subject.

use strict;
use DDG::Spice;

triggers start => "astrophoto", "astrophotography", "astronomy pictures", "astronomy picture", "astronomy picture of", "astronomy image of", "astronomy pictures of", "astronomy images of";
spice to => 'http://www.astrobin.com/api/v1/image/?title__icontains=$1&api_key={{ENV{DDG_SPICE_ASTROBIN_APIKEY}}}&api_secret={{ENV{DDG_SPICE_ASTROBIN_APISECRET}}}&format=json';

spice wrap_jsonp_callback => 1;

handle remainder => sub {
        return if /(image|photo|picture)?s?\s*(of|of the)?\s*(day|today|daily)$/i;
        return $_ if $_;
        return;
};
1;
