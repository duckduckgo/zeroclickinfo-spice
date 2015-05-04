package DDG::Spice::Coursebuffet;
# ABSTRACT: Online course search

use strict;
use DDG::Spice;
use Text::Trim;

spice to => 'https://www.coursebuffet.com/ddg/$1/$2';
spice from => '(.*?)/(.*)';
spice wrap_jsonp_callback => 1;

primary_example_queries "computer science online course";
secondary_example_queries "computer science coursera";
description "Course catalog for online learning!";
name "CourseBuffet";
source "CourseBuffet";

# could not find any relevant category, more like 'education'
category "special";

# We have all kinds of courses listing few of those categories here
topics "math", "programming", "computing", "science", "web_design";

code_url "https://github.com/rubydubee/ddg_coursebuffet/blob/master/lib/DDG/Spice/Coursebuffet.pm";
attribution web => ["http://www.coursebuffet.com", "Pradyumna Dandwate"],
            twitter => ["coursebuffet"],
            github  => ["rubydubee", "Pradyumna Dandwate"];

my @providers = (
    'coursera',
    'edx',
    'udacity',
    'saylor',
    'novoed',
    'futurelearn',
    'iversity',
    'open2study',
    'openuped'
);
my $providers_str = join('|', @providers);

triggers query_lc => qr/(online|$providers_str)?(?:\s+)?(.*)(?:\s+)(courses? online|courses?|classe?s?|moocs?|$providers_str)$/;

handle query_lc => sub {
    
    my $pre = $1;
    my $subject = $2;
    my $remainder = $3;
    
    if (defined($pre) && $pre =~ /($providers_str)/) {
        return "provider", $pre, $subject;
    }
    if (defined($remainder) && $remainder =~ /($providers_str)/) {
        return "provider", $remainder, $subject;
    }
    
    if(defined($remainder) && $remainder =~ /(courses?|classe?s?)/ && $remainder !~ /(courses? online)/ && $subject !~ /online/) {
        return if !defined($pre) || $pre !~ /online/;
    }
    if($subject) {
        return "standard", "courses", $subject;
    }

    return;
};

1;