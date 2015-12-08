package DDG::Spice::SentimentAnalysis::Entities;
# ABSTRACT: Returns result of sentiment analysis over a text or online content

use DDG::Spice;

attribution github  => ['https://github.com/gpestana', 'gpestana'],
            twitter => ['https://twitter.com/gpestana', 'gpestana'];

spice is_cached => 1;
spice proxy_cache_valid => "200 1d";
spice wrap_jsonp_callback => 1;

spice to => 'http://gateway-a.watsonplatform.net/calls/url/URLGetRankedNamedEntities?apikey={{ENV{DDG_SPICE_SENTIMENTANALYSIS_APIKEY}}}&url=$1&outputMode=json';

triggers start => '///***never_triggers***///';

handle remainder => sub {
    #Extracts URL from remainder, if it exists
    if ($_ =~ m!([--:\w?@%&+~#=]*\.[a-z]{2,4}\/{0,2})((?:[?&](?:\w+)=(?:\w+))+|[--:\w?@%&+~#=]+)?!) {
	return $&;
    }
    return;
};

1;
