package DDG::Spice::NobelPrize;

# ABSTRACT: Write an abstract here

# Start at http://docs.duckduckhack.com/walkthroughs/forum-lookup.html if you are new
# to instant answer development

use DDG::Spice;
use Data::Dumper;

spice is_cached => 1;
spice proxy_cache_valid => "200 1d"; # defaults to this automatically

spice wrap_jsonp_callback => 1;

spice to => 'http://api.nobelprize.org/v1/prize.json?&year=$1&category=$2';

spice alt_to => {
        nobel_winner_details => {
                to => 'http://api.nobelprize.org/v1/laureate.json?&id=$1',
        }
};

# Triggers - https://duck.co/duckduckhack/spice_triggers
triggers startend => 'nobel';

spice from => '([^-]*)-([^-]*)';

my $year_regex = qr/\b(?<year>\d{4})\b/;
my $category_regex = qr/\b(?<category>physics|chemistry|medicine|peace|literature|economics)\b/;

handle remainder_lc => sub {

    return unless $_;
    
    my $year = m/$year_regex/ ? $+{year} : "";
    my $category = m/$category_regex/ ? $+{category} : "";
    return unless ($year || $category);

    return "$year-$category";
};

1;