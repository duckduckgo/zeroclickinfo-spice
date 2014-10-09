package DDG::Spice::BtcToUsd;
# ABSTRACT: Returns the conversion of Bitcoin (BTC) to US Dollars (USD).

use DDG::Spice;

triggers end => 'btc to usd';

spice to => 'http://blockchain.info/ticker';
spice wrap_jsonp_callback => 1;

handle remainder => sub {
	my $amount = $_;
	if($amount =~ /^\d+\.?\d*$/){
    	return $amount;
    }
    return;
};

1;