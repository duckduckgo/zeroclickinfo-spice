package DDG::Spice::BBC;
# ABSTRACT: BBC guide on when something is showing

use DDG::Spice;

primary_example_queries "what's on bbc";
secondary_example_queries "what's on bbc three", "bbc two yesterday";
description "Find out what's on a BBC show";
name "BBC";
icon_url "/i/bbc.co.uk.ico";
source "BBC";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/BBC.pm";
topics "everyday";
category "entertainment";
attribution github => ['https://github.com/tophattedcoder','Tom Bebbington'];

spice to => 'http://www.bbc.co.uk/$1/programmes/schedules/$3/$4.json';

spice from => '([^\/]+)(\/([^\/]+))?\/([^\/]+)(\/([^\/]+))?(\/([^\/]+))?';

spice wrap_jsonp_callback => 1;

triggers startend => "what's on", "what was on", "what will be on", "what is on";
triggers any => "schedule", "tv guide", "now on";

# map of areas to regions where it shouldn't default to england
my %regions = (
    "scotland" => "scotland",
    "wales" => "wales",
    "ni" => "ni"
);

handle query_lc => sub {
    # the city / area
    my $area = "london";
    # the day we should look-up
    my $day = "today";
    # detect the day to look-up
    if($_ =~ /tomorrow|in a day|in 1 day/) {
        $day = "tomorrow";
    } elsif($_ =~ /yesterday|a day ago|1 day ago|last night/) {
        $day = "yesterday";
    }

    # set the code for the location
    if($_ =~ /(north(ern)? )?ireland/) {
        $area = "ni";
    } elsif($_ =~ /(north|south) (east|west)/) {
        $area = "$1_$2";
    } elsif($_ =~ /(south|east|west)/) {
        $area = "$1";
    } elsif($_ =~ /(scotland|cambridge|oxford|wales|yorkshire|london)/) {
        $area = "$1";
    } elsif($_ =~ /cambridgeshire/) {
        $area = "cambridge";
    } elsif($_ =~ /east yorkshire|yorks|lincs/) {
        $area = "east_yorkshire";
    } elsif($_ =~ /channel islands/) {
        $area = "channel_islands";
    } elsif($_ =~ /(east|west) midlands/) {
        $area = "$1_midlands";
    } elsif($_ =~ /midlands/) {
        $area = "west_midlands";
    } elsif($_ =~ /cumbria/) {
        $area = "north_east";
    }

    # look up the region
    my $region = $regions{$area};

    # default region to "england"
    if (!defined($region)) {
        $region = "england";
    }

    # detect simple city radio names
    if($_ =~ /bbc radio( in| for)? (berksire|bristol|cambridgeshire|cornwall|cumbria|derby|devon|gloucestershire|humberside|jersey|kent|lancashire|leeds|leicester|manchester|merseyside|norfolk|northampton|nottingham|sheffield|shropshire|solent|stoke|suffolk|york)/) {
        return ("radio$2", '', $day);
    }
    
    return ('worldserviceradio', '', $day) if($_ =~ /bbc world (service|radio|service radio)?/);
    return ('asiannetwork', '', $day) if($_ =~ /bbc asian network/);
    return ('6music', '', $day) if($_ =~ /bbc radio (6|six)( music)?/);
    return ('5livesportsextra', '', $day) if($_ =~ /bbc radio (5|five)( live)? extra/);
    return ('5live', '', $day) if($_ =~ /bbc radio (5|five)( live)?/);
    return ('radio4extra', '', $day) if($_ =~ /bbc radio (4|four) e?xtra/);
    return ('radio4', '', $day) if($_ =~ /bbc radio (4|four)/);
    return ('radio3', '', $day) if($_ =~ /bbc radio (3|three)/);
    return ('radio2', '', $day) if($_ =~ /bbc radio (2|two)/);
    return ('1xtra', '', $day) if($_ =~ /bbc radio (1|one) e?xtra/);
    return ('radio1', 'england', $day) if($_ =~ /bbc radio( 1| one)?/);
    return ('bbcalba', '', $day) if($_ =~ /bbc alba/);
    return ('parliament', '', $day) if($_ =~ /bbc parliament/);
    return ('bbcnews', '', $day) if($_ =~ /bbc news/);
    return ('cbeebies', '', $day) if($_ =~ /cbeebies/);
    return ('cbbc', '', $day) if($_ =~ /cbbc/);
    return ('bbcfour', '', $day) if($_ =~ /bbc (4|four)/);
    return ('bbcthree', '', $day) if($_ =~ /bbc (3|three)/);
    return ('bbctwo', $region, $day) if($_ =~ /bbc (2|two)/);
    return ('bbcone', $area, $day) if($_ =~ /bbc( 1| one)?/);
    return;
};

1;
