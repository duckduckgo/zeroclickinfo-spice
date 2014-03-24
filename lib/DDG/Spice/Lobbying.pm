package DDG::Spice::Lobbying;
# ABSTRACT: Returns a list of political contributions for individuals, organizations, or industries

use DDG::Spice;

primary_example_queries "exxon contributions";
secondary_example_queries "obama campagin finance";
description "Shows political contributions by person, industry, or org";
name "Lobbying";
icon_url "/i/govtrack.co.ico";
source "Sunlight Foundation";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Lobbying.pm";
topics "special_interest", "trivia";
category "facts";
attribution web =>   ['http://www.transistor.io', 'Jason Dorweiler'],
            email => ['jason@transistor.io', 'Jason Dorweiler'];

spice to => 'http://transparencydata.com/api/1.0/entities.json?apikey=c1d1d84619704ae9b8e001d9505bf1a6&search=$1';

spice from => '([^/]+)/?(?:([^/]+)/?(?:([^/]+)|)|)';

spice wrap_jsonp_callback => 1;

triggers startend => 'lobbyist', 'lobbying', 'campaign finance', 'contributions', 'campaign contributions';

handle remainder => sub {

	my $query = lc $_;
    return $query;
    return;
};

1;