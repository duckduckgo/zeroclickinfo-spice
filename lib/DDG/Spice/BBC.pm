package DDG::Spice::BBC;
# ABSTRACT: BBC programme schedule

use DDG::Spice;
use DateTime;

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

spice to => 'http://www.bbc.co.uk/$1/programmes/schedules/$2.json';

spice from => '([^/]+)/([^/]+(/[^/]+)*)';

spice wrap_jsonp_callback => 1;

spice is_cached => 0;

triggers start => "what's on", "what was on", "what will be on", "what is on", "now on";
triggers any => "schedule", "tv guide";

handle remainder => sub {

    my $query = lc $_;
    $query =~ s/\?//;

    # make sure this is a relevant query
    return unless $query =~ /bbc|cbbc|cbeebies/;

    # no schedules available for BBC America or BBC Canada
    return if $query =~ /america|canada/;

    # detect the day to look-up
    my $day;
    if ($query =~ /tomorrow|in a day|in 1 day/) {
        $day = "tomorrow";
    } elsif ($query =~ /yesterday|a day ago|1 day ago|last night/) {
        $day = "yesterday";
    } else {
        $day = "today";
    }
    $query =~ s/\s*(tomorrow(\s(night|evening))?|in a day|in 1 day|yesterday(\s(night|evening))?|a day ago|1 day ago|last night|today|tonight)\s*//;

    my $dt = DateTime->now->set_time_zone( $loc->time_zone );
    $dt->add( days => 1 ) if $day eq "tomorrow";
    $dt->subtract( days => 1 ) if $day eq "yesterday";

    my @date = ( $dt->year(), $dt->month(), $dt->day());

    # set the code for the location
    my $area;
    if ($query =~ /(north(ern)? )?ireland/) {
        $area = "ni";
    } elsif ($query =~ /(north|south) (east|west)/) {
        $area = "$1_$2";
    } elsif ($query =~ /(south|east|west)/) {
        $area = "$1";
    } elsif ($query =~ /(scotland|cambridge|oxford|wales|yorkshire|london)/) {
        $area = "$1";
    } elsif ($query =~ /cambridgeshire/) {
        $area = "cambridge";
    } elsif ($query =~ /east yorkshire|yorks|lincs/) {
        $area = "east_yorkshire";
    } elsif ($query =~ /channel islands/) {
        $area = "channel_islands";
    } elsif ($query =~ /(east|west) midlands/) {
        $area = "$1_midlands";
    } elsif ($query =~ /midlands/) {
        $area = "west_midlands";
    } elsif ($query =~ /cumbria/) {
        $area = "north_east";
    } else {
        $area = "london";
    }
    $query =~ s/\s*((north(ern)? )?ireland|(north|south) (east|west)|south|east|west|scotland|cambridge|oxford|wales|yorkshire|london|cambridgeshire|east yorkshire|yorks|lincs|channel islands|(east|west) midlands|midlands|cumbria|england|uk|united kingdom|britain)\s*//;

    # look up the region
    my $region = $area =~ /scotland|wales|ni/ ? $area : "england";

    # detect simple city radio names
    if ($query =~ /bbc radio( in| for)? (berksire|bristol|cambridgeshire|cornwall|cumbria|derby|devon|gloucestershire|humberside|jersey|kent|lancashire|leeds|leicester|manchester|merseyside|norfolk|northampton|nottingham|sheffield|shropshire|solent|stoke|suffolk|york)/) {
        return ("radio$2", @date);
    }

    return ('worldserviceradio', @date) if ($query =~ /bbc world( service| radio| service radio)?/);
    return ('asiannetwork', @date) if ($query =~ /bbc asian network/);
    return ('6music', @date) if ($query =~ /bbc radio (6|six)( music)?/);
    return ('5livesportsextra', @date) if ($query =~ /bbc radio (5|five)( live)? extra/);
    return ('5live', @date) if ($query =~ /bbc radio (5|five)( live)?/);
    return ('radio4extra', @date) if ($query =~ /bbc radio (4|four) e?xtra/);
    return ('radio4', @date) if ($query =~ /bbc radio (4|four)/);
    return ('radio3', @date) if ($query =~ /bbc radio (3|three)/);
    return ('radio2', @date) if ($query =~ /bbc radio (2|two)/);
    return ('1xtra', @date) if ($query =~ /bbc radio (1|one) e?xtra/);
    return ('radio1', 'england', @date) if ($query =~ /bbc radio( 1| one)?$/);
    return ('bbcalba', @date) if ($query =~ /bbc alba/);
    return ('parliament', @date) if ($query =~ /bbc parliament/);
    return ('bbcnews', @date) if ($query =~ /bbc news/);
    return ('cbeebies', @date) if ($query =~ /cbeebies/);
    return ('cbbc', @date) if ($query =~ /cbbc/);
    return ('bbcfour', @date) if ($query =~ /bbc (4|four)/);
    return ('bbcthree', @date) if ($query =~ /bbc (3|three)/);
    return ('bbctwo', $region, @date) if ($query =~ /bbc (2|two)/);
    return ('bbcone', $area, @date) if ($query =~ /bbc( 1| one)?$/);
    return;
};

1;
