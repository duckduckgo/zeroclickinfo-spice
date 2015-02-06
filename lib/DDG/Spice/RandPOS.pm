package DDG::Spice::RandPOS;
# ABSTRACT: Returns a random word or list of words from the specified part of speech using Wordnik.

use DDG::Spice;

name 'Random Part of Speech Words';
source 'Wordnik';
description 'Returns one or more random words in the specified part of speech.';
primary_example_queries 'random noun','example adjectives','adverb example';
category 'language';
topics 'words_and_games','everyday';
code_url 'https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/RandPOS.pm';
attribution github => ['https://github.com/SueSmith', 'SueSmith'],
    web => ['http://benormal.info','Sue Smith'],
    twitter => 'braindeadair';

triggers start => 'random';
triggers startend => 'example';

spice from => '([^/]+)/?(?:([^/]+)/?(?:([^/]+)|)|)';
spice to => 'http://api.wordnik.com/v4/words.json/randomWords?includePartOfSpeech=$1&minCorpusCount=10000&limit=$2&api_key={{ENV{DDG_SPICE_WORDNIK_APIKEY}}}&callback={{callback}}';
spice proxy_cache_valid => '418 1d';

handle remainder => sub {

    return unless $_ =~ /^(noun|nouns|verb|verbs|adjective|adjectives|pronoun|pronouns|preposition|prepositions|conjunction|conjunctions|adverb|adverbs)$/i;

    if($_ =~ /nouns|verbs|adjectives|pronouns|prepositions|conjunctions|adverbs/){
        return substr($_, 0, -1), 5;
    }
    if ($_ =~ /noun|verb|adjective|pronoun|preposition|conjunction|adverb/){
        return $_, 1;
    }
    return;
};

1;