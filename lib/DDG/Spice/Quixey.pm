package DDG::Spice::Quixey;
# ABSTRACT: Search for apps for mobile devices

use strict;
use DDG::Spice;
use JSON::MaybeXS;
use Text::Trim;
use List::Uniq ':all';

spice wrap_jsonp_callback => 1;

# Variable Definitions
my %custom_ids = (2005 => 75675980, 2004 => 78989893);

my %platform_ids = (
        "android" => 2005,
        "droid" => 2005,
        "google play store" => 2005,
        "google play" => 2005,
        "windows phone 8" => 8556073,
        "windows phone" => 8556073,
        "windows mobile" => 8556073,
        "playbook" => 2008,
        "blackberry" => 2008,
        "apple app store" => 2004,
        "apple app" => 2004,
        "ios" => 2004,
        "ipod touch" => 2004,
        "ipod" => 2004,
        "iphone" => 2004,
        "ipad" => 2015,
);

my @triggers = keys %platform_ids;
my @extraTriggers = qw(quixey app apps);
my $skip_re = qr/(?:release date|google glass|glassware|osx)/i; # Things which indicate different intent.

push(@triggers, @extraTriggers);

triggers any => @triggers;

spice from => '([^/]+)/([^/]+)/?([^/]+)?/?([^/]+)?';

spice to => 'https://api.quixey.com/1.0/search?partner_id=2073823582&partner_secret={{ENV{DDG_SPICE_QUIXEY_APIKEY}}}&q=$1&platform_ids=$2&max_cents=$3&custom_id=$4&limit=50&skip=0&format=json';

spice proxy_ssl_session_reuse => "off";

handle query_parts => sub {

        my $full_query = join(" ", @_);
        my $restriction;
        my $max_price = 999999;

        return if ($full_query =~ $skip_re);

        # set price to $0 if "free" is in the query
        $max_price = 0 if ($full_query =~ s/\bfree\b//ig);

        # check if device mentioned, if so verify app search intent
        if ($full_query =~ qr/\b(iphone|ipad|ipod|ios|blackberry|playbook|android)\b/) {
                my $device = $1;
                return unless ($full_query =~ qr/\b(?:on|for)\s+$device/i or $full_query =~ qr/\b(apps?|quixey)\b/i );
                $full_query =~ s/\b(on|for)\s+$device/ $device/gi;
        }

        # check for platform specific trigger in query
        # if found remove from query
        # Note: sort trigger list to catch longer phrase first (eg "ipod touch" vs "ipod")
        my @matches = grep { $full_query =~ /\b$_\b/ig } sort { length($a) <=> length($b) } keys %platform_ids;
        if (length scalar @matches){
                my @sorted_matches = sort { length($b) <=> length($a) } @matches;
                foreach my $match (@sorted_matches){
                        $full_query =~ s/\b$match\b//ig;
                        $restriction = $platform_ids{ $match };
                }
        }

        # check for and strip extra triggers and whitespace
        # if nothing remains query was just trigger words
        # so return nothing
        $full_query =~ s/\b$_\b//ig foreach (@extraTriggers);
        $full_query =~ s/\s+/ /ig;
        $full_query = trim $full_query;
        return unless (length $full_query);

        my @platforms;
        my $platforms_encoded;

        # if platform restiction(s) detected
        # return query, specify proper ids for API
        if (defined $restriction) {
                push @platforms, $restriction;
                $platforms_encoded = encode_json \@platforms;
                if ($restriction == 2005 or $restriction == 2004) {
                        return $full_query, $platforms_encoded, $max_price, $custom_ids{ $restriction };
                } else {
                        return $full_query, $platforms_encoded, $max_price, "2414062669";
                }
        } else {
                my @full_platforms = uniq({sort => 1}, values %platform_ids);

                # need to recast as int because uniq and sort convert to string
                push @platforms, int($_) foreach @full_platforms;
                $platforms_encoded = encode_json \@platforms;

                return $full_query, $platforms_encoded, $max_price, "2414062669";
        }
        return;
};

1;
