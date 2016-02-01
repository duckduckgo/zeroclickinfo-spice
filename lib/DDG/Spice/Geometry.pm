package DDG::Spice::Geometry;
# ABSTRACT: Provides a formula shower / calculator for geometry

use DDG::Spice;

triggers startend => 'geometry', 'formula', 'calc';

spice call_type => 'self';

handle query_lc => sub {
    return call;
};

1;
