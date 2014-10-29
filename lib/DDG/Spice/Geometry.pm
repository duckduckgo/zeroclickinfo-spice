package DDG::Spice::Geometry;
# ABSTRACT: Provides a formula shower / calculator for geometry

use DDG::Spice;

primary_example_queries 'geometry square';
secondary_example_queries 'formula for circle area', 'geometry cube volume size: 4';
triggers startend => 'geometry', 'formula', 'calc';

name 'Geometry';
description 'Little calculator and formula shower for geometric formulas';
category 'formulas';

spice call_type => 'self';

handle query_lc => sub {
    return call;
};

1;
