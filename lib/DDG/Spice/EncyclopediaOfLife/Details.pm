package DDG::Spice::EncyclopediaOfLife::Details;
#ABSTRACT: Returns more information about a plant/animal species
#called by Search.pm in order to get more information about a species

use DDG::Spice;

spice to => 'http://eol.org/api/pages/1.0/$1.json?images=1&videos=0&sounds=0&maps=0&text=1&iucn=false&subjects=overview&licenses=all&details=true&common_names=true&synonyms=false&references=false&vetted=0&cache_ttl=';

triggers startend => '///***never trigger***///';

handle sub {
    return $_ if $_;
    return;
};

1;