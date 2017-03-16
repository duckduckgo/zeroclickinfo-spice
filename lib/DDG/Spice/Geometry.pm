package DDG::Spice::Geometry;
# ABSTRACT: Provides a formula shower / calculator for geometry

use DDG::Spice;

triggers startend => 'geometry', 'formula', 'calc';
triggers start => 'area of', 'perimeter of', 'volume of', 'diagonal of', 'surface area of';

spice call_type => 'self';

handle query_lc => sub {
    return call;
};

1;
