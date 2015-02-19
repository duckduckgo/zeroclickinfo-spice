package DDG::Spice::Github;
# ABSTRACT: Search for information about GitHub repositories

use DDG::Spice;

primary_example_queries "github zeroclickinfo";
description "Github info";
name "Github";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Github.pm";
topics "programming", "web_design";
category "programming";
attribution web => ['http://dylansserver.com','Dylan Lloyd'],
            email => ['dylan@dylansserver.com','Dylan Lloyd'];

triggers startend => "github";

my @triggers = share("triggers.txt")->slurp;
triggers startend => @triggers;

chomp(@triggers);
my $langs = join("|", map(quotemeta, @triggers));

spice to => 'https://api.github.com/search/repositories?q=$1&sort=stars&callback={{callback}}';

spice proxy_cache_valid => '200 30d';

handle query_lc => sub {
    s/^github\s+|\s+github$//;
    if ($_ eq "" || m/\bjobs\b|\bstatus\b/) {
        return;
    }
    
    my $query = $_;
    my $l; 
    if (/ ($langs) /|| /^($langs) / || / ($langs)$/) {
        $l = $1;
        $query =~ s/ ($langs) |^($langs) | ($langs)$//;

        # make sure there is an actual query, and not just a language term search
        for ($query) {
            $query =~ s/^\s*//; 
            $query =~ s/\s*$//;
            if ($query eq "") {
                return;
            }
        }

        # These is no separate language parameter for the query to 
        # Github. You specify language as a part of the raw query string
        # passed to the api like on the web form interface. 
        return "${query} language:\"${l}\"" unless /^jobs\b|\bjobs$|^status\b|\bstatus$/;
    } 
    
    return;
};
1;
