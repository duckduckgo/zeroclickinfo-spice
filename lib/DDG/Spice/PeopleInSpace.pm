package DDG::Spice::PeopleInSpace;
# ABSTRACT: Returns the number of humans currently in space

use DDG::Spice;

name "People in Space";
source "www.howmanypeopleareinspacerightnow.com";
description "Number of humans currently in space";
primary_example_queries "people in space", "number of humans in orbit right now";
category = "facts";
topics = "science", "geek", "trivia";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/PeopleInSpace.pm";
attribution github  => ["elebow", "Eddie Lebow"];

triggers any => 'people in space', 'humans in space', 'people in orbit', 'humans in orbit';

spice to => 'http://www.howmanypeopleareinspacerightnow.com/space.json';
spice wrap_jsonp_callback => 1;

handle remainder => sub {
    return 1;
};

1;
