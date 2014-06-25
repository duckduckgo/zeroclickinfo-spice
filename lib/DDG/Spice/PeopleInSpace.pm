package DDG::Spice::PeopleInSpace;
# ABSTRACT: Returns the number of humans currently in space

use DDG::Spice;

triggers any => 'people in space', 'humans in space', 'people in orbit', 'humans in orbit';

spice to => 'http://www.howmanypeopleareinspacerightnow.com/space.json';
spice wrap_jsonp_callback => 1;

handle remainder => sub {
    return 1;
};

1;
