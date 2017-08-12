package DDG::Spice::Quandl::Fundamentals;
# ABSTRACT: Basic stock ticker through Quandl

use DDG::Spice;
use Text::Trim;
use YAML::XS 'LoadFile';

# hash associating triggers with indicator codes
my $trigger_hash = LoadFile(share('fundamentals_triggers.yml'));

# triggers sorted by length so more specific is used first
my @trigger_keys = sort { length $b <=> length $a } keys(%$trigger_hash);
my $trigger_qr = join "|", @trigger_keys;

# load our list of tickers
my %tickers = map { trim($_) => 0 } share('tickers.txt')->slurp;

# defining our triggers
triggers startend => @trigger_keys;

# set spice parameters
spice to => 'https://www.quandl.com/api/v1/datasets/SF1/$1_MRQ.json?auth_token={{ENV{DDG_SPICE_QUANDL_APIKEY}}}&rows=2';
spice wrap_jsonp_callback => 1;
spice proxy_cache_valid => "418 1d";

handle query_lc => sub {
    my ($ticker, @words, $wordsSize, $trigger);
    
    @words = split / /; # split query phrase by spaces
    $wordsSize = scalar @words; # number of words

    return if ($wordsSize < 2); # exit if query is less than two words

    $ticker = uc $words[0] if exists $tickers{$words[0]}; # first word: check if a vaild ticker exists
    $ticker = uc $words[$wordsSize - 1] if exists $tickers{$words[$wordsSize - 1]}; # last word: check if a vaild ticker exists

    return unless $ticker; # exit if we do not have a valid ticker
      
    return unless m/\b($trigger_qr)\b/; # return unless we have a trigger
    $trigger = $trigger_hash->{$1}; # get trigger symbol
    
    return $ticker . "_" . $trigger;
    
};
1;
