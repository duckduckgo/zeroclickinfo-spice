package DDG::Spice::Enervee;

use DDG::Spice;

# This plugin will look at all queries to check if it contains a MNC or UPN number 
# Using a match table that will be read from a CSV file, it will find a matching Enervee Product id
# Using the product id it will get the data from Enervee API and show it

# Query string can contain the MNC or UPC anywhere
# The query string will have any word as a MNC or UPC
# It can also contain the MNC and UPC as a substring of any word


use Encode;

primary_example_queries "show EW39T6MZ product";
description "Gets the product info from Enervee";
name "Enervee";
attribution github => ['https://github.com/sidchilling', 'Siddharth Saha'],
            twitter => ['http://twitter.com/sid_chilling', 'Siddharth Saha'];

# Declare the internal functions needed
sub trim($);
sub make_map();
sub wordify_query(@);
sub substrings($);

spice to => 'http://www.enervee.com/isearch/lookup/?id=$1&callback={{callback}}';

spice is_cached => 0;

triggers query_lc => qr/([\s|\S]+)/;

# Define the internal functions
sub trim($) {
    # This function trims the string by removing the leading and trailing whitespaces
    my $string = shift;
    $string =~ s/^\s+//;
    $string =~ s/\s+$//;
    return $string;
};

sub make_map() {
    # This function reads the CSV file and makes the map
    my $file = "enervee.csv";
    my %map = ();
    open (my $data, '<', $file) or die "Could not open $file";
    while (my $line = <$data>) {
	chomp $line;
	my @fields = split(",", $line);
	$map{lc(trim($fields[1]))} = trim($fields[0]);
    }
    return %map;
};

sub wordify_query(@) {
    # This function takes the query and returns individual words in the query
    my @query = shift;
    my @query_words = split(/[\s]+/, $query[0]);
    return @query_words;
};

sub substrings($) {
    # This functions returns all the substrings of a string
    my $string = shift;
    my @result = ();
    foreach my $length (1.. length($string)) {
	foreach my $offset (0.. length($string)-$length) {
	    push @result, substr($string, $offset, $length);
	}
    }
    return @result;
};

handle matches => sub {
    my @query = @_; # This is the complete query string
    my %map = make_map(); # Map of UPC vs Enervee product id
    my @query_words = wordify_query(@query); # Individual words of the query
    # Now we have to find whether any of the words are in the map
    foreach my $word (@query_words) {
	$word = trim($word);
	if (exists $map{$word}) {
	    return $map{$word};
	}
    }
    # check with substrings
    foreach my $word (@query_words) {
	$word = trim($word);
	my @substrings = substrings($word);
	foreach my $i (@substrings) {
	    if (exists $map{$i}) {
		return $map{$i};
	    }
	}
    }
    return;
};

1;
