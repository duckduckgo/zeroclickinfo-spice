package DDG::Spice::HashMe;

use DDG::Spice;

name "HashMe";
description "Get plaintext or hash of input";
source "goog.li";
primary_example_queries "hashme admin";
secondary_example_queries "hashme 21232f297a57a5a743894a0e4a801fc3";
category "special";
topics "geek", "sysadmin", "cryptography";
icon_url "https://goog.li/favicon.ico";
code_url "https://github.com/brutalhonesty/zeroclickinfo-spice/blob/master/lib/DDG/Spice/HashMe.pm";
attribution github => ["https://github.com/brutalhonesty", "Adam Schodde"],
	twitter => ["https://twitter.com/listeninme", "listeninme"],
	email => ["sparky1010[at]gmail.com", "Adam Schodde"];
status "enabled";

triggers start => 'hashme';
spice to => 'https://goog.li/?j=$1';
spice wrap_jsonp_callback => 1;
spice is_cached => 0;

handle remainder => sub{
	return $_;
	return;
};

1;

