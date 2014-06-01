package DDG::Spice::Cyclocity;
# ABSTRACT: Returns information about bicycle self-services in cities managed by JCDecaux. See https://developer.jcdecaux.com/

use DDG::Spice;

primary_example_queries "bike Paris";
description "Shows the name of a bicycle self-service in cities managed by JCDecaux";
name "Cyclocity";
source "JCDecaux";
code_url "https://github.com/tigre-bleu/DuckDuckGo-Cyclocity";
topics "everyday", "travel";
category "location_aware";
attribution github  => ['https://github.com/tigre-bleu', 'tigre-bleu'],
            email  => ['devel@tigre-bleu.net'],
            twitter => ['https://twitter.com/tigre_bleu', 'tigre-bleu'];

triggers startend => 
    'bike',
    'bicycle',
    'shared bicycle',
    'shared bike',
    'self-service bicycle',
    'self-service bike',
    'bike service',
    'bicycle service';

spice to => 'https://api.jcdecaux.com/vls/v1/contracts?apiKey={{ENV{DDG_SPICE_JCDECAUX_APIKEY}}}';
spice wrap_jsonp_callback => 1;

handle remainder => sub {
	return lc $_ if $_;
	return;
};

1;
