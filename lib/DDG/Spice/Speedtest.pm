package DDG::Spice::Speedtest;
# ABSTRACT: Write an abstract here
# Start at https://duck.co/duckduckhack/spice_overview if you are new
# to instant answer development

# Image generate with ImageMagick
# 1) Generate an random background : convert -size 1024x768 xc:green -random-threshold 1x99% background.ppm
# 2) Create the final image : convert background.ppm -fill white -draw "scale 4,4 gravity center text 0,0 '$I'" -quality 98 image.jpg


use DDG::Spice;

# Caching - https://duck.co/duckduckhack/spice_advanced_backend#caching-api-responses
spice is_cached => 0;

# Metadata.  See https://duck.co/duckduckhack/metadata for help in filling out this section.
name "Speedtest";
source "";
description "Speedtest";
primary_example_queries "speedtest";
attribution github => ["GitHubAccount", "Friendly Name"];

# Triggers - https://duck.co/duckduckhack/spice_triggers
triggers start => 'speedtest';

spice wrap_jsonp_callback => 1;
spice to => 'http://localhost/map.json?callback={{callback}}';

handle remainder => sub {
    return $_ if $_;
    return;
};

1;
