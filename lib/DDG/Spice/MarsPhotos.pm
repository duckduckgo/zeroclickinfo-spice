package DDG::Spice::MarsPhotos;

# ABSTRACT: Write an abstract here
# Start at https://duck.co/duckduckhack/spice_overview if you are new
# to instant answer development

use DDG::Spice;

# Caching - https://duck.co/duckduckhack/spice_advanced_backend#caching-api-responses
spice is_cached => 1;
spice proxy_cache_valid => "200 1d"; # defaults to this automatically

spice wrap_jsonp_callback => 1; # only enable for non-JSONP APIs (i.e. no &callback= parameter)

# API endpoint - https://duck.co/duckduckhack/spice_attributes#spice-codetocode
spice to => 'https://api.nasa.gov/mars-photos/api/v1/rovers/$1/photos?earth_date=$2&api_key=166ZFfXJ7BZRsxlodV4qS6OAwBq5uREbEzre2Pyr';
spice from => '([^/]+)/?(?:([^/]+)/?(?:([^/]+)|)|)';

# Triggers - https://duck.co/duckduckhack/spice_triggers
triggers any => 'mars images', 'mars photos';

# Handle statement
handle remainder => sub {
    my $remainder = $_;
    my ($rover) = $remainder =~ /(curiosity|spirit|opportunity)/i;
    $rover //= "curiosity";
    # date needs to be yyyy-mm-dd
    my $date = $remainder;
    $date =~ s/$rover//;
    return $rover,$date;
};

1;
