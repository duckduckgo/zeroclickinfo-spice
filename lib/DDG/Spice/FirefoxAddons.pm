package DDG::Spice::FirefoxAddons;

use DDG::Spice;

triggers any => "firefox";

spice to => 'https://services.addons.mozilla.org/en-US/firefox/api/1.5/search/$1/all/1';
spice wrap_string_callback => 1;

primary_example_queries "manage firefox tabs";
secondary_example_queries "firefox addon manager";
description "Firefox Add-ons";
name "FirefoxAddons";
icon_url "/i/addons.mozilla.org.ico";
source "Mozilla|AMO";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/FirefoxAddons.pm";
topics  "geek";
category  "software";

attribution github => ['https://github.com/CIAvash','Siavash'],
  twitter => ['https://twitter.com/CIAvash','CIAvash'],
  web => ['http://potatozone.com','PotatoZone'];

handle remainder => sub {
  return $_;
};

1;