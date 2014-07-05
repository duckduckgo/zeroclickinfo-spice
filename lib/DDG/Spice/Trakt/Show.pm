package DDG::Spice::Trakt::Show;

use DDG::Spice;

primary_example_queries "when is adventure time on";
description "TV Show information";
name "Trakt shows";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Trakt/Show.pm";
icon_url "/i/www.trakt.tv.ico";
topics "everyday", "entertainment", "social";
category "entertainment";
attribution github => ['https://github.com/TomBebbington','Tom Bebbington'];

triggers startend => "tv show";

spice to => 'http://api.trakt.tv/search/shows.json/{{ENV{DDG_SPICE_TRAKT_APIKEY}}}?query=$1&limit=12&callback={{callback}}';

handle remainder => sub {
    return $_ if $_;
    return;
};

1;