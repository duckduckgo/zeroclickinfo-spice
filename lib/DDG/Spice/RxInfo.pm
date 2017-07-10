package DDG::Spice::RxInfo;
# ABSTRACT: Given an NDC or physical characteristics, returns an image or images of corresponding pill(s) along with some drug information

use strict;
use DDG::Spice;

triggers startend => 'pill', 'rxinfo', 'capsule', 'softgel', 'caplets';

spice to => 'https://rximage.nlm.nih.gov/api/rximage/1/rxnav?resolution=300&includeIngredients=true&parse=$1';

spice wrap_jsonp_callback => 1;

handle remainder => sub {
    # Remove logical operators from query since they're disregarded by the API.
    s/\b(and|or|not)\b//ig;

    return $_ if $_;
    return;
};
1;
