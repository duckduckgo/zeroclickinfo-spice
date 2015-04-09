package DDG::Spice::SublimePackages;
# ABSTRACT: Search for information about Sublime Text packages

use strict;
use DDG::Spice;

name "SublimePackages";
source "packagecontrol.io";
icon_url "/i/packagecontrol.io.ico";
description "Display Sublime Text packages";
primary_example_queries "sublimetext package code", "sublime text package php";
category "software";
topics "programming", "computing";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/SublimePackages.pm";
attribution github => ["MrChrisW", "Chris Wilson"],
            web => ["http://chrisjwilson.com", "Chris Wilson"];

spice to => 'https://packagecontrol.io/search/$1.json';
spice wrap_jsonp_callback => 1;

my @triggers = ("sublimetext packages", "sublimetext package", "sublime text packages", "sublime text package", "sublime text");
my $triggers = join '|', @triggers;

triggers startend => @triggers;

my $skip = join "|", share('skipwords.txt')->slurp(chomp => 1);

handle query_lc => sub {
	my $query = $_;
	# If the trigger doesn't contain package(s) the trigger is "sublime text" 
	if($query !~ m/packages?/i) {
		# Do not trigger IA if query matches any words in skipwords.txt file
		return if ($query =~ m/$skip/i)
	}
	s/$triggers//g; # Remove triggers
	s/^\s+|\s+$//g; # Trim
    return unless $_;   
    return $_;
};
1;