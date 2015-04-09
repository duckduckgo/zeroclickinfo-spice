package DDG::Spice::MalayalamDictionary::EaswareApps;
# ABSTRACT: Write an abstract here
# Start at https://duck.co/duckduckhack/spice_overview if you are new
# to instant answer development

use DDG::Spice;

# Caching - https://duck.co/duckduckhack/spice_advanced_backend#caching
spice is_cached => 1; 

# Metadata.  See https://duck.co/duckduckhack/metadata for help in filling out this section.
name "Malayalam Dictionary";
source "Olam - http://olam.in";
icon_url "http://olam.in/favicon.ico";
description "Find meaning of words in Malayalam(ML) - An Indian Language";
primary_example_queries "search in malayalam";
secondary_example_queries "malayalam meaning of go";
# Uncomment and complete: https://duck.co/duckduckhack/metadata#category
category "language";
# Uncomment and complete: https://duck.co/duckduckhack/metadata#topics
topics "everyday";

code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/MalayalamDictionary/EaswareApps.pm";
attribution web => ["http://www.easwareapps.com", "EaswareApps"];

# Triggers - https://duck.co/duckduckhack/spice_triggers
triggers end => "in malayalam";
triggers startend => "malayalam meaning";
triggers start => "malayalam meaning", "malayalam meaning of";

# API endpoint - https://duck.co/duckduckhack/spice_attributes#spice-codetocode
spice to => 'http://olam.in/Dictionary/?action=en_ml&q=$1&json';
spice proxy_cache_valid => '200 30d';
spice wrap_jsonp_callback => 1;

# Handle statement
handle remainder => sub {

    return $_ if $_;    # Guard against "no answer"

    return $_;
};

1;
