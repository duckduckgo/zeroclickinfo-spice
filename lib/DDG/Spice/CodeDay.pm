package DDG::Spice::CodeDay;
# ABSTRACT: Get all CodeDay events, sorted by closest to farthest

use DDG::Spice;
use Text::Trim;

spice is_cached => 0;

name "CodeDay";
source "CodeDay.org";
icon_url "https://codeday.org/assets/img/favicon.ico";
description "Get information about a CodeDay or find the nearest one.";
primary_example_queries "codeday near me", "when is codeday?", "codeday san diego";
secondary_example_queries "codeday", "codeday seattle", "what is codeday bay area?";
category "programming";
topics "programming", "geek", "computing", "entertainment";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/CodeDay.pm";
attribution github => ["tjhorner", "TJ Horner"],
            twitter => "tjhorner";

spice to => 'https://clear.codeday.org/api/regions/$1?term=$2&lat=$3&lng=$4&limit=50';
spice from => "(.+)/(.*)/(.*)/(.*)";

spice wrap_jsonp_callback => 1;

triggers any => "codeday", "code day"; # yes, some people spell it like "code day"

# adapted from GetEvents
my $pattern = '';
my @triggers = ('when((\'|)s| is) (codeday|code day)', 'where((\'|)s| is) codeday', 'what((\'|)s| is) (codeday|code day)', '(codeday|code day)');

handle query => sub {
    my $query = $_;
    
    s/\?//gi;
    
    if((lc $_ eq "codeday") || (index(lc $_, "near me") != -1)){
        return unless $loc->latitude && $loc->longitude && ($loc->country_code eq "US");
        return "nearby", " ", $loc->latitude, $loc->longitude;
    } else {
        # get the city name
        foreach $pattern (@triggers) {
             s/$pattern//gi;
        }
        
        my $query = trim($_);
        
        return "search", $query, " ", " " if $query ne "";
        
        # they weren't searching for a specific event, give them the nearest one
        return unless $loc->latitude && $loc->longitude && ($loc->country_code eq "US");
        return "nearby", " ", $loc->latitude, $loc->longitude;
    }
};

1;
