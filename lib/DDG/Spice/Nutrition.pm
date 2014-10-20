package DDG::Spice::Nutrition;

use DDG::Spice;

primary_example_queries "calories in a banana";
description "Shows nutrition information for food items";
name "Nutrition";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Nutrition.pm";
icon_url "/i/nutritionix.com.ico";
topics "food_and_drink";
category "food";

my $attribute_regex = qr/(?:(?:(?:c(?:a(?:l(?:ories(?: from fat)?|cium|s)|rb(?:ohydrate)?s)|holesterol)|p(?:olyunsaturated fat|rotein)|trans(?: fat(?:ty acid)?|-fat)|s(?:aturated fat|odium|ugar)|monounsaturated fat|dietary fiber|f(?:iber|at)|vitamin [ac]|iron)))/;

triggers any => 'cals','calories','fiber','dietary fiber','fat','trans-fat','trans fat','trans fatty acid','calories from fat','saturated fat','monosaturated fat','polyunsaturated fat','cholesterol','sodium','sugar','protein','carbs','carbohydrates','vitamin c','vitamin a','calcium','iron';

# brand_id is hard coded to USDA for now. Eventually could support searches across brands (i.e. packaged goods or restaurants, but requires multiple
# calls to their API so waiting for now):
spice to => 'http://api.nutritionix.com/v1_1/search/$1?results=0%3A20&brand_id=513fcc648110a4cafb90ca5e&fields=*&appId={{ENV{DDG_SPICE_NUTRITIONIX_APPID}}}&appKey={{ENV{DDG_SPICE_NUTRITIONIX_APIKEY}}}';
spice wrap_jsonp_callback => 1;

handle query_lc => sub {
    if (/^(?:how|what)?\s?(?:'s |is |are |many |much )?(?:the |there )?(?:total |amount of |number of )?$attribute_regex\s?(?:are |contained |is )?(?:there )?(?:in )?(?:a |an )?(.+?)(?:\?)?$/) {
		return $1 if $1;
    }

    return;
};

1;
