package DDG::Spice::Quandl::Fundamentals;

use DDG::Spice;
use Text::Trim;

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
            
# load our trigger phrases
my @trigger_lines = share('fundamentals_triggers.txt')->slurp;
# hash to associate phrases with URL codes
my %trigger_phrases = ();
# array to preserve the order of the trigger phrases from the text file
my @trigger_keys;
foreach my $line (@trigger_lines) {
    # remove return char
    chomp $line;
    #only add if has value and is not a comment
    if (length $line > 0) {
        # split by tab
        my @chunks = split /\t/, $line;
        # add to our hash
        $trigger_phrases{$chunks[0]} = $chunks[1];
        # add to our array
        push @trigger_keys, $chunks[0];
    }
}

# defining our triggers
triggers any => @trigger_keys;

# to set an environmental variable:
# duckpan env set <name> <value>

# set spice parameters
spice to => 'http://quandl.com/api/v1/datasets/SF1/$1_MRQ.json?auth_token={{ENV{QUANDL_KEY_SF1}}}&rows=2';
spice wrap_jsonp_callback => 1;
spice proxy_cache_valid => "418 1d";

handle sub {

    # split query phrase by spaces
    my @words = split / /, $_;
    
    # load our list of tickers
    my %tickers = map { trim($_) => 0 } share('tickers.txt')->slurp;

    # go through each word of the query to see if it is a valid ticker
    my $ticker;
    foreach my $word (@words) {
        my $ucword = uc $word;
        # save ticker and exit loop if found
        if (exists $tickers{$ucword}) {
            $ticker = $ucword;
            last;
        }
    };
    
    # only return if we found a ticker in the search query
    my $query = lc $_;
    if ($ticker) {
        # iterate through trigger phrases in their file-order
        for my $trigger (@trigger_keys) {
            # return if the trigger phrase is in the query
            if ( $query =~ /$trigger/ ) {
                return $ticker . "_" . $trigger_phrases{$trigger};
            }
        };
    }
    
    return;
};

1;

