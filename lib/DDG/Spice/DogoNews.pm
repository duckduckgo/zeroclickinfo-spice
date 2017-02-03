package DDG::Spice::DogoNews;

use DDG::Spice;

triggers any => "dogonews", "dogo news", "dogo", "kids", "kid", "child", "children", "childrens", "children's", "student", "students";

spice to => 'https://api.dogomedia.com/api/v2/news/search.json?query=$1&api_key={{ENV{DDG_SPICE_DOGO_APIKEY}}}';
spice wrap_jsonp_callback => 1;

handle query_lc => sub {
    return $_ if $_ =~ /(news|newspaper|current event)/i;
    return;
};

1;
