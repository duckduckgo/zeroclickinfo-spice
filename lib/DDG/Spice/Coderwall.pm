package DDG::Spice::Coderwall;
# ABSTRACT: Shows coderwall user information

use DDG::Spice;

name "Coderwall";
source "Coderwall";
icon_url "/i/coderwall.com.ico";
description "Display information on coderwall user";
primary_example_queries "coderwall jagtalon";
secondary_example_queries "motersen coderwall";
category "ids";
topics "programming", "social";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Coderwall.pm";
attribution github => ["motersen", "Moritz Petersen"];

triggers startend => "coderwall";

spice to => 'https://coderwall.com/$1.json?full=true&callback={{callback}}';

handle remainder => sub {
    return $_ if $_;
    return;
};

1;
