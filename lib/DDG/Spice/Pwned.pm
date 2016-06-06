package DDG::Spice::Pwned;

use strict;
use DDG::Spice;

triggers startend => ('pwned', 'have i been pwned');

spice to => 'https://haveibeenpwned.com/api/v2/breachedaccount/$1';
spice wrap_jsonp_callback => 1;
spice error_fallback => 'Email address not found';

handle remainder_lc => sub {
    return $_ if $_ =~ /\b([a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,})\b/;
    return;
};

1;
