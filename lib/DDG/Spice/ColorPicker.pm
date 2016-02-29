package DDG::Spice::ColorPicker;
# ABSTRACT: Presents a color picker that allows the user to select a color or build a color palette.

use DDG::Spice;

triggers start => ['color picker', 'colour picker', 'colorpicker', 'colourpicker'];

spice call_type => 'self';

handle remainder => sub {
    return '';
};

1;
