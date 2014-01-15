package DDG::Spice::Recipes;

use DDG::Spice;
use Text::Trim;

primary_example_queries 'tofu ginger recipe';
description 'Search for Recipes';
name 'Recipes';
code_url 'https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Recipes.pm';

# removing line breaks from ingredients.txt file:
my %ingredients = map { trim($_) => 0 } share('ingredients.txt')->slurp;

triggers any => ('recipe', 'recipes', keys(%ingredients));

spice to => 'http://api.yummly.com//v1/api/recipes?q=$1&requirePictures=true&maxResult=35&_app_id={{ENV{DDG_SPICE_YUMMLY_APPID}}}&_app_key={{ENV{DDG_SPICE_YUMMLY_APIKEY}}}&callback={{callback}}';

handle query_lc => sub {
	if (index($_,'recipe') != -1){
		$_ =~ s/recipes|recipe//g;
		$_ = trim($_);
		return $_;
	}

	my $ingredient_count = 0;
	my $non_ingredient_count = 0;
	my @words = split(/ /, $_);

	foreach my $word (@words) {
		exists $ingredients{$word} ? $ingredient_count++ : $non_ingredient_count++;
	};

	return $_ if $ingredient_count > 0 && $non_ingredient_count < $ingredient_count;
	return;
};

1;
