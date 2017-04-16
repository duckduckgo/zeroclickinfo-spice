package DDG::Spice::Horoscope;

use DDG::Spice;

name 'Earthquake';
source 'Astrology.com';
icon_url '/i/astrology.com.ico';
description 'Displays horoscope of a certain zodiac sign';
primary_example_queries 'horoscope aries';
category 'special';
topics 'everyday';
code_url 'https://github.com/yzwx/zeroclickinfo-spice/blob/horoscope/lib/DDG/Spice/Horoscope.pm';
attribution github => ['https://github.com/yzwx', 'yzwx'];

triggers startend => 'horoscope';

spice to => 'http://www.astrology.com/horoscopes/daily-extended.rss';
spice wrap_string_callback => 1;

handle remainder => sub {
	return '' if $_ =~ /aries|taurus|gemini|cancer|leo|virgo|libra|scorpio|sagittarius|capricorn|aquarius|pisces/i;
	return;
};

1;