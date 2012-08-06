package DDG::Spice::Bootic;
# ABSTRACT: Search for products on Bootic.

use DDG::Spice;

triggers any => 'bootic';
triggers startend => 'buy', 'purchase';

spice from => '(.*)/([01])';
spice to => 'http://www.bootic.com/cgi-bin/api/search/products?output=json&callback={{callback}}&pretty_name=1&limit=5&strict_search=$2&q=$1';

handle query_lc => sub {
	my $want_strict = 1;
	my @args;
	foreach my $word ( split /\s+/, $_ )
	{
		if ( $word eq 'bootic' )
		{
			$want_strict = 0;
		}
		elsif ( $word eq 'buy' or $word eq 'purchase' )
		{
			# nothing
		}
		else
		{
			push @args, $word;
		}
	}
	my $args = join " ", @args;
	return $args, $want_strict;
};

1;
