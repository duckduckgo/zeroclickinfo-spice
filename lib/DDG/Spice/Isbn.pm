package DDG::Spice::Isbn;
use DDG::Spice;
use Business::ISBN;

# Not much to see here. We get an ISBN number, then call a Spice plugin
# with the Open Library API.

# Note that this script has a dependency on Business::ISBN (available from CPAN)
# to validate ISBN numbers before we pass them off to Open Library.

primary_example_queries   "isbn 978-0-393-31604-9"; # Hyphenated ISBN-13
secondary_example_queries "ISBN 0 486 20167 8", # Spaced ISBN-10
		"isbn 1567312667"; # ISBN-10, no splits
description "look up ISBN numbers";
name "ISBN";
source "Open Library";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Isbn.pm";
topics "everyday";
category "reference";
attribution github => ['https://github.com/wolfgang42', 'Wolfgang42'];#,
	# TODO  email  => ['mailto:wolf@linestarve.com',    'wolf@linestarve.com'],
	# TODO  web    => ['http://linestarve.com/',        'linestarve.com'];

spice to => 'http://openlibrary.org/api/books?bibkeys=ISBN:$1&callback={{callback}}&jscmd=data';

triggers query_lc => qr/^isbn\s([0-9X -]+)$/;

handle matches => sub {
	my ($raw_isbn) = @_;
	my $isbn = Business::ISBN->new($raw_isbn);
	if ($isbn->is_valid) {
		return $isbn->isbn;
	} else {
		return; # Nothing; not an good ISBN
	}
};

1; # Perl modules always return 1.
