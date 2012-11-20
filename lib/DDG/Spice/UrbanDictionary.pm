package DDG::Spice::UrbanDictionary;
# ABSTRACT: Give the Urban Dictionary definition of the search query.

use DDG::Spice;

spice is_unsafe => 1;
triggers startend => "ud", "urban", "urbandictionary", "urban dictionary", "meaning", "meaning of", "definition", "definition of", "acronym";
spice to => 'http://api.urbandictionary.com/v0/define?term=$1&callback={{callback}}';

attribution github => ['https://github.com/FiloSottile','FiloSottile'],
            web => ['http://pytux.it','Filippo Valsorda'],
            email => ['filippo.valsorda@gmail.com','Filippo Valsorda'];

handle remainder => sub {
    my ($term) = @_;
    return $term if $term;
    return;
};

1;