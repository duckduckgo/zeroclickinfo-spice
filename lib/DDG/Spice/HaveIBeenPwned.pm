package DDG::Spice::HaveIBeenPwned;
# ABSTRACT: Returns whether or not your account is in the "Have I been pwned" database. 

use DDG::Spice;
use strict;


spice is_cached => 1;


triggers any => "have i been pwned", "pwned", "hibp";

spice to => 'https://haveibeenpwned.com/api/v2/breachedaccount/{account}';

handle remainder => sub {
    my ($username) = @_;
    return $username if $username;
    return;
};

1;