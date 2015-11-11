package DDG::Spice::Coderwall;
# ABSTRACT: Shows coderwall user information

use DDG::Spice;

triggers startend => "coderwall";

spice to => 'https://coderwall.com/$1.json?full=true&callback={{callback}}';

handle remainder => sub {
    return $_ if $_;
    return;
};

1;
