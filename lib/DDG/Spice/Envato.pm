package DDG::Spice::Envato;
use DDG::Spice;

my @triggers = qw(themeforest codecanyon videohive audiojungle graphicriver photodune 3docean activeden);
triggers any => @triggers;

primary_example_queries 'themeforest responsive portfolio';
secondary_example_queries 'audiojungle happy electronic';

name 'Envato';
description 'Search the Envato marketplace';
source 'Envato';
code_url 'https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Envato.pm';
category 'programming';
topics qw(programming geek web_design music);

attribution github => ['https://github.com/mobily','Marcin Dziewulski'], 
			twitter => ['http://twitter.com/marcinmobily', 'marcinmobily'],
			web => ['http://www.mobily.pl', 'Marcin Dziewulski'];

spice wrap_jsonp_callback => 1;
spice from => '([^\/]+)/([^\/]+)';
spice to => 'http://marketplace.envato.com/api/edge/search:$1,,$2.json';

handle query_lc => sub {
	my $triggers = join '|', @triggers;
	my $platform = $1 if $_ =~ /($triggers)/;

	if ($platform){
		s/[^\s\w]|$platform|\s+and|\s+or|or\s+|and\s+//g;
		s/^\s+|\s+$//;

		my @arr = join '|', split ' ', $_;

		return $platform, @arr;
	}

	return 
};

1;