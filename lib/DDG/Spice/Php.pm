package DDG::Spice::Php;
# ABSTRACT: Write an abstract here
# Start at https://duck.co/duckduckhack/spice_overview if you are new
# to instant answer development

use DDG::Spice;

# Caching - https://duck.co/duckduckhack/spice_advanced_backend#caching-api-responses
spice is_cached => 1;

# Metadata.  See https://duck.co/duckduckhack/metadata for help in filling out this section.
name "Php";
source "Php.net documentation";
description "PHP search";
topics "sysadmin", "programming";
category "programming";
primary_example_queries "php session_start", "php cwd";
secondary_example_queries "php curl";
# Uncomment and complete: https://duck.co/duckduckhack/metadata#category
# category "";
# Uncomment and complete: https://duck.co/duckduckhack/metadata#topics
# topics "";
icon_url "http://php.net/favicon.ico";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Php.pm";
attribution github => ["xtuc", "Sven SAULEAU"],
            web => ['http://www.xtuc.fr'];

# API endpoint - https://duck.co/duckduckhack/spice_attributes#spice-codetocode
spice wrap_jsonp_callback => 1;
spice to => 'http://ddg-api.xtuc.net/v1.0/search/$1?callback={{callback}}';

# Triggers - https://duck.co/duckduckhack/spice_triggers
triggers startend => "php", "php.net";

# Handle statement
handle remainder_lc => sub {
    return $_ if $_;
    return;
};

1;
