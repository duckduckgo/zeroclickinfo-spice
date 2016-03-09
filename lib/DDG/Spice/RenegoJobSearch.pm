package DDG::Spice::RenegoJobSearch;

# ABSTRACT: Renego Job Search

use DDG::Spice;

spice is_cached => 1;
spice proxy_cache_valid => "200 1d";
spice wrap_jsonp_callback => 1;

spice to => 'https://services.renego.net/jobs/ws.php?action=getjobs&sid=3&partnerid=43&what=$1&signkey={{ENV{DDG_SPICE_RENEGO_APIKEY}}}&blocksize=40&orderby=1&radius=25&offset=0&where=$2&fields=inserted|title|description_short|host|url_its|inserted|job_company_name|location_name&rt=json';
spice from => '(.*)/(.*)';

triggers any => 'jobs', 'job', 'jobsuche', 'stellenangebot', 'stellenangebote', 'stellenanzeige', 'stellenanzeigen', 'stellenmarkt', 'arbeit', 'karriere';

# Handle statement
handle remainder => sub {
    #restict to germany
    return unless $_ and $loc and $loc->country_code and $loc->country_code eq 'DE';

    #add city to search if defined
    return $_, $loc->city if defined $loc->city;

    return $_;
};

1;
