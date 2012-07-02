package DDG::Spice::Automeme;

# ABSTRACT: DuckDuckGo + Automeme.net = profound nonsense

use DDG::Spice;

spice to => 'http://api.automeme.net/html.json?lines=1&callback={{callback}}';
spice wrap_jsonp_callback => 1;
spice proxy_cache_valid   => "418 1d";

triggers any => 'automeme';

handle remainder => sub {
	return '';
};

1;
