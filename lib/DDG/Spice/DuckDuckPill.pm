package DDG::Spice::DuckDuckPill;
# ABSTRACT: Given an NDC or physical characteristics, returns an image or images of corresponding pill(s)

use DDG::Spice;

name "Pill Search";
source "C3PI RxImageAccess RESTful API";
description "Search for prespection and over the counter solid dosage pharmaceutical by NDC and characteristics (shape, color, imprint).";
primary_example_queries "pill red round", "pill 68180-0481-01", "pill LL blue";
category "special";
topics "everyday", "special_interest";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/DuckDuckPill.pm";
attribution web => ['http://www.medicosconsultants.com', 'Medicos Consultants, LLC'];

triggers start => 'pill';

spice to => 'http://rximage.nlm.nih.gov/api/rximage/1/rxbase?resolution=600&parse=$1';
spice wrap_jsonp_callback => 1;

handle remainder => sub {
    return $_ if $_;
    return;
};
1;
