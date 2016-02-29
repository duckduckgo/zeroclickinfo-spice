package DDG::Spice::Recipes;
# ABSTRACT: Search for recipes on yummly.com

use strict;
use DDG::Spice;
use Text::Trim;

# removing line breaks from ingredients.txt file:
my %ingredients = map { trim($_) => 0 } share('ingredients.txt')->slurp;
my @stopwords = ('duck duck hack');

triggers any => ('recipe', 'recipes', keys(%ingredients));

spice to => 'http://api.yummly.com/v1/api/recipes?q=$1&requirePictures=true&maxResult=35&_app_id={{ENV{DDG_SPICE_YUMMLY_APPID}}}&_app_key={{ENV{DDG_SPICE_YUMMLY_APIKEY}}}&callback={{callback}}';

handle query_lc => sub {
    return if grep {$req->query_lc eq $_} @stopwords;

    if ($_ =~ s/recipes?//g) {
        return trim($_);
    }

    my $ingredient_count = 0;
    my $non_ingredient_count = 0;
    my @words = split(/\s/, $_);

    foreach my $word (@words) {
        exists $ingredients{$word} ? $ingredient_count++ : $non_ingredient_count++;
    };

    return $_ if $ingredient_count > 1 && $non_ingredient_count < $ingredient_count;
    return;
};

1;
