package DDG::Spice::Github;
# ABSTRACT: Search for information about GitHub repositories

use DDG::Spice;

triggers startend => "github";
spice to => 'https://api.github.com/legacy/repos/search/$1?callback={{callback}}';

primary_example_queries "github zeroclickinfo";
description "Github info";
name "Github";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Github.pm";
topics "programming", "web_design";
category "programming";
attribution web => ['http://dylansserver.com','Dylan Lloyd'],
            email => ['dylan@dylansserver.com','Dylan Lloyd'];

handle query_lc => sub {
    s/^github\s+|\s+github$//;
    return $_ unless /^jobs|jobs$/;
    return;
};

1;
