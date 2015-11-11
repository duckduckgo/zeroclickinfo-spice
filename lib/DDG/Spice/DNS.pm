package DDG::Spice::DNS;
# ABSTRACT: Gets IP address of given domain name.

use strict;
use DDG::Spice;
use Data::Validate::Domain qw(is_domain);

spice to => 'http://pro.viewdns.info/dnsrecord/?domain=$2&recordtype=$1&apikey={{ENV{DDG_SPICE_VIEWDNS_APIKEY}}}&output=json';

spice wrap_jsonp_callback => 1;

triggers any => 'dns', 'record', 'records', 'dig', 'nslookup';

spice from => '(.*)/(.*)';

my $record_types = join '|', qw/
    any
    a
    aaaa
    afsdb
    apl
    caa
    cert
    cname
    dhcid
    dlv
    dname
    dnskey
    ds
    hip
    ipseckey
    key
    kx
    loc
    mx
    ns
    nsec
    nsec3
    nsec3param
    rrsig
    rp
    sig
    soa
    spf
    srv
    sshfp
    ta
    tkey
    tlsa
    tsig
    tx
/;

handle query_lc => sub {
    s/(dig\s+)?(?:($record_types)\s+)?(dns\s+)?(records?|dns)?\s*//;
    my $record = defined $2 ? $2 : 'any';
    return if not defined $2 and not defined $1
        and not (defined $3 and defined $4);
    return uc $record, $_ if is_domain $_;
    return;
};

1;
