package DDG::Spice::ColorPicker;
# ABSTRACT: Presents a color picker that allows the user to select a color or build a color palette.

use DDG::Spice;

name 'Color Picker';
description 'A tool to choose colors and build color palettes';
primary_example_queries 'color picker', 'colour picker', 'color picker #125f8d', 'color picker rgb(192, 168, 1)';
category 'random';
topics 'everyday', 'computing', 'programming', 'special_interest', 'web_design';
code_url 'https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/ColorPicker.pm';
attribution web => 'chrisharrill.com',
            github => 'github.com/chrisharrill',
            email => 'dev@chrisharrill.com',
            twitter => 'mattr555',
            github => ['https://github.com/mattr555/', 'Matt Ramina'];

triggers start => ['color picker', 'colour picker', 'colorpicker', 'colourpicker'];

spice call_type => 'self';

handle remainder => sub {
    return '';
};

1;
