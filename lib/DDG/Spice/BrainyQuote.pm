package DDG::Spice::BrainyQuote;
# ABSTRACT: Return famous quotations

use strict;
use DDG::Spice;

triggers startend => 'quote', 'quotes', 'quotation', 'quotations';

spice to => 'http://www.brainyquote.com/api/ddg?q=$1';
spice wrap_jsonp_callback => 1;

handle remainder => sub {
    # Convert queries such as J.R.R. Tolkien to J. R. R. Tolkien.
    # We're doing this because the first one is rejected by BrainyQuote.
    if(/^\w\.\w/) {
        s/\./\. /g;
    }
    
    # Avoid triggering on 'stock' quotes; these are handled by Stocks IA
    # Also avoid triggering on 'quote of the day' and 'quote for the day'; these are handled by QuoteOfTheDay IA
    if ($req->query_lc =~ m/stock quote/ || $req->query_lc =~ m/quote of the day/ || $req->query_lc =~ m/quote for the day/ ) {
       return;
    }

    return $_ if $_;
    return;
};

1;

