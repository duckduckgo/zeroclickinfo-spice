package DDG::Spice::MissingKids;

use DDG::Spice;
use Locale::SubCountry;

triggers start => "missing kid", "missing kids", "missing child", "missing children";

# Need to escape string passed to &u= param, except $1
my $query_url = uri_esc("http://www.missingkids.com/missingkids/servlet/XmlServlet?act=rss&LanguageCountry=en_US&orgPrefix=NCMC&state=");

spice to => 'https://duckduckgo.com/x.js?u=' . $query_url . '$1';
spice wrap_jsonp_callback => 1;
spice proxy_cache_valid => "418 1d";

#Create US SubCountry object
my $US = new Locale::SubCountry("US");
my %code_hash = $US->code_full_name_hash;

sub getState {
    my $place = uc shift;
    # Washington D.C is not supported by the SubCountry
    return "WA" if $place =~ m/washington\s(?:dc|d\.c)/i;
    # verify 2-letter remainder is valid state initial, e.g. "PA"
    return $place if m/[a-z]{2}/i && exists $code_hash{$place};
    # verify remainder is valid state name, e.g. "pennsylvania"
    my $code = $US->code($place);
    return $code if $code ne "unknown";
    # invalid state
    return;
}

handle remainder => sub {

    if ($_){
        return unless m/^(?:in )?(.+?)( state)?$/;
        my $state = getState($1);
        return $state if $state;
        return; #invalid input
    }

    # get user's state when none specified
    return unless defined $loc->country_code
        && $loc->country_code eq 'US'
        && defined $loc->region;
    return $loc->region;
};

1;
