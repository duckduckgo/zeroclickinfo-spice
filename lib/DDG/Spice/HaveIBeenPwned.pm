package DDG::Spice::HaveIBeenPwned;
# ABSTRACT: Returns whether or not your account is in the "Have I been pwned" database. 

use DDG::Spice;
use strict;


spice is_cached => 1;


name "HaveIBeenPwned";
source "http://haveibeenpwned.com";

description "Returns whether or not your account was in a hacker data dump. ";
primary_example_queries "have i been pwned, pwned, hibp";
category "special";
topics "geek";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/HaveIBeenPwned.pm";
attribution github => ["javathunderman", "Thomas Denizou"],
            twitter => "javathunderman";

spice to => 'https://haveibeenpwned.com/api/v2/breachedaccount/{account}';


triggers any => "have i been pwned", "pwned", "hibp";


handle remainder => sub {
    my ($username) = @_;
    return $username if $username;
    return;
};

1;