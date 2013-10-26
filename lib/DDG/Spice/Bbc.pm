package DDG::Spice::Bbc;

# ABSTRACT: BBC guide on when something is showing

use DDG::Spice;

primary_example_queries "what's on bbc";
secondary_example_queries "what's on bbc three", "what is on bbc two";
description "Find out what's on a BBC show";
name "BBC";
icon_url "/i/bbc.co.uk.ico";
source "BBC";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Bbc.pm";
topics "everyday";
category "entertainment";
attribution github => ['https://github.com/tophattedcoder','Tom Bebbington'];
spice to => 'http://www.bbc.co.uk/$1/programmes/schedules/today.json';
spice wrap_jsonp_callback => 1;

triggers any => "schedule", "what's on", "tv guide", "now on";

handle remainder => sub {
    return 'worldserviceradio' if ($_ =~ /^bbc world ?(radio|music|radio)$/);
    return 'asiannetwork' if ($_ =~ /^bbc asian ?(network|music|radio)?$/);
    return '6music' if ($_ =~ /^bbc radio (6|six)( music)?$/);
    return '5livesportsextra' if ($_ =~ /^bbc radio (5|five) sports$/);
    return '5live' if ($_ =~ /^bbc radio (5|five)$/);
    return 'radio4xtra' if ($_ =~ /^bbc radio (4|four) ?(extra|xtra)$/);
    return 'radio4' if ($_ =~ /^bbc radio (4|four)$/);
    return 'radio3' if ($_ =~ /^bbc radio (3|three)$/);
    return 'radio2' if ($_ =~ /^bbc radio (2|two)$/);
    return '1xtra' if ($_ =~ /^bbc radio (1|one) ?(extra|xtra)$/);
    return 'radio1' if ($_ =~ /^bbc radio (1|one)$/);
    return 'cbbc' if($_ =~ /^cbbc$/);
    return 'cbeebies' if($_ =~ /^cbeebies$/);
    return 'parliament' if($_ =~ /^bbc parliament$/);
    return 'bbcalba' if($_ =~ /^bbc alba$/);
    return 'bbcnews' if($_ =~ /^bbc news$/);
    return 'bbcfour' if($_ =~ /^bbc (4|four)$/);
    return 'bbcthree' if($_ =~ /^bbc (3|three)$/);
    return 'bbctwo' if($_ =~ /^bbc (2|two)$/);
    return 'bbcone' if($_ =~ /^bbc( 1| one)?$/);
    return;
};
1;
