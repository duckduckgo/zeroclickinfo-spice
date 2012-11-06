package DDG::Spice::Twitter::Trends;
# ABSTRACT: Give Twitter's trending topics for the specificed location.

use DDG::Spice;

primary_example_queries => "trending";
secondary_example_queries => "trending tweets in japan";
description "Trending tweets";
name "Trends";
icon_url "/i/www.last.fm.ico";
source "Last.fm";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Twitter/Trends.pm";
topics => "everyday", "social";
category => "ids";
attribution web => ['http://kevinschaul.com','Kevin Schaul'],
            email => ['kevin.schaul@gmail.com','Kevin Schaul'];

triggers start => "///***never_trigger***///";

spice to => 'http://api.twitter.com/1/trends/$1.json?callback={{callback}}';

handle remainder => sub {
    return;
};

1;
