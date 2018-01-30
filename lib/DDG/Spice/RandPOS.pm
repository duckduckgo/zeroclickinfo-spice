package DDG::Spice::RandPOS;
# ABSTRACT: Returns a random word or list of words from the specified part of speech using Wordnik.

use DDG::Spice;
use Text::Trim;

spice from => '([^/]+)/?(?:([^/]+)/?(?:([^/]+)|)|)';
spice to => 'http://api.wordnik.com/v4/words.json/randomWords?includePartOfSpeech=$1&minCorpusCount=10000&limit=$2&api_key={{ENV{DDG_SPICE_WORDNIK_APIKEY}}}&callback={{callback}}';
spice proxy_cache_valid => '418 1d';
spice content_type_javascript => 1;

# List of all trigger words
my @triggerWords = map { ($_, $_."s") } qw(noun verb adjective pronoun preposition conjunction adverb);
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
