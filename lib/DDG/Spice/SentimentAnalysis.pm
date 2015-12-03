package DDG::Spice::SentimentAnalysis;

# ABSTRACT: Returns result of sentiment analysis over a text or online content

use DDG::Spice;

primary_example_queries "sentiment analysis https://duck.co/ideas/idea/6767/sentiment-analysis-of-text-and-external-sources-in";
description "Returns sentiment analysis of text or online content";
name "Sentiment Analysis";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/SentimentAnalysis.pm";
topics "computing";
category "language";
attribution github  => ['https://github.com/gpestana', 'gpestana'],
            twitter => ['https://twitter.com/gpestana', 'gpestana'];


spice is_cached => 1;
spice proxy_cache_valid => "200 1d";

spice wrap_jsonp_callback => 1; # only enable for non-JSONP APIs (i.e. no &callback= parameter)
spice to => 'http://gateway-a.watsonplatform.net/calls/url/URLGetTextSentiment?apikey={{ENV{DDG_SPICE_SENTIMENTANALYSIS_APIKEY}}}&url=$1&outputMode=json';
#spice to => 'http://gateway-a.watsonplatform.net/calls/url/URLGetTextSentiment?apikey={{ENV{DDG_SPICE_SENTIMENTANALYSIS_APIKEY}}}&url=$1&outputMode=json&callback={{callback}}';

triggers any => 'sentiment analysis', 'sentiment of', 'sa';

handle remainder => sub {

    # Query is in $_...if you need to do something with it before returning
    return $_ if $_;
    return;
};

1;
