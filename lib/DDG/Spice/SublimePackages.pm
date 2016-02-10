package DDG::Spice::SublimePackages;
# ABSTRACT: Search for information about Sublime Text packages

use strict;
use DDG::Spice;

spice to => 'https://packagecontrol.io/search/$1.json';
spice wrap_jsonp_callback => 1;

triggers startend => "sublimetext package", "sublimetext packages", "sublime text package", "sublime text packages", "sublime text";

my $skip = join "|", share('skipwords.txt')->slurp(chomp => 1);

handle remainder => sub {
    return unless $_; 
    # OS search filters
    s/\blinux\b/:linux/g; 
    s/\bwindows\b|\bwin\b/:win/g;
    s/\bmac\s?os\s?x\b|\bos\s?x\b/:osx/g;
    # Version search filters
    s/v?(ersion )?2/:st2/g;
    s/v?(ersion )?3/:st3/g;
    # Do not trigger IA if query matches any words in skipwords.txt file
    return if  m/$skip/i;
    # Do not trigger IA if query matches alternative/s 
    return if  m/ ?alternatives? .*/i;
    s/\b(for)\s+?\b//g; #skip common words
    return $_;
};

1;
