package DDG::Spice::Coursebuffet;
# ABSTRACT: Online course search

use strict;
use DDG::Spice;
use Text::Trim;

spice to => 'https://www.coursebuffet.com/ddg/$1/$2';
spice from => '(.*?)/(.*)';
spice wrap_jsonp_callback => 1;

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

triggers any => 'online', 'learn', @providers;

handle query_lc => sub {
    # MOOC provider specific search returns courses for the specified provider
    if (/($providers_str)/) {
        return "provider", $1, trim("$` $'");
    }

    # Generic course search
    if (/\bonline courses?\b/ || /\bcourses? online\b/) {
        return "standard", "courses", trim("$` $'");
    }
    
    # Course search type "Learn X Online" and "Online X courses".
    if ( /online (.*) courses?/ || /learn (.*) online/) {
        return "standard", "courses", $1;
    }

    return;
};

1;
