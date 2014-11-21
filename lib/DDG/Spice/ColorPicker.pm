package DDG::Spice::ColorPicker;
# ABSTRACT: Presents a color picker that allows the user to select a color or build a color palette.

use DDG::Spice;

triggers start => 'color picker', 'colour picker';

spice call_type => 'self';

handle remainder => sub {
    return call;
};

1;