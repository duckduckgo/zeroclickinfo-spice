package DDG::Spice::<: $ia_name :>;
# ABSTRACT: Write an abstract here
# Start at https://duck.co/duckduckhack/spice_overview if you are new
# to instant answer development

use DDG::Spice;

zci answer_type => "<: $lia_name :>";
zci is_cached   => 1;

# Metadata.  See https://duck.co/duckduckhack/metadata for help in filling out this section.
name "<: $ia_name :>";
source "";
icon_url "";
description "Succinct explanation of what this instant answer does";
primary_example_queries "first example query", "second example query";
secondary_example_queries "optional -- demonstrate any additional triggers";
category "";
topics "";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/<: $ia_name :>.pm";
attribution github => ["GitHubAccount", "Friendly Name"],
            twitter => "twitterhandle",

# Triggers
triggers any => "triggerWord", "trigger phrase";

# Handle statement
handle remainder => sub {

	# optional - regex guard
	# return unless qr/^\w+/;

	return unless $_; # Guard against "no answer"

	return $_;
};

1;
