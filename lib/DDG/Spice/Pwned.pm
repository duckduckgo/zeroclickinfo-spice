package DDG::Spice::Pwned;

use strict;
use DDG::Spice;

primary_example_queries 'pwned test@gmail.com';
description 'Search for pwned email addresses';
name 'Pwned';

triggers startend => ('pwned', 'have i been pwned');

spice to => 'https://haveibeenpwned.com/api/v2/breachedaccount/$1';
spice wrap_jsonp_callback => 1;
spice error_fallback => 'Email address not found';

handle remainder_lc => sub {
    return $_ if $_ =~ /.+\@.+/;
    return;
};

1;
