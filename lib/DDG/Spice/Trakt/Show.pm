package DDG::Spice::Trakt::Show;

use DDG::Spice;

primary_example_queries "prison tv shows";
description "TV Show information";
name "Trakt shows";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Trakt/Show.pm";
icon_url "/i/www.trakt.tv.ico";
topics "everyday", "entertainment", "social";
category "entertainment";
attribution github => ['https://github.com/TomBebbington','Tom Bebbington'];

triggers startend => "tv show", "tv shows", "trending on tv";

spice from => '([^/]+)/([^/]+)/([^/]+)';
spice to => 'http://api.trakt.tv/$1/$2.json/{{ENV{DDG_SPICE_TRAKT_APIKEY}}}?limit=12&callback={{callback}}&query=$3';

handle remainder => sub {
    return "shows", "trending", "nil" if $_ =~/trending|best/ or $_ eq '';
    return "search", "shows", $_;
};

1;