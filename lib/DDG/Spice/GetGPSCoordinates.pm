package DDG::Spice::GetGPSCoordinates;
# ABSTRACT: displays the latitude and longitude for a given city, from the city's Wikipedia page.

use DDG::Spice;

spice is_cached => 1; 

# Metadata.  See https://duck.co/duckduckhack/metadata for help in filling out this section.
name "GetGPSCoordinates";
source "Wikipedia";
#icon_url "";
description "Displays the GPS coordinates for the requested city, with a link to OpenStreetMap.";
primary_example_queries "gps for paoli, pa", "gps coordinates for philadelphia";
secondary_example_queries "denver gps coordinates";
# Uncomment and complete: https://duck.co/duckduckhack/metadata#category
category "geography";
# Uncomment and complete: https://duck.co/duckduckhack/metadata#topics
topics "geography";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/GetGPSCoordinates.pm";
attribution github => ["codemodedev", "Anthony DiSante"],
            email => ['codes@anthonydisante.com', "Anthony DiSante"];

spice to =>'https://en.wikipedia.org/w/api.php?action=query&titles=$1&prop=revisions&rvprop=content&format=json&callback={{callback}}';

triggers start => 'gps coordinates for', 'coordinates for', 'gps for';
triggers startend => 'gps coordinates';

# Handle statement
handle remainder => sub {

    # optional - regex guard
    # return unless qr/^\w+/;

    return unless $_;    # Guard against "no answer"

    # Uppercase the first letter of each word, b/c wikipedia wants "Camden, New Jersey"
    # not "camden, new jersey".
    s!(^|\s+)(\w)(\S+)!$1\u$2$3!g;

    # For unusual names like "King of Prussia, Pennsylvania" wikipedia will only accept
    # "of" and not "Of":
    s! Of ! of !g;

    # Wikipedia also requires a comma in many cases (e.g. "Paoli, Pennsylvania" not
    # "Paoli Pennsylvania"), and they let us request multiple articles at once, so
    # include variants to increase the odds that we get the right one even when the
    # user enters the "wrong" search terms (but only for multi-word searches where the
    # user hasn't already included a comma):
    if(/ / && !/,/) {
        my $orig_terms = $_;
        my $terms_with_comma_after_city = $_;
        $terms_with_comma_after_city =~ s!^(\S+)!$1,!;
        $_ = $orig_terms . '|' . $terms_with_comma_after_city;

        # if it contains three words or more, include a comma-before-state variant:
    	if(/ \S+ /) {
            my $terms_with_comma_before_state = $orig_terms;
            $terms_with_comma_before_state =~ s! (\S+)$!, $1!;
            $_ .= '|' . $terms_with_comma_before_state;
        }
    }

    # Allow state abbreviations:
    s!(,|\s+)AL$!$1Alabama!i;
    s!(,|\s+)AK$!$1Alaska!i;
    s!(,|\s+)AZ$!$1Arizona!i;
    s!(,|\s+)AR$!$1Arkansas!i;
    s!(,|\s+)CA$!$1California!i;
    s!(,|\s+)CO$!$1Colorado!i;
    s!(,|\s+)CT$!$1Connecticut!i;
    s!(,|\s+)DE$!$1Delaware!i;
    s!(,|\s+)DC$!$1District of Columbia!i;
    s!(,|\s+)FL$!$1Florida!i;
    s!(,|\s+)GA$!$1Georgia!i;
    s!(,|\s+)HI$!$1Hawaii!i;
    s!(,|\s+)ID$!$1Idaho!i;
    s!(,|\s+)IL$!$1Illinois!i;
    s!(,|\s+)IN$!$1Indiana!i;
    s!(,|\s+)IA$!$1Iowa!i;
    s!(,|\s+)KS$!$1Kansas!i;
    s!(,|\s+)KY$!$1Kentucky!i;
    s!(,|\s+)LA$!$1Louisiana!i;
    s!(,|\s+)ME$!$1Maine!i;
    s!(,|\s+)MD$!$1Maryland!i;
    s!(,|\s+)MA$!$1Massachusetts!i;
    s!(,|\s+)MI$!$1Michigan!i;
    s!(,|\s+)MN$!$1Minnesota!i;
    s!(,|\s+)MS$!$1Mississippi!i;
    s!(,|\s+)MO$!$1Missouri!i;
    s!(,|\s+)MT$!$1Montana!i;
    s!(,|\s+)NE$!$1Nebraska!i;
    s!(,|\s+)NV$!$1Nevada!i;
    s!(,|\s+)NH$!$1New Hampshire!i;
    s!(,|\s+)NJ$!$1New Jersey!i;
    s!(,|\s+)NM$!$1New Mexico!i;
    s!(,|\s+)NY$!$1New York!i;
    s!(,|\s+)NC$!$1North Carolina!i;
    s!(,|\s+)ND$!$1North Dakota!i;
    s!(,|\s+)OH$!$1Ohio!i;
    s!(,|\s+)OK$!$1Oklahoma!i;
    s!(,|\s+)OR$!$1Oregon!i;
    s!(,|\s+)PA$!$1Pennsylvania!i;
    s!(,|\s+)PR$!$1Puerto Rico!i;
    s!(,|\s+)RI$!$1Rhode Island!i;
    s!(,|\s+)SC$!$1South Carolina!i;
    s!(,|\s+)SD$!$1South Dakota!i;
    s!(,|\s+)TN$!$1Tennessee!i;
    s!(,|\s+)TX$!$1Texas!i;
    s!(,|\s+)UT$!$1Utah!i;
    s!(,|\s+)VT$!$1Vermont!i;
    s!(,|\s+)VI$!$1Virgin Islands!i;
    s!(,|\s+)VA$!$1Virginia!i;
    s!(,|\s+)WA$!$1Washington!i;
    s!(,|\s+)WV$!$1West Virginia!i;
    s!(,|\s+)WI$!$1Wisconsin!i;
    s!(,|\s+)WY$!$1Wyoming!i;

    return $_;
};

1;
