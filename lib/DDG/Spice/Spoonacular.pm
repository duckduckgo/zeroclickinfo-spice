package DDG::Spice::Spoonacular;
# ABSTRACT: Finds delicious recipes on spoonacular.com

use DDG::Spice;

primary_example_queries "popular cheesecake recipes";
secondary_example_queries "cheeseburger with bacon but without gluten";
description "Shows delicious recipes.";
name "spoonacular recipe search";
code_url "https://github.com/ddsky/zeroclickinfo-spice/tree/master/lib/DDG/Spice/Spoonacular.pm";
icon_url "http://spoonacular.com/favicon.ico";
source "spoonacular.com";
topics "food_and_drink";
category "food";
attribution github  => ['https://github.com/ddsky', 'ddsky'],
            twitter => ['https://twitter.com/spoonacular', 'spoonacular'],
            facebook => ['https://facebook.com/spoonacular', 'spoonacular'],
            web =>   ['http://spoonacular.com','spoonacular'],
            email => ['david@spoonacular.com','David Urbansky'];

spice to => 'http://webknox.com:8080/recipes/searchFromApp?query=$1&number=18&username={{ENV{DDG_SPICE_SPOONACULAR_APIKEY}}}';

spice wrap_jsonp_callback => 1;

# cache every 200 or 304 response for 3 days
spice proxy_cache_valid => "200 304 3d";

# a list of dishes and the word recipe to trigger the search
my @triggers = share('triggers.txt')->slurp;

triggers any => @triggers;

handle query_lc => sub {
	my $q = $_;
	$q =~ s/best/popular/;
	return $q if $q;
	return;
};

1;
