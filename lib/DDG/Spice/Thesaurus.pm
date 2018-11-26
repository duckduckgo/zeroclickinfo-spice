package DDG::Spice::Thesaurus;
# ABSTRACT: Give the synonym, antonym, similar and related words of the query.

use strict;
use DDG::Spice;
use Text::Trim;

spice to => 'https://words.bighugelabs.com/api/2/{{ENV{DDG_SPICE_BIGHUGE_APIKEY}}}/$1/json?callback={{callback}}';

triggers startend => "synonyms", "synonym", "antonyms", "antonym", "thesaurus";

handle remainder_lc => sub {
    my $query = $_;
    return unless $query;
    
    # Remove words that have no bearing on the lookup
    $query =~ s/\b(of|for)+\b//g;
    trim $query;    
    return unless $query;
    
    # Abort if we're left with more than one word to lookup
    return if ($query =~ /\s+/);
  
    return $query;
};

1;
