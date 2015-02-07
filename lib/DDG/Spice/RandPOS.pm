package DDG::Spice::RandPOS;
# ABSTRACT: Returns a random word or list of words from the specified part of speech using Wordnik.

use DDG::Spice;
use Text::Trim;

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

spice from => '([^/]+)/?(?:([^/]+)/?(?:([^/]+)|)|)';
spice to => 'http://api.wordnik.com/v4/words.json/randomWords?includePartOfSpeech=$1&minCorpusCount=10000&limit=$2&api_key={{ENV{DDG_SPICE_WORDNIK_APIKEY}}}&callback={{callback}}';
spice proxy_cache_valid => '418 1d';

# List of all trigger words
my @triggerWords = ('noun', 'nouns', 
                 'verb', 'verbs', 
                 'adjective', 'adjectives', 
                 'pronoun', 'pronouns', 
                 'preposition', 'prepositions', 
                 'conjunction', 'conjunctions', 
                 'adverb', 'adverbs');

# List of keywords used with triggers
my @keywords = ("random", "example");
# Join keywords for use in regexp
my $keywords = join "|", @keywords;
# Map keywords and triggers into a list suitable for triggers
my @triggers = map { $keywords[0]." ".$_, $keywords[1]." ".$_, $_." ".$keywords[1] } @triggerWords;
# Use the triggers list
triggers start => @triggers;

handle query_lc => sub {
    # Remove keywords, trim: random, example
    s/$keywords//g;
    $_ = trim($_);
    # Guard, returns if additional space is found, indicating a new word
    return if m/([\s]+)/;
    # Last triggerWord ends in "s" return 5 else return 1
    if (/s$/) {
        return substr($_, 0, -1), 5;
    } else {
        return $_, 1;
    }

    return;
};

1;