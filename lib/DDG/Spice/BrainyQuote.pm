package DDG::Spice::BrainyQuote;
# ABSTRACT: Return famous quotations

use DDG::Spice;

primary_example_queries "John Kennedy quotes", "Brad Pitt quotations";
secondary_example_queries "quotes about motivation";
description "Provides quotations on and about given topics";
name "Quotations";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/BrainyQuote.pm";
icon_url "http://brainyquote.com/favicon.ico";
topics "everyday", "trivia";
category "reference";
source "BrainyQuote.com";
attribution web => ['http://www.brainyquote.com','BrainyQuote.com'];

triggers startend => 'quote', 'quotes', 'quotation', 'quotations';

spice to => 'http://www.brainyquote.com/api/ddg?q=$1';
spice wrap_jsonp_callback => 1;

handle remainder => sub {
    # Convert queries such as J.R.R. Tolkien to J. R. R. Tolkien.
    # We're doing this because the first one is rejected by BrainyQuote.
    if(/^\w\.\w/) {
	s/\./\. /g;
    }

    return $_ if $_;
    return;
};

1;
