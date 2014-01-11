package DDG::Spice::Finance;
# ABSTRACT: Write and abstract here
# Start at https://dukgo.com/duckduckhack/spice_overview if you are new
# to instant answer development

use DDG::Spice;

#Attribution
primary_example_queries "finance yhoo", "stock quote msft";
description "Succinct explanation of what this instant answer does";
name "Finance";
icon_url "http://finance.yahoo.com/q?s=";
source "";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Finance.pm";
category "finance";
topics "economy_and_finance";
attribution github => ["https://github.com/henryhund", "Henry Hund"],
            twitter => ["https://twitter.com/henryhund", "Henry Hund"];

# Triggers
triggers start => "finance", "stock", "stock price", "share", "share price", "px", "stock quote";

spice to => 'http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20%3D%20%22$1%22%0A%09%09&format=json&diagnostics=true&env=http%3A%2F%2Fdatatables.org%2Falltables.env';
spice wrap_jsonp_callback => 1;

# Handle statement
handle remainder => sub {

	# optional - regex guard
	# return unless qr/^\w+/;

	return $_ if $_;
	return;
};

1;
