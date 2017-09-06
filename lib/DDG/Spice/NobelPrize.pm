package DDG::Spice::NobelPrize;

use DDG::Spice;

spice is_cached => 1;
spice proxy_cache_valid => "200 1d"; # defaults to this automatically

spice wrap_jsonp_callback => 1;

spice to => 'http://api.nobelprize.org/v1/prize.json?&year=$1&category=$2';

triggers startend => 'nobel';

spice from => '([^-]*)-([^-]*)';

my $year_regex = qr/\b(?<year>\d{4})\b/;
my $category_regex = qr/\b(?<category>physics|chemistry|medicine|peace|literature|economics)\b/;
my $valid_remainders = qr/\b(in|on|at|of|for|winners?|prizes?)\b/;

handle remainder_lc => sub {

    return unless $_;

    my $year = m/$year_regex/ ? $+{year} : '';
    my $category = m/$category_regex/ ? $+{category} : '';

    $_ =~ s/$year_regex//;          # Removing the first year (yyyy) value found.
    $_ =~ s/$category_regex//;      # Removing the first category found.
    $_ =~ s/$valid_remainders//g;   # removing any number of valid remainders from the string.
    return unless $_ =~ m/^\s*$/;
 
    return unless ($year || $category);

    return "$year-$category";
};

1;