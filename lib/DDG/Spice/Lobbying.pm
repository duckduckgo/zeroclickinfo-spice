package DDG::Spice::Lobbying;
# ABSTRACT: Returns a list of political contributions for individuals, organizations, or industries.

use DDG::Spice;

primary_example_queries "chase contributions";
secondary_example_queries "obama campaign finance";
description "Shows political contributions by person, industry, or org";
name "Lobbying";
icon_url "/i/sunlightlabs.github.io.ico";
source "Sunlight Foundation";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Lobbying.pm";
topics "special_interest", "trivia";
category "facts";
attribution web =>   ['http://www.transistor.io', 'Jason Dorweiler'],
            email => ['jason@transistor.io', 'Jason Dorweiler'];

# this can use the same key as the Congress IA
spice to => 'http://transparencydata.com/api/1.0/entities.json?apikey={ENV{{DDG_SPICE_CONGRESS_APIKEY}}}&search=$1';

spice from => '([^/]+)/?(?:([^/]+)/?(?:([^/]+)|)|)';

spice wrap_jsonp_callback => 1;

triggers startend => 'lobbyist','lobbying','campaign finance','campaign finances','contributions','contribution','campaign contributions','campaign contribution';

handle remainder => sub {

	my $query = lc $_;
    return $query if $query;
    return;
};

1;