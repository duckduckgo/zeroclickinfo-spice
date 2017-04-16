package DDG::Spice::Dogecoin;

use DDG::Spice;

primary_example_queries "dogecoin";
secondary_example_queries "dogecoin";
description "Get Dogecoin Exchange Rate";
name "Dogecoin";
source "https://prelude.io";
topics "economy_and_finance";
category "conversions";

attribution github => ['https://github.com/cryptospout','Cryptospout'],
            email => ['admin@cryptospout.com','Cryptospout'];
code_url "https://github.com/cryptospout/zeroclickinfo-spice/blob/master/lib/DDG/Spice/RedditSubSearch.pm";
spice to => 'https://api.prelude.io/last-usd/doge';
spice wrap_jsonp_callback => 1;
spice proxy_cache_valid => "418 1d";

triggers startend => "dogecoin", "dogecoin price", "doge to usd", "doge coin exchange", "dogecoin exchange rate", "doge coin price","doge/usd","usd/doge";

handle remainder => sub {
	return '' if $_ eq '';
	return;
};
1;
