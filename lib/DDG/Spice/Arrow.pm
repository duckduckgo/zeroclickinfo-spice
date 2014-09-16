package DDG::Spice::Arrow;
# ABSTRACT: Returns package information from npm package manager's registry.

use DDG::Spice;

primary_example_queries "part bav99";
secondary_example_queries "arrow lm324n";
description "Shows pricing/availability for part searches";
name "Arrow";
topics "special_interest", "geek";
category "special";
icon_url "/i/parts.arrow.com.ico";
attribution github  => ['https://github.com/macgngsta', 'macgngsta'];

triggers startend => 'part', 'arrow';

# QA url = api-qa.arrowelect.com
# Production url = api.arrow.com

spice to => 'http://api-qa.arrowelect.com/itemservice/v1/en/search/token?login=duckduckgo&apikey={{ENV{DDG_SPICE_ARROW_APIKEY}}}&search_token=$1&callbackfn={{callback}}';
spice wrap_jsonp_callback => 1;

handle remainder => sub {
    return $_ if $_;
    return;
};

1;