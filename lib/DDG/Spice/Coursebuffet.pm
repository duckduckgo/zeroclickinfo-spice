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

triggers any => 'online course', 'online courses', 'course online', 'courses online', @providers;

handle query_lc => sub {
    # MOOC provider specific search returns courses for the specified provider
    if (/($providers_str)/) {
        return "provider", $1, trim("$` $'");
    }

    # Generic course search
    if (/\bonline courses?\b/ || /\bcourses? online\b/) {
        return "standard", "courses", trim("$` $'");
    }

    return;
};

1;