package DDG::Spice::LeakDB;

use DDG::Spice;

name 'LeakDB';
description 'Get plaintext or hash of input';
source 'leakdb.abusix.com';
primary_example_queries 'leakdb admin';
secondary_example_queries 'hashme 21232f297a57a5a743894a0e4a801fc3';
category 'special';
topics 'geek', 'sysadmin', 'cryptography';
icon_url 'https://leakdb.abusix.com/favicon.ico';
code_url 'https://github.com/brutalhonesty/zeroclickinfo-spice/blob/master/lib/DDG/Spice/HashMe.pm';
attribution github => ['https://github.com/brutalhonesty', 'Adam Schodde'],
	twitter => ['https://twitter.com/listeninme', 'listeninme'],
	email => ['sparky1010[at]gmail.com', 'Adam Schodde'];
status 'enabled';

triggers startend => 'hashme', 'leakdb';
spice to => 'http://api.leakdb.abusix.com/?j=$1';
spice wrap_jsonp_callback => 1;
spice is_cached => 0;

handle query_lc => sub{
    s/^(hashme|leakdb)\s+|\s+(hashme|leakdb)$//g;
	return $_ if $_ ne '';
	return;
};

1;

