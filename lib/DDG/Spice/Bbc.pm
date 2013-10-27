package DDG::Spice::Bbc;

# ABSTRACT: BBC guide on when something is showing

use DDG::Spice;

primary_example_queries "what's on bbc";
secondary_example_queries "what's on bbc three", "bbc two yesterday";
description "Find out what's on a BBC show";
name "BBC";
icon_url "/i/bbc.co.uk.ico";
source "BBC";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Bbc.pm";
topics "everyday";
category "entertainment";
attribution github => ['https://github.com/tophattedcoder','Tom Bebbington'];
spice to => 'http://www.bbc.co.uk/$1/programmes/schedules/$3/$4.json';
spice from => '([^\/]+)(\/([^\/]+))?\/([^\/]+)(\/([^\/]+))?(\/([^\/]+))?';
spice wrap_jsonp_callback => 1;
spice proxy_cache_valid => "200 304 1d";

triggers any => "schedule", "what's on", "what was on", "tv guide", "now on", "bbc";

# Handle statement
handle query_lc => sub {
    s/\s*(schedule|what's on|tv guide|now on|tonight|today|now|programmes)\s*//g;
    my %locals = (
        "scotland" => "scotland",
        "wales" => "wales",
        "ni" => "ni"
    );
    my @local_keys = reverse keys %locals;
    my $location = "london";
    my $time = "today";
    if($_ =~ /tomorrow|in a day|in 1 day/) {
        $time = "tomorrow";
    }
    if($_ =~ /yesterday|a day ago|1 day ago|last night/) {
        $time = "yesterday";
    }
    if($_ =~ /(north(ern)? )?ireland/) {
        $location = "ni";
    } elsif($_ =~ /(north|south) (east|west)/) {
        $location = "$1_$2";
    } elsif($_ =~ /(south|east|west)/) {
        $location = "$1";
    } elsif($_ =~ /(scotland|cambridge|oxford|wales|yorkshire|london)/) {
        $location = "$1";
    } elsif($_ =~ /cambridgeshire/) {
        $location = "cambridge";
    } elsif($_ =~ /east yorkshire|yorks|lincs/) {
        $location = "east_yorkshire";
    } elsif($_ =~ /channel islands/) {
        $location = "channel_islands";
    } elsif($_ =~ /(east|west) midlands/) {
        $location = "$1_midlands";
    } elsif($_ =~ /midlands/) {
        $location = "west_midlands";
    } elsif($_ =~ /cumbria/) {
        $location = "north_east";
    }
    my $local_location = $locals{$location};
    if (!defined($local_location)) {
        $local_location = "england";
    }
    if($_ =~ /bbc radio( in| for)? (berksire|bristol|cambridgeshire|cornwall|cumbria|derby|devon|gloucestershire|humberside|jersey|kent|lancashire|leeds|leicester|manchester|merseyside|norfolk|northampton|nottingham|sheffield|shropshire|solent|stoke|suffolk|york)/) {
        return ("radio$2", '', $time);
    }
    return ('worldserviceradio', '', $time) if($_ =~ /bbc world (service|radio|service radio)?/);
    return ('asiannetwork', '', $time) if($_ =~ /bbc asian network?/);
    return ('6music', '', $time) if($_ =~ /bbc radio (6|six)( music)?/);
    return ('5livesportsextra', '', $time) if($_ =~ /bbc radio (5|five)( live)? extra/);
    return ('5live', '', $time) if($_ =~ /bbc radio (5|five)( live)?/);
    return ('radio4extra', '', $time) if($_ =~ /bbc radio (4|four) e?xtra/);
    return ('radio4', '', $time) if($_ =~ /bbc radio (4|four)/);
    return ('radio3', '', $time) if($_ =~ /bbc radio (3|three)/);
    return ('radio2', '', $time) if($_ =~ /bbc radio (2|two)/);
    return ('1xtra', '', $time) if($_ =~ /bbc radio (1|one) e?xtra/);
    return ('radio1', 'england', $time) if($_ =~ /bbc radio( 1| one)?/);
    return ('bbcalba', '', $time) if($_ =~ /(bbc )?alba/);
    return ('parliament', '', $time) if($_ =~ /(bbc )?parliament/);
    return ('bbcnews', '', $time) if($_ =~ /bbc news/);
    return ('cbeebies', '', $time) if($_ =~ /cbeebies/);
    return ('cbbc', '', $time) if($_ =~ /cbbc/);
    return ('bbcfour', '', $time) if($_ =~ /bbc (4|four)/);
    return ('bbcthree', '', $time) if($_ =~ /bbc (3|three)/);
    return ('bbctwo', $local_location, $time) if($_ =~ /bbc (2|two)/);
    return ('bbcone', $location, $time) if($_ =~ /bbc( 1| one)?/);
    return;
};
1;
