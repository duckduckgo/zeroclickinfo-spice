package DDG::Spice::Instagram;

use DDG::Spice;

spice is_cached => 1;

name "instagram";
source "Instagram";
icon_url "http://instagramstatic-a.akamaihd.net/bluebar/ab9cf6a/images/ico/favicon.ico";
description "View details on an Instagram photo";
primary_example_queries "instagram uZAo9qkgTU";
category "entertainment";
topics "social", "entertainment", "special_interest";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Instagram.pm";
attribution github => ["GitHubAccount", "jkv"],
            twitter => "jkv";

triggers startend => "instagram";
# http://instagram.com/developer/embedding/
spice to => 'http://api.instagram.com/oembed?url=http://instagram.com/p/$1/&maxwidth=320&callback=ddg_spice_instagram';

handle remainder => sub {
    return unless $_;

    return if $_ !~ /\A[\w\-]+\z/smi;    # limit possible query reminder to single word

    return $_;
};

1;

