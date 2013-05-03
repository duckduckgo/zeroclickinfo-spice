package DDG::Spice::Guidebox::Lastshows;

use DDG::Spice;


triggers startend => "guidebox", "watch", "full episodes", "full episodes of";

spice to => 'http://api.thetvapi.com/v1.3/json/tQudk9zw2SJyooZGV8cO85LfysYklk/$1/watch/all';

primary_example_queries "guidebox Castle";
description "Search for full episodes of all your favorite TV shows (USA only)";
name "Guidebox";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Lastshows.pm";
icon_url "/i/www.guidebox.com.ico";
topics "everyday", "entertainment", "social";
category "entertainment";
attribution github => ['https://github.com/adman','Adman'],
            twitter => ['http://twitter.com/adman_X','adman_X'];
status "enabled";

spice wrap_jsonp_callback => 1;

handle remainder => sub {
    my %IDS = (
        'NCIS' => 965,
        'Castle' => 161,
        'Grimm' => 202,
        'Stranger Than Fiction' => 50362,
        'Snatch' => 541
    );

    my %type = (
        'NCIS' => 'series',
        'Castle' => 'series',
        'Grimm' => 'series',
        'Stranger Than Fiction' => 'movie',
        'Snatch' => 'movie'
    );

    return $type{$_}, $IDS{$_} if $_;
    return;
};

1;
