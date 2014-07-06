package DDG::Spice::Trakt::Episode;

use DDG::Spice;

primary_example_queries "stephen fry on tv";
description "TV Episode information";
name "Trakt episodes";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Trakt/Episode.pm";
icon_url "/i/www.trakt.tv.ico";
topics "everyday", "entertainment", "social";
category "entertainment";
attribution github => ['https://github.com/TomBebbington','Tom Bebbington'];

triggers startend => "tv episode", "tv episodes", "episode", "episodes";
triggers end => "on tv";

spice to => 'http://api.trakt.tv/search/episodes.json/{{ENV{DDG_SPICE_TRAKT_APIKEY}}}?limit=12&callback={{callback}}&query=$1';

my %skip = map { $_ => 0 } (
    'what\'s',
    'what is'
);
handle remainder => sub {
    return $_ if $_ && !exists $skip{lc $_};
    return;
};

1;