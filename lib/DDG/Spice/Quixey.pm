package DDG::Spice::Quixey;

use DDG::Spice;
use JSON;

triggers any => "quixey", "app", "apps", "android", "Android", "iphone", "iPhone", "blackberry", "Blackberry", "Windows", "windows";

spice from => '([^/]+)/?(?:([^/]+)/?(?:([^/]+)|)|)';
spice to => 'https://api.quixey.com/1.0/search?partner_id=2073823582&partner_secret={{ENV{DDG_SPICE_QUIXEY_PARTNER_SECRET}}}&q=$1&platform_ids=$2&custom_id=$3&restrict_editions=1&edition_limit=0&limit=6&skip=0&format=json&callback={{callback}}';

handle query_parts => sub {
    my (%platform_ids) = (
        "android" => 2005,
        "Android" => 2005,
        "windows" => 8556073,
        "Windows" => 8556073,
        "blackberry" => 2008,
        "Blackberry" => 2008,
        "iphone" => 2004,
        "iPhone" => 2004,
        "quixey" => 0,
        "app" => 0,
        "apps" => 0
    );
    my (%custom_ids) = (
        2005 => 75675980,
        2004 => 78989893
    );
    my (@query) = @_;
    my ($restriction) = 0;
    my ($word) = 0;
    my ($count) = 0;

    foreach $word(@query) {
        if (defined $platform_ids{ $word }) {
            $restriction = $platform_ids{ $word };
            splice @query, $count, 1;
            last;
        }
        $count += 1;
    }

    my ($full_query) = join(" ", @query);

    if ($restriction) {
        my @platforms = ();
        $platforms[0] = $restriction;
        my $platforms_encoded = encode_json \@platforms;
        if ($restriction == 2005 or $restriction == 2004) {
            return $full_query, $platforms_encoded, $custom_ids{ $restriction };
        } else {
            return $full_query, $platforms_encoded, "";
        }
    } else {
        my @full_platforms = values %platform_ids;
        my @platforms = ();
        foreach my $element(@full_platforms) {
            if (defined $element and $element ne 0) {
                push @platforms, int($element);
            }
        }
        my $platforms_encoded = encode_json \@platforms;
        return $full_query, $platforms_encoded, "";
    }

    return;
};

1;
