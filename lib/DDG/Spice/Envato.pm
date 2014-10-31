package DDG::Spice::Envato;
use DDG::Spice;

my @triggers = qw(themeforest codecanyon videohive audiojungle graphicriver 3docean activeden);
triggers any => @triggers;

my $triggers = join '|', @triggers;

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
    my $platform = $1 if $_ =~ /($triggers)/;

    if ($platform){
        # remove trigger name, remove or/and words, remove everything that is not a space or a word character
        s/[^\s\w]|$platform|\s+and|\s+or|or\s+|and\s+//g;

        # trim a query
        s/^\s+|\s+$//g;
        
        # replace spaces with |
        s/\s+/|/g;

        print $_;

        return $platform, $_;
    }

    return 
};

1;