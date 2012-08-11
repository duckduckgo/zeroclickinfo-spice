package DDG::Spice::Vimeo::Search;
# ABSTRACT: Searches for videos on vimeo

use DDG::Spice;

spice to => 'http://vimeo.com/api/rest/v2?format=json&method=vimeo.videos.search&per_page=7&summary_response=1&oauth_consumer_key=e1f6213a20a462b20d5c7fa4f1217eb22490091e&query=$1&callback={{callback}}';

triggers startend => 'vimeo';

handle matches => sub {
    return $_ if defined $_; 
    return;
};

1;
