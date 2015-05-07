package DDG::Spice::RxInfo;
# ABSTRACT: Given an NDC or physical characteristics, returns an image or images of corresponding pill(s) along with some drug information

use strict;
use DDG::Spice;

name "RxInfo";
source "C3PI RxImageAccess RESTful API";
description "Search for prescription and over the counter solid dosage pharmaceutical by NDC and characteristics (shape, color, imprint).";
primary_example_queries "pill red round", "rxinfo 68180-0481-01", "pill LL blue";
category "special";
topics "everyday", "special_interest";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/RxInfo.pm";
attribution web => ['http://www.medicosconsultants.com', 'Medicos Consultants, LLC'],
            twitter => ['jlanza2', 'Joseph Lanza'];

triggers startend => 'pill', 'rxinfo', 'capsule', 'tablet', 'softgel', 'caplets';

spice to => 'http://rximage.nlm.nih.gov/api/rximage/1/rxbase?resolution=300&includeIngredients=true&parse=$1';

spice wrap_jsonp_callback => 1;

handle remainder => sub {
    # Remove logical operators from query since they're disregarded by the API.
    s/and|or|not//ig;

    return $_ if $_;
    return;
};
1;