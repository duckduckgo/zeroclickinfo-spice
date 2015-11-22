package DDG::Spice::Bitcoin;
# ABSTRACT: Display bitcoin address balance, transaction or block information
use strict;
use DDG::Spice;

description "Display bitcoin address balance, transaction or block information";
primary_example_queries "19KJZ5aqWnrrCaNAS5Pbd4uknPFBxjALRt", "1Jz6HEKNJpYjXAYRLn49QUUUrizL5qGxjM",
                        "c50a642df986d2623dec7f5e5a7fbd5c9b8f57aea5fa68ea2b03f44dc6260042",
                        "751c93b7ab2d06b17778e6039f1269f5988403327601994cd70928df7af59155",
                        "00000000839a8e6886ab5951d76f411475428afc90947ee320161bbf18eb6048",
                        "0000000000000000137fda2ad0d6f81b76ee0a7c3c1224630115034b16afdaef";               
secondary_example_queries "btc address 19KJZ5aqWnrrCaNAS5Pbd4uknPFBxjALRt",
                          "bitcoin address 1Jz6HEKNJpYjXAYRLn49QUUUrizL5qGxjM",
                          "btc transaction c50a642df986d2623dec7f5e5a7fbd5c9b8f57aea5fa68ea2b03f44dc6260042",
                          "bitcoin transaction 751c93b7ab2d06b17778e6039f1269f5988403327601994cd70928df7af59155",
                          "btc block 00000000839a8e6886ab5951d76f411475428afc90947ee320161bbf18eb6048",
                          "bitcoin block 0000000000000000137fda2ad0d6f81b76ee0a7c3c1224630115034b16afdaef";
name "Bitcoin";
source "https://api.biteasy.com";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Bitcoin.pm";
topics "economy_and_finance";
category "finance";
icon_url "https://www.biteasy.com/favicon.ico";
attribution github => ["MrChrisW", "Chris Wilson"],
            github => ['https://github.com/biteasy','biteasy.com'],
            email => ['support@biteasy.com','biteasy.com'],
            twitter => ["biteasy", 'biteasy.com'],
            web => ['https://biteasy.com','biteasy.com'];

my $addressTriggers = '^(?:bitcoin address|btc address)?\s*([13][1-9A-HJ-NP-Za-km-z]{26,33})$';
my $txTriggers = '^(?:bitcoin transaction|btc transaction)?\s*([a-fA-F0-9]{64})$';
my $blockTriggers = '^(?:bitcoin block|btc block)?\s*(0{8}[a-fA-F0-9]{56})$';

triggers query_raw => qr/$addressTriggers|$txTriggers|$blockTriggers/;

spice to => 'https://api.biteasy.com/v2/btc/mainnet/$1/$2?api_key={{ENV{DDG_SPICE_BITEASY_APIKEY}}}';

spice from => '(.*)/(.*)';

spice wrap_jsonp_callback => 1;

spice proxy_cache_valid => "418 1d";

handle query_raw => sub { 
    return unless $_;
    #remove trigger words
    s/(b[a-z]{0,7})\s(transaction|block|address)\s+|//g; 
    # switch api endpoints based on query
    return "addresses", $_ if m/$addressTriggers/; 
    return "blocks", $_ if m/$blockTriggers/;
    return "transactions", $_ if m/$txTriggers/;
};

1;
