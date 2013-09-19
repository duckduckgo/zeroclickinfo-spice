package DDG::Spice::AllSportsPeople;

use DDG::Spice;

primary_example_queries "tiger woods";
secondary_example_queries "biography tiger woods";
description "All Sports People Database with huge amounts of sports personalities and teams from all around the globe";
name "All Sports People Database";
source "AllSportsPeople website";
code_url "https://github.com/duckduckgo/zeroclickinfo-goodies/blob/master/lib/DDG/Goodie/AllSportsPeople.pm";
topics "everyday", "entertainment", "geek", "special_interest", "social";
category "reference";
attribution github => ['https://github.com/4AceTechnologies','wqr786'],
web => 'http://www.allsportspeople.com/';

my @triggers = share("triggers.txt")->slurp;
triggers startend => @triggers;

spice to => 'http://www.allsportspeople.com/api/$1/{{callback}}/';

handle remainder => sub {
    return $_ if $_;
    return;
};

1;
