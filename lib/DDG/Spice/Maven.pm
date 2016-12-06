package DDG::Spice::Maven;
# ABSTRACT: Search library in Maven Central Repository.

use strict;
use DDG::Spice;

triggers any => "maven", "mvn","repository","repo","java library","package","library java","lib java","java lib","module java","java module";
# triggers any=> "/([a-z].+)?.?(java|maven|mvn).+?([a-z].+)?.+?(repository|repo|library|package)/ig","/([a-z].+)?.+?(repository|repo|library|package).+?([a-z].+)?.+?(java|maven|mvn)/ig";
spice to => 'http://search.maven.org/solrsearch/select?q=$1&rows=5&wt=json&callback={{callback}}';
spice wrap_jsonp_callback => 1;
spice proxy_cache_valid   => "418 1d";

handle remainder => sub {
if($req->matched_trigger=~ m/java (library|lib|module)/ |$req->matched_trigger=~ m/(lib|library|module) java/ )
{
return $req->matched_trigger
}
else
{
return $_ if $_;
return;
}
};

1;
