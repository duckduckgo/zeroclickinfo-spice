package DDG::Spice::RxInfo;
# ABSTRACT: Given an NDC or physical characteristics, returns an image or images of corresponding pill(s) along with some drug information

use strict;
use DDG::Spice;

triggers startend => 'pill', 'rxinfo', 'capsule', 'softgel', 'caplets';

spice to => 'http://rximage.nlm.nih.gov/api/rximage/1/rxbase?resolution=300&includeIngredients=true&parse=$1';
spice from => '(.*?)/(\d)';
spice wrap_jsonp_callback => 1;

my $triggerWords = join "|", share('triggerWords.txt')->slurp(chomp => 1);

handle remainder => sub {
    return unless $_;
    return $_, (/$triggerWords/) ? "0" : "1"; # return 0 if match in triggerWords file found
    return;
};
1;
