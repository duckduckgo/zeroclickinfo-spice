package DDG::Spice::<: $ia_name :>;
# ABSTRACT: Write and abstract here
# Start at https://dukgo.com/duckduckhack/spice_overview if you are new
# to instant answer development

use DDG::Spice;

#Attribution
primary_example_queries "Provide an primary example query";
#Optional -- Provide secondary example queries that 
#            demonstrate additional triggers
secondary_example_queries "Provide an second example query";
description "Write an absolutely dazzling explanation of what this plugin does";
name "<: $ia_name :>";
icon_url "";
source "";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/<: $ia_name :>.pm";
category "";
topics "";
attribution github => ["https://github.com/", ""],
            twitter => ["https://twitter.com/", ""];

# Triggers
# Example Word Trigger
triggers any => 'example';


# Handle statement
handle remainder => sub {
};

1;
