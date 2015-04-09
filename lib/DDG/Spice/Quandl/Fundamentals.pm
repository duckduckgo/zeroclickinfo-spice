package DDG::Spice::Quandl::Fundamentals;
# ABSTRACT: Basic stock ticker through Quandl

use DDG::Spice;
use Text::Trim;
use YAML::XS qw( Load );

# meta data
primary_example_queries "AAPL earnings";
secondary_example_queries "revenues aapl";
description "Returns fundamental data for a given stock ticker";
name "Fundamentals";
code_url "https://github.com/brianrisk/zeroclickinfo-spice";
icon_url "https://www.quandl.com/favicon.ico";
topics "economy_and_finance";
category "finance";
attribution web => ["https://www.quandl.com", "Quandl"],
            twitter => "quandl";

# hash associating triggers with indicator codes
my $trigger_hash = Load(scalar share('fundamentals_triggers.yml')->slurp);

# triggers sorted by length so more specific is used first
my @trigger_keys = sort { length $b <=> length $a } keys($trigger_hash);

# load our list of tickers
my %tickers = map { trim($_) => 0 } share('tickers.txt')->slurp;

# defining our triggers
triggers startend => @trigger_keys;

# to set an environmental variable:
# duckpan env set <name> <value>

# set spice parameters
spice to => 'http://quandl.com/api/v1/datasets/SF1/$1_MRQ.json?auth_token={{ENV{DDG_SPICE_QUANDL_APIKEY}}}&rows=2';
spice wrap_jsonp_callback => 1;
spice proxy_cache_valid => "418 1d";

handle sub {

    # split query phrase by spaces
    my @words = split / /, lc $_;
    my $wordsSize = scalar @words;

    # exit if query is less than two words
    if ($wordsSize < 2) {return;}

    # Only valid if ticker symbol is at beginning or end
    my $ticker;
    if (exists $tickers{$words[0]}) {
        $ticker = uc $words[0];
    } elsif (exists $tickers{$words[$wordsSize - 1]}) {
       $ticker = uc $words[$wordsSize - 1];
    }

    # exit if we do not have a valid ticker
    return unless $ticker;


    # only return if we found a ticker in the search query
    my $query = lc $_;

    # iterate through trigger phrases
    for my $trigger (@trigger_keys) {
        # return if the trigger phrase is in the query
        if ( $query =~ /$trigger/ ) {
            return $ticker . "_" . $trigger_hash->{$trigger};
        }
    };

    return;
};

1;

