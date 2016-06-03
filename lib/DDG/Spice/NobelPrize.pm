package DDG::Spice::NobelPrize;

# ABSTRACT: Write an abstract here

# Start at http://docs.duckduckhack.com/walkthroughs/forum-lookup.html if you are new
# to instant answer development

use DDG::Spice;
use Data::Dumper;

spice is_cached => 1;
spice proxy_cache_valid => "200 1d"; # defaults to this automatically

spice wrap_jsonp_callback => 1;

spice to => 'http://api.nobelprize.org/v1/prize.json?' 
                . '&year=$1' 
                . '&category=$2';


# Triggers - https://duck.co/duckduckhack/spice_triggers
triggers startend => 'nobel';

spice from => '([^-]+)-([^-]+)';

# Handle statement
handle query_clean => sub {
    
    my $year_regex = qr/\b(\d{4})\b/;
    my $category_regex = qr/\b(physics|chemistry|medicine|peace|literature|economics)\b/;
    return unless ($_ =~ $year_regex || $_ =~ $category_regex);
    
    my $year = "";
    my $category = "";
    ($year)     =    ($_ =~ $year_regex)        if ($_ =~ $year_regex);
    ($category) =    ($_ =~ $category_regex)    if ($_ =~ $category_regex);

    return "$year-$category" if $_;
    
    return;
};

1;