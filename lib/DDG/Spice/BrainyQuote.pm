package DDG::Spice::BrainyQuote;
# ABSTRACT: Return famous quotations

use DDG::Spice;

primary_example_queries "John Kennedy quotes";
secondary_example_queries "quotes about motivation", "Brad Pitt quotes", "chicago quotes";
description "Quotations from Brainyquote";
name "Quote";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/BrainyQuote.pm";
topics "entertainment", "reference";
category "reference";
attribution web => ['http://www.brainyquote.com','BrainyQuote.com'];

# The BrainyQuote Spice: Instant answers for famous quotations
#
# This spice will handle these type queries:
#    By Name of person:
#       "Abe Lincoln quotes"
#       "Abraham Lincoln quotations"
#       "JFK quotes"
#       "quotes by John Kennedy"
#    By Topic (quotes about a particular subject)
#       "love quotes"   
#       "funny quotes"
#       "quote leadership"
#    By Keyword (typically a single word in a quote, sometimes a short phrase)
#       "purple quotes"
#       "to be or not to be quotes"
#       "chicago quotes"
#       "quotes about cats"
#
#     No "full text" searching
#     ------------------------
#     Note that in keeping with the DuckDuckGo idea of only returning an exact answer,
#     we don't do full text searching within the quote. 
#     Therefore, given this Einstein quote:
#        "Only two things are infinite, the universe and human stupidity, and I'm
#         not sure about the former."
# 
#     No results will be returned if you search for:
#            "Only two things are infinite quote"
#     
#     Ignored Searches
#     ----------------
#     The server side code will ignore certain queries in case people are clearly searching
#     on something else, for example, searches for "stock quotes", "insurance quotes",
#     "mutual fund quotes", "bond quotes", etc.
#
triggers startend => 'quote', 'quotes', 'quotations';

spice to => 'http://www.brainyquote.com/api/ddg?q=$1';
spice wrap_jsonp_callback => 1;

handle remainder => sub {
	return $_ if $_;
	return;
};

1;
