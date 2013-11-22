package DDG::Spice::BrainyQuote;
# ABSTRACT: Return famous quotations

use DDG::Spice;

triggers startend => 'quote', 'quotes', 'quotations';

spice to => 'http://dev.brainyquote.com/api/ddg?q=$1';
spice wrap_jsonp_callback => 1;

handle remainder => sub {
	return $_ if $_;
	return;
};

1;
