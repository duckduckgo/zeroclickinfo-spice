package DDG::Spice::Proxy;
# Returns infos about free Proxys, like speed, country and if it is safe

use DDG::Spice;

spice is_cached => 1; 

name "Proxy";

description "Returns a list of proxy";
primary_example_queries "proxy", "proxy list";
category "computing_tools";
topics "computing", "geek", "sysadmin";

code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Proxy.pm";
attribution github => ["https://github.com/puskin94", "Puskin"],
            twitter => '@puskolon';

spice to => 'http://www.yasakvar.com/apiv1/?type=json';
spice wrap_jsonp_callback => 1;

triggers any => "proxy", "proxy list";

handle query_lc => sub {
    return unless $_ =~ /^proxy\s*(list)?$/i;
};

1;
