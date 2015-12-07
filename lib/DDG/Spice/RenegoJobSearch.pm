package DDG::Spice::RenegoJobSearch;

# ABSTRACT: Renego Job Search

use DDG::Spice;

spice is_cached => 1;
spice proxy_cache_valid => "200 1d";
spice wrap_jsonp_callback => 1;

spice to => 'https://services.renego.net/jobs/ws.php?action=getjobs&sid=3&partnerid=38&what=$1&signkey={{ENV{DDG_SPICE_RENEGO_APIKEY}}}&blocksize=10&orderby=1&radius=25&offset=0&where=$2&fields=inserted|title|description_short|host|url_its|inserted|job_company_name|location_name&rt=json';
spice from => '(.*)/(.*)';

triggers any => 'jobs', 'job';

primary_example_queries "manager job berlin";
secondary_example_queries "manager jobs";
description "Renego Job Search";
name "RenegoJobSearch";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/RenegoJobSearch.pm";
topics "special_interest";
attribution github => ['https://github.com/mightycid','Sebastian Szeracki']

# Handle statement
handle remainder => sub {

    return $_, $loc->city if $_;
    return;

};

1;
