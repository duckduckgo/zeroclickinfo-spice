package DDG::Spice::Nutrition;
# ABSTRACT: Nutrition information

use strict;
use DDG::Spice;

my $attribute_regex = qr/(?^:(?^:(?:c(?:a(?:l(?:ories(?: from fat)?|cium|s)|rb(?:ohydrate)?s)|holesterol)|p(?:olyunsaturated fat|rotein)|trans(?: fat(?:ty acid)?|-fat)|s(?:aturated fat|odium|ugar)|monounsaturated fat|dietary fiber|f(?:iber|at)|vitamin [ac]|kcals|iron)))/;
my $question_regex = qr/(?:how|what)?\s?(?:'s |is |are |many |much )?(?:the |there )?(?:total |amount of |number of )?/;

# measurement triggers
my @measurement_triggers = qw(calories cals);

# List of fruits, vegetables, meat, animal products triggers
my @fruits = share('fruits.txt')->slurp;
my @vegetables = share('vegetables.txt')->slurp;
my @meat = share('meat.txt')->slurp;
my @animal_products = share('animal_products.txt')->slurp;
my @fish = share('fish.txt')->slurp;
my @food_triggers = (@fruits, @vegetables, @meat, @animal_products, @fish);

my @triggers = (@measurement_triggers, @food_triggers);
triggers any => @triggers;

# brand_id is hard coded to USDA for now. Eventually could support searches across brands (i.e. packaged goods or restaurants, but requires multiple
# calls to their API so waiting for now):
spice to => 'http://api.nutritionix.com/v1_1/search/$1?results=0%3A20&brand_id=513fcc648110a4cafb90ca5e&fields=*&appId={{ENV{DDG_SPICE_NUTRITIONIX_APPID}}}&appKey={{ENV{DDG_SPICE_NUTRITIONIX_APIKEY}}}';
spice wrap_jsonp_callback => 1;

handle query_lc => sub {

    # check for queries like "how many calories are in a cucumber"
    if (/^$question_regex$attribute_regex\s?(?:are |contained |is )?(?:there )?(?:in )?(?:a |an )?(.+?)(?:\?)?$/) {
        return $1 if $1;
    }

    # for queries like "cucumber calories" or "tofu how much protein"
    if (/^(.+?)\s?$question_regex$attribute_regex(?:\?)?/) {
        return $1 if $1;
    }
    
    # check for matching fruits, vegetables, animal products, meat, ...
    if ( grep( /^$_$/, @food_triggers ) ) {
        return $_;
    }
    
    return;
};

1;
