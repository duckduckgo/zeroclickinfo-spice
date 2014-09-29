package DDG::Spice::Whois;
# ABSTRACT: Returns an internet domain's availability and whois information.

use DDG::Spice;

# Metadata for this spice
name 'Whois';
source 'Whois API';
description 'Whois info and registration links for web domains';
primary_example_queries 'whois duckduckgo.com', 'whois http://duckduckgo.com';
secondary_example_queries 'domain duckduckgo.com', 'who owns duckduckgo.com', 'duckduckgo.com available';
category 'programming';
topics 'computing', 'geek', 'programming', 'sysadmin';
code_url 'https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Whois.pm';

attribution twitter => 'bjennelle',
            github => ["b1ake", 'Blake Jennelle'];


# turns on/off debugging output
my $is_debug = 0;

# regex for allowed TLDS (grabbed from DDG core repo, in /lib/DDG/Util/Constants.pm)
my $tlds_qr = qr/(?:c(?:o(?:m|op)?|at?|[iykgdmnxruhcfzvl])|o(?:rg|m)|n(?:et?|a(?:me)?|[ucgozrfpil])|e(?:d?u|[gechstr])|i(?:n(?:t|fo)?|[stqldroem])|m(?:o(?:bi)?|u(?:seum)?|i?l|[mcyvtsqhaerngxzfpwkd])|g(?:ov|[glqeriabtshdfmuywnp])|b(?:iz?|[drovfhtaywmzjsgbenl])|t(?:r(?:avel)?|[ncmfzdvkopthjwg]|e?l)|k[iemygznhwrp]|s[jtvberindlucygkhaozm]|u[gymszka]|h[nmutkr]|r[owesu]|d[kmzoej]|a(?:e(?:ro)?|r(?:pa)?|[qofiumsgzlwcnxdt])|p(?:ro?|[sgnthfymakwle])|v[aegiucn]|l[sayuvikcbrt]|j(?:o(?:bs)?|[mep])|w[fs]|z[amw]|f[rijkom]|y[eut]|qa)/i;

# regex for parsing URLs
my $url_qr = qr/(?:http:\/\/)?    # require http
                ([^\s\.]*\.)*     # capture any subdomains
                ([^\s\.]*?)       # capture the domain
                \.($tlds_qr)      # capture the tld, such as .com
                (\:?[0-9]{1,4})?  # look for a port, such as :3000
                ([^\s]*)/x;       # look for an extended path, such as /pages/about.htm

# additional keywords that trigger this spice
my $whois_keywords_qr = qr/whois|who\sis|lookup|(?:is\s|)domain|(?:is\s|)available|register|owner(?:\sof|)|who\sowns|(?:how\sto\s|)buy/i;

# trigger this spice when the query starts or ends
# with any of the whois keywords.
#
# note that there are additional guards in the handle() function that
# narrow this spice's query space.
#
triggers query_raw =>
    # 2014.09.29 - Removed naked domain triggers to reduce API calls,
    #              because these are mostly navigational queries.
    #
    # allow the naked url with leading and trailing spaces
    #qr/^\s*$url_qr\s*$/,

    # allow the whois keywords at the beginning or end of the string
    # with leading or trailing spaces.
    #
    # if at the end of the string, allow a trailing question mark.
    qr/^\s*$whois_keywords_qr
          |$whois_keywords_qr[?]?\s*$/x;

# API call details for Whois API (http://www.whoisxmlapi.com/)
spice to => 'http://www.whoisxmlapi.com/whoisserver/WhoisService?domainName=$1&outputFormat=JSON&callback={{callback}}&username={{ENV{DDG_SPICE_WHOIS_USERNAME}}}&password={{ENV{DDG_SPICE_WHOIS_PASSWORD}}}';

handle sub {
    my ($query) = @_;
    return if !$query; # do not trigger this spice if the query is blank

    # trim any leading and trailing spaces
    $query = trim($query);

    # remove any trailing question marks, which are allowed
    # but can disrupt the regexs
    $query =~ s/\?$//;

    # parse the URL into its parts
    my ($subdomains, $domain, $tld, $port, $resource_path) = $query =~ $url_qr; 

    # debugging output
    warn 'query: ', $query, "\t", 'sub: ', $subdomains || '', "\t", 'domain: ', $domain || '', "\t", 'tld: ', $tld || '', "\t", 'port: ', $port || '', "\t", 'resource path: ', $resource_path || '' if $is_debug;

    # get the non-URL text from the query by combining the text before and after the match
    my $non_url_text = $` . $'; #' <-- closing tick added for syntax highlighting

    # REMOVED 2014.09.29 (see naked domain note above)
    #
    # is the string a naked domain, i.e. is there any text besides the domain?
    #my $is_naked_domain = trim($non_url_text) eq '';

    # skip if we're missing a domain or a tld
    return if !defined $domain || $domain eq '' || !defined $tld || $tld eq '';

    # REMOVED 2014.09.29 (see naked domain note above)
    #
    # skip if we have naked domain that contains a non-www subdomain, a port or a resource_path.
    # e.g. continue: 'http://duckduckgo.com' is allowed
    #      skip: 'http://blog.duckduckgo.com'
    #      skip: 'http://duckduckgo.com:8080'
    #      skip:  'http://blog.duckduckgo.com/hello.html'
    #
    # note that if the user includes a whois keyword to any of these,
    # such as 'whois http://blog.duckduckgo.com', they we continue.
    #
    # this signals to us that the user wants a whois result, and isn't just
    # trying to nav to the URL they typed.
    #
    #return if $is_naked_domain
    #    && ( (defined $subdomains && $subdomains !~ /^www.$/)
    #         || (defined $port && $port ne '')
    #         || (defined $resource_path && $resource_path ne ''));

    # return the combined domain + tld (after adding a period in between)
    return lc "$domain.$tld";
};

# Returns a string with leading and trailing spaces removed.
sub trim {
    my ($str) = @_;
    $str =~ s/^\s*(.*)?\s*$/$1/;
    return $str;
}

1;
