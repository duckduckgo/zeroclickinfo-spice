package DDG::Spice::Drupal;
# ABSTRACT: Get project information from drupal.org

use DDG::Spice;

# Caching - https://duck.co/duckduckhack/spice_advanced_backend#caching
spice is_cached => 1; 

# Metadata.  See https://duck.co/duckduckhack/metadata for help in filling out this section.
name "Drupal";
source "https://drupal.org/";
icon_url "/i/drupal.org.ico";
description "Get project information from drupal.org";
primary_example_queries "drupal panelizer", "zen drupal";
secondary_example_queries "";
# Uncomment and complete: https://duck.co/duckduckhack/metadata#category
category "software";
# Uncomment and complete: https://duck.co/duckduckhack/metadata#topics
topics "programming","sysadmin","web_design";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Drupal.pm";
attribution github => ["lablayers", "Victor Lourng"],
            twitter => "lablayers";

# API endpoint - https://duck.co/duckduckhack/spice_attributes#spice-codetocode
spice to => 'https://www.drupal.org/api-d7/node.json?field_project_machine_name=$1';
spice wrap_jsonp_callback => 1;

# Triggers - https://duck.co/duckduckhack/spice_triggers
triggers startend => "drupal";

# Handle statement
handle remainder => sub {

    # optional - regex guard
    # return unless qr/^\w+/;

    return unless $_;    # Guard against "no answer"

    return $_;
};

1;
