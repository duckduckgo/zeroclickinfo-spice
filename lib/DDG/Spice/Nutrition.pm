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

triggers query_lc => $attribute_regex;

# brand_id is hard coded to USDA for now. Eventually could support searches across brands (i.e. packaged goods or restaurants, but requires multiple
# calls to their API so waiting for now):
spice to => 'https://api.nutritionix.com/v1_1/search/$1?results=0%3A20&brand_id=513fcc648110a4cafb90ca5e&fields=*&appId={{ENV{DDG_SPICE_NUTRITIONIX_APPID}}}&appKey={{ENV{DDG_SPICE_NUTRITIONIX_APIKEY}}}';
spice wrap_jsonp_callback => 1;

handle query_lc => sub {
    my $food_item = '';

    if (/^(?:how|what)?(?:'s | is | are | many | much )?(?:the )?(?:total | amount of )?$attribute_regex\s?(?:are | contained )?(?:there )?(?:in )?(?:a |an )?(.*)/) {
        $food_item = $1;
    }

    return $food_item if $food_item;
    return;
};

1;
