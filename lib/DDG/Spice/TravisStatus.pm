package DDG::Spice::TravisStatus;
# ABSTRACT: Search for the current status of Travis CI.

use DDG::Spice;

primary_example_queries "travis status";
description "Travis CI status";
name "Travis Status";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/TravisStatus.pm";
topics "computing", "programming";
category "programming";
attribution github => ['https://github.com/josephwegner','Joe Wegner'],
            twitter => ['https://www.twitter.com/Joe_Wegner','Joe_Wegner'];

triggers any => 'travis', 'travis ci', 'travis continuous integration', 'travisci';

spice to => 'http://www.traviscistatus.com/index.json';
spice wrap_jsonp_callback => 1;

handle remainder => sub {
    return $_ if /^(is\s*)?(system)?\s*(status|up|down)\??$/i;
    return;
};

1;
