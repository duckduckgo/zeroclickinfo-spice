package DDG::Spice::IsItUp;

use DDG::Spice;

primary_example_queries "is duckduckgo.com up?";
secondary_example_queries "is wolframalpha.com working?";
description "Shows a website's status";
name "IsItUp";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/IsItUp.pm";
icon_url "/i/isitup.org.ico";
topics "geek", "sysadmin";
category "computing_tools";
attribution github => ['https://github.com/mrshu','mrshu'];

triggers query_lc => qr/^((?:is\s|))(?:http:\/\/)?([0-9a-z\-]+(?:\.[0-9a-z\-]+)*?)(?:(\.[a-z]{2,4})|)\s(?:up|down|working)/i;

spice to => 'http://isitup.org/$1.json?callback={{callback}}';

my $regex_domain = qr/\.(c(?:o(?:m|op)?|at?|[iykgdmnxruhcfzvl])|o(?:rg|m)|n(?:et?|a(?:me)?|[ucgozrfpil])|e(?:d?u|[gechstr])|i(?:n(?:t|fo)?|[stqldroem])|m(?:o(?:bi)?|u(?:seum)?|i?l|[mcyvtsqhaerngxzfpwkd])|g(?:ov|[glqeriabtshdfmuywnp])|b(?:iz?|[drovfhtaywmzjsgbenl])|t(?:r(?:avel)?|[ncmfzdvkopthjwg]|e?l)|k[iemygznhwrp]|s[jtvberindlucygkhaozm]|u[gymszka]|h[nmutkr]|r[owesu]|d[kmzoej]|a(?:e(?:ro)?|r(?:pa)?|[qofiumsgzlwcnxdt])|p(?:ro?|[sgnthfymakwle])|v[aegiucn]|l[sayuvikcbrt]|j(?:o(?:bs)?|[mep])|w[fs]|z[amw]|f[rijkom]|y[eut]|qa)$/;
my $regex_ipv4 = qr/^(?:\d{1,3}\.){3}\d{1,3}$/;

handle matches => sub {
    if ($_[2]) {
        my $root_url = $_[1];
        my $domain = $_[2];
        # return the domain and the root url if the domain is valid
        if ($domain =~ $regex_domain){
            return $root_url.$domain;
        }
    }
    else {
        return $_[1] if $_[1] =~ $regex_ipv4;
        # append .com only if "is" is in the query and there's no other domain given
        if ($_[0]) {
            return $_[1] . '.com';
        }
        # otherwise just return without '.com' -- stops false positives from showing zci
        else {
            # check for domain name in the end
            if ($_[1] =~ $regex_domain) {
                return $2;
            }
        }
    }
    return;
};

1;

