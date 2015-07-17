package DDG::Spice::Meetup;
# ABSTRACT: This Spice was inspired by an anonymous suggestion in the Instant Answers Forum
# # # # # # source: https://duck.co/ideas/idea/1126/already-an-instant-answers-for-meetup
# # # # # # When a user searches for "meetup + city name" they should receive
# # # # # # instant answers of suggested meetups in that city sorted by the number of
# # # # # # members in the group.
# Enhancement Ideas: If a user searches for the triggers without a city they should be
# # # # # # # # # #  provided with a list of meetups within a radius of their location
# # # # # # # # # #  Add another query paramater for tech meetups
# # # # # # # # # #  Add another query parameter for programming language specific meetups
# # # # # # # # # #
# # # # # # # # # #
# # # # # # # # # #
# # # # # # # # # # TODO: set personal API key on the server DDG_SPICE_MEETUP_APIKEY
# # # # # # # # # # # # # https://duck.co/duckduckhack/spice_advanced_backend#caching-api-responses
use DDG::Spice;

spice is_cached => 1;

name "Meetup Suggestion";
source "Meetup";
icon_url "https://icons.duckduckgo.com/ip2/www.meetup.com.ico";
description "Show meetups nearby or for a given city name";
primary_example_queries "meetup philadelphia", "meetups nashville", "meetup groups atlanta", "meetup.com las vegas";
# secondary_example_queries "optional -- demonstrate any additional triggers";
category "random";
# included "travel" as a topic because meetups can be a great way to get to know a new place
topics "social", "everyday", "travel";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Meetup.pm";
attribution github => ["alohaas", "Olivia Haas"],
            twitter => "livhaas";

spice to => 'https://api.meetup.com/2/groups?&key=74496f8077213e205e167fe5082d19&zip=$1&radius=50.0&page=20&order=members&callback={{callback}}';
triggers any => "meetup", "meetup.com", "meetups", "meetup groups";

handle remainder => sub {

    # optional - regex guard
    # return unless qr/^\w+/;

    return unless $_;    # Guard against "no answer"

    return $_;
};

1;
