package DDG::Spice::Passwd;
# ABSTRACT: Generates a good password

use DDG::Spice;

name "Password generator";
source "Passwd.me";
icon_url "https://passwd.me/assets/icons/favicon.ico";
description "Generate a secure password";
primary_example_queries 'generate password', 'genpass';
secondary_example_queries 'generate passwd';
category "computing_tools";
topics "cryptography", "sysadmin";
code_url "https://github.com/kappa/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Passwd.pm";
attribution github => "kappa", cpan => "kappa", email => 'alex@kapranoff.ru';

# do not cache api responses
spice proxy_cache_valid => "418 1d";

triggers start => 'generate passwd', 'genpass', 'generate password';

spice to => 'https://passwd.me/api/1.0/get_password.json?callback={{callback}}';

handle remainder => sub {
    return 1;
};

1;
