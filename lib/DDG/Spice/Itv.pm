package DDG::Spice::Itv;

# ABSTRACT: ITV guide on when something is showing

use DDG::Spice;

primary_example_queries "what's on itv";
secondary_example_queries "what's on citv", "citv yesterday";
description "Find out what's on an ITV channel";
name "ITV";
icon_url "/i/itv.com.ico";
source "BBC";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Itv.pm";
topics "everyday";
category "entertainment";
attribution github => ['https://github.com/tophattedcoder','Tom Bebbington'];
spice to => 'http://mercury.itv.com/api/json/Dotcom/Programme/PerChannel/$1/?callback={{callback}}';
spice proxy_cache_valid => "200 304 1d";

triggers any => "schedule", "what's on", "what was on", "tv guide", "now on", "itv";

# Handle statement
handle query_lc => sub {
    s/\s*(schedule|what's on|tv guide|now on|tonight|today|now|for|programmes)\s*//g;
    my $time = "today";
    if($_ =~ /^(.*) (yesterday|a day ago|1 day ago)$/) {
        $time = "yesterday";
        $_ = $1;
    }
    if($_ =~ /^(.*) hd$/) {
        $_ = $1;
    }
    return ('CITV', $time) if($_ =~ /^citv$/);
    return ('ITV4', $time) if($_ =~ /^itv (4|four)$/);
    return ('ITV3', $time) if($_ =~ /^itv (3|three)$/);
    return ('ITV2', $time) if($_ =~ /^itv (2|two)$/);
    return ('ITV1', $time) if($_ =~ /^itv( 1| one)?$/);
    return;
};
1;
