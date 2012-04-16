package DDG::Spice::Movie;

use DDG::Spice;

triggers startend => "movie";

handle remainder => sub {
  $return = qq(/imo/$1);
};
1;