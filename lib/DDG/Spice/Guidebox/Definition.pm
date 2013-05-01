package DDG::Spice::Guidebox::Definition;

use DDG::Spice;

triggers startend => "guidebox", "watch", "full episodes", "full episodes of";

spice to => 'http://api.thetvapi.com/v1.2/json/NdlLbziCtRxn7zQQWIe80beqcthMlP/$1';

primary_example_queries "guidebox Castle";
description "Search for full episodes of all your favorite TV shows (USA only)";
name "Guidebox";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Guidebox.pm";
icon_url "/i/www.guidebox.com.ico";
topics "everyday", "entertainment", "social";
category "entertainment";
attribution github => ['https://github.com/adman','Adman'],
            twitter => ['http://twitter.com/adman_X','adman_X'];
status "enabled";

spice wrap_jsonp_callback => 1;

handle remainder => sub {
    my %IDS = (
        'NCIS' => 19274,
        'Castle' => 23580,
        'Grimm' => 36833,
    );

    return $IDS{$_} if $_;
    return;
};

1;
