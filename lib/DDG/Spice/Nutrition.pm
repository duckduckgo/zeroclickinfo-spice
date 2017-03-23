package DDG::Spice::Nutrition;
# ABSTRACT: Nutrition information based on natural language queries

use strict;
use DDG::Spice;

my $attribute_regex = qr/(?^:(?^:(?:c(?:a(?:l(?:ories(?: from fat)?|cium|s)|rb(?:ohydrate)?s)|holesterol)|p(?:olyunsaturated fat|rotein)|trans(?: fat(?:ty acid)?|-fat)|s(?:aturated fat|odium|ugar)|monounsaturated fat|dietary fiber|f(?:iber|at)|vitamin [ac]|kcals|iron)))/;
my $question_regex = qr/(?:how|what)?\s?(?:'s |is |are |many |much )?(?:the |there )?(?:total |amount of |number of )?/;

triggers any => 'calories';
triggers start => 'calories in', 'total calories in', 'number of calories';
spice wrap_jsonp_callback => 1;

# update for v2 (natural language): https://developer.nutritionix.com/docs/v2

spice to => 'https://trackapi.nutritionix.com/v2/natural/nutrients';
spice headers => {
    "Content-Type" => "application/x-www-form-urlencoded",
    "x-app-id" => "$ENV{DDG_SPICE_NUTRITIONIX_APPID}",
    "x-app-key" => "$ENV{DDG_SPICE_NUTRITIONIX_APIKEY}"
};
spice post_body => 'query=$1';

handle remainder => sub {
    # return the remainder of the query
    return unless $_;
};

1;
