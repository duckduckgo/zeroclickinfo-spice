package DDG::Spice::GithubLanguages;
# ABSTRACT: Write an abstract here
# Start at https://duck.co/duckduckhack/spice_overview if you are new
# to instant answer development

use DDG::Spice;

spice is_cached => 1;

# Metadata.  See https://duck.co/duckduckhack/metadata for help in filling out this section.
name "GithubLanguages";
source "GitHub";
icon_url "https://github.com/favicon.ico";
description "Github search by language";
primary_example_queries "javascript redis", "mongodb javascript";
# Uncomment and complete: https://duck.co/duckduckhack/metadata#category
category "programming";
# Uncomment and complete: https://duck.co/duckduckhack/metadata#topics
topics "programming";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/GithubLanguages.pm";
attribution github => ["https://github.com/joerussbowman", "Joe Bowman"],
            twitter => "joerussbowman";

# Triggers
my @triggers = share("triggers.txt")->slurp;
triggers startend => @triggers;

chomp(@triggers);
my $langs = join("|", @triggers);

spice to => 'https://api.github.com/search/repositories?q=$1&sort=stars&callback={{callback}}';

# Handle statement
handle query_lc => sub {

    my $query = $_;
    my $l = ""; 
    if ($query =~ /^($langs)\b/ || $query =~ /\b($langs)$/) {
        $l = $1;
    } 
    
    $query =~ s/^($langs)\b|(\b$langs)$//;

    return "$query language:$l";
};

1;
