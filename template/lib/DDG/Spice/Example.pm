package DDG::Spice::<: $ia_name :>;
# ABSTRACT: Write and abstract here
# Start at https://dukgo.com/duckduckhack/spice_overview if you are new
# to instant answer development

use DDG::Spice;

#Attribution
primary_example_queries "first example query", "second example query";
secondary_example_queries "optional -- demonstrate any additional triggers";
description "<: $ia_desc :>";
name "<: $ia_name :>";
icon_url "/i/<: $ia_domain :>.ico";
source "";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/<: $ia_name :>.pm";
category "";
topics "";
attribution github => ["https://github.com/", ""],
            twitter => ["https://twitter.com/", ""];

# Triggers
triggers any => "triggerWord", "trigger phrase";

# API location
spice to => 'http://<: $ia_domain :>/api/location/';

# Handle statement
handle remainder => sub {

	# optional - regex guard
	# return unless qr/^\w+/;

	return $_ if $_;
	return;
};

1;
