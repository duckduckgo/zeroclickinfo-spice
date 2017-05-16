package DDG::Spice::SentimentAnalysis::Document;
# ABSTRACT: Returns result of sentiment analysis over a text or online content

use DDG::Spice;
use Data::Validate::Domain qw(is_domain);

primary_example_queries "sentiment analysis https://duck.co/ideas/idea/6767/sentiment-analysis-of-text-and-external-sources-in";
description "Returns sentiment analysis of text or online content";
name "Sentiment Analysis";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/SentimentAnalysis/Document.pm";
topics "computing";
category "language";
attribution github  => ['https://github.com/gpestana', 'gpestana'],
            twitter => ['https://twitter.com/gpestana', 'gpestana'];

spice is_cached => 1;
spice proxy_cache_valid => "200 1d";
spice to => 'http://gateway-a.watsonplatform.net/calls/url/URLGetTextSentiment?apikey={{ENV{DDG_SPICE_SENTIMENTANALYSIS_APIKEY}}}&url=$1&outputMode=json&jsonp={{callback}}';
spice alt_to => {
    entities => {
	to => 'http://gateway-a.watsonplatform.net/calls/url/URLGetRankedNamedEntities?apikey={{ENV{DDG_SPICE_SENTIMENTANALYSIS_APIKEY}}}&url=$1&outputMode=json&jsonp={{callback}}'
     }
};

triggers start => 'sentiment analysis', 'sentiment of', 'sa';

#from https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Namecheap.pm
my $domain_part_regex = qr|
                          (?:http://)?       # HTTP protocol scheme part [optional]
                          (?<domain> [^/]* ) # domain part
                          (?:[^\s]*)         # any path part (e.g., /path/to/file)
                          |x;

handle remainder => sub {
    my ($remainder) = @_; 
    return unless $remainder;
    
    $remainder =~ $domain_part_regex;
    my $domain = $+{domain};
    return unless is_domain($domain);

    return $remainder;
};
1;
