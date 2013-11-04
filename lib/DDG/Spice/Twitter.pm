package DDG::Spice::Twitter;

use DDG::Spice;

primary_example_queries '@duckduckgo';
secondary_example_queries "twitter yegg";
description "Shows a user's latest tweet.";
name "Twitter";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Twitter.pm";
topics "everyday", "social";
category "time_sensitive";
attribution github => ["https://github.com/duckduckgo/", "DuckDuckGo"],
            twitter => ["https://twitter.com/duckduckgo", "duckduckgo"];

spice to => 'https://duckduckgo.com/tw.js?user=$1&callback={{callback}}&current=1';
triggers query => qr/^(?:twitter\s)?@([a-z0-9_]+)$|^twitter\s([a-z0-9_]+)$/i;

handle matches => sub { 
    if($1) {
        return $1;
    } elsif($2) {
        return $2;
    }

    return;
};

1;
