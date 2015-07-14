package DDG::Spice::Articles;

use DDG::Spice;
use Text::Trim;
use YAML::XS 'LoadFile';

# meta data
primary_example_queries "engadget";
secondary_example_queries "nyt";
description "Shows latest articles for popular news sites with Atom/RSS feeds";
name "Articles";
code_url "https://github.com/brianrisk/zeroclickinfo-spice/lib/DDG/Articles.pm";
topics "economy_and_finance";
category "facts";
attribution github => ['https://github.com/brianrisk','Brian Risk'],
            email => ['brian@geneffects.com','Brian Risk'],
            web => ["https://www.geneffects.com", "Geneffects"],
            twitter => "brianrisk";
            
# Note: adding sites to this spice is easy.
# The fiel 'share/spice/articles/sites.yml' contains the list
# of trigger words (the names of the sites) and the location 
# of their Atom/RSS feed.
my $site_hash = LoadFile(share('sites.yml')); 

# triggers sorted by length so more specific is used first
my @site_keys = sort { length $b <=> length $a } keys($site_hash);
my $site_qr = join "|", @site_keys;

# defining our triggers
triggers any => @site_keys;

# set spice parameters
spice to => 'https://ajax.googleapis.com/ajax/services/feed/load?v=2.0&q=$1&num=10';
spice wrap_jsonp_callback => 1;
spice proxy_cache_valid => "418 1d";

handle sub {

    my $query = lc $_;
    
    # find which blog name was used
    return unless $query =~ m/\b($site_qr)\b/;
    my $site = $1;
    
    # returning the URL of the Atom/RSS
    return $site_hash->{$site};
    
};

1;





