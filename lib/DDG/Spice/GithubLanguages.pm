package DDG::Spice::GithubLanguages;
# ABSTRACT: Write an abstract here
# Start at https://duck.co/duckduckhack/spice_overview if you are new
# to instant answer development

use DDG::Spice;

spice is_cached => 1;

# Metadata.  See https://duck.co/duckduckhack/metadata for help in filling out this section.
name "GithubLanguages";
source "";
icon_url "https://github.com/favicon.ico";
description "Succinct explanation of what this instant answer does";
primary_example_queries "first example query", "second example query";
secondary_example_queries "optional -- demonstrate any additional triggers";
# Uncomment and complete: https://duck.co/duckduckhack/metadata#category
# category "";
# Uncomment and complete: https://duck.co/duckduckhack/metadata#topics
# topics "";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/GithubLanguages.pm";
attribution github => ["GitHubAccount", "Friendly Name"],
            twitter => "twitterhandle";

# Triggers
my @triggers = share("triggers.txt")->slurp;
triggers startend => @triggers;

my $langs = join("|", @triggers);

# Handle statement
handle query_lc => sub {

    my $query = $_;

    # optional - regex guard
    # return unless qr/^\w+/;
    my $lang = m/^\b$langs\b|\b$langs\b$/;
    $query =~ s/^\b$langs\b|\b$langs\b$//;
    #return unless $_;    # Guard against "no answer"

    return "$query language:$lang";
};

1;
