package DDG::Spice::Domains;

# ABSTRACT:
# Returns an internet domain's availability and whois information.

use DDG::Spice;

# regex for allowed TLDS (grabbed from main DDG code, in /lib/DDG/Util/Constants.pm)
my $tlds_qr = qr/(?:c(?:o(?:m|op)?|at?|[iykgdmnxruhcfzvl])|o(?:rg|m)|n(?:et?|a(?:me)?|[ucgozrfpil])|e(?:d?u|[gechstr])|i(?:n(?:t|fo)?|[stqldroem])|m(?:o(?:bi)?|u(?:seum)?|i?l|[mcyvtsqhaerngxzfpwkd])|g(?:ov|[glqeriabtshdfmuywnp])|b(?:iz?|[drovfhtaywmzjsgbenl])|t(?:r(?:avel)?|[ncmfzdvkopthjwg]|e?l)|k[iemygznhwrp]|s[jtvberindlucygkhaozm]|u[gymszka]|h[nmutkr]|r[owesu]|d[kmzoej]|a(?:e(?:ro)?|r(?:pa)?|[qofiumsgzlwcnxdt])|p(?:ro?|[sgnthfymakwle])|v[aegiucn]|l[sayuvikcbrt]|j(?:o(?:bs)?|[mep])|w[fs]|z[amw]|f[rijkom]|y[eut]|qa)/i;

# regex for parsing URLs
my $url_qr = qr/(?:http:\/\/)?(?:www\.)?([^\s]*?)\.($tlds_qr)(\:?[0-9]{1,4})?([^\s]*)/;

# additional keywords that trigger this spice
my $whois_keywords_qr = qr/whois|lookup|(?:is\s|)domain|(?:is\s|)available|register|owner(?:\sof|)|who\sowns|(?:how\sto\s|)buy/i;

# trigger this spice when:
# - query contains only a URL
# - query starts or end with any of the whois keywords
triggers query_raw =>
    qr/^$url_qr$/,
    qr/^$whois_keywords_qr|$whois_keywords_qr$/;

spice to => 'https://www.whoisxmlapi.com/whoisserver/WhoisService?domainName=$1&outputFormat=JSON&callback={{callback}}&username={{ENV{DDG_SPICE_DOMAINS_USERNAME}}}&password={{ENV{DDG_SPICE_DOMAINS_PASSWORD}}}';

handle  sub {
    my ($query) = @_;
    return if !$query; # do not trigger this spice if the query is blank

    # parse the URL into its parts
    my ($domain, $tld, $port, $resource_path) = $query =~ $url_qr; 

    warn $query, "\t", $domain || '', "\t", $tld || '', "\t", $port || '', "\t", $resource_path || '';

    # get the non-URL text from the query by combining the text before and after the match
    my $non_url_text = $` . $'; #' <-- close tick for syntax highlighting

    # is the string a naked domain, i.e. is there any text besides the domain
    my $is_naked_domain = trim($non_url_text) ne '';

    # skip if no domain or tld
    return if !defined $domain || $domain eq '' || !defined $tld || $tld eq '';

    # skip if naked domain that contains a subdomain, port or resource_path
    # (notice that we allow subdomains, ports, and resource paths when
    #  there is a whois keyword)
    return if $is_naked_domain
	&& ($domain =~ /\./
	    || (defined $port && $port ne '')
	    || (defined $resource_path && $resource_path ne ''));

    # return the domain + the tld, with a period in between
    return lc "$domain.$tld";
};

# Returns a string with leading and trailing spaces removed.
sub trim {
    my ($str) = @_;
    $str =~ s/^\s*(.*)?\s*$/$1/;
    return $str;
}

1;
