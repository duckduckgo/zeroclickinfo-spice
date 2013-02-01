package DDG::Spice::Bible;

use DDG::Spice;

primary_example_queries "genesis 15:7";
secondary_example_queries "bible genesis 26:4";

description "Bible verses";
name "Bible";
icon_url "/i/blueletterbible.org.ico";
source "Blue Letter Bible";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Bible.pm";
topics "special_interest", "everyday";
category "random";
attribution github => ['https://github.com/hunterlang','Hunter Lang'],
            web => 'http://hunterlang.com/';

triggers any => "bible", ":", "genesis", "exodus", "leviticus", "numbers", "deuteronomy", "joshua", "judges", "ruth", "1 samuel", "2 samuel", "1 kings", "2 kings", "1 chronicles", "2 chronicles", "ezra", "nehemiah", "esther", "job", "psalm", "proverbs", "ecclesiastes", "song of solomon", "isaiah", "jeremiah", "lamentations", "ezekiel", "daniel", "hosea", "joel", "amos", "obadiah", "jonah", "micah", "nahum", "habakkuk", "zephaniah", "haggai", "zechariah", "malachi", "matthew", "mark", "luke", "john", "acts", "romans", "1 corinthians", "2 corinthians", "galatians", "ephesians", "philippians", "colossians", "1 thessalonians", "2 thessalonians", "1 timothy", "2 timothy", "titus", "philemon", "hebrews", "james", "1 peter", "2 peter", "1 john", "2 john", "3 john", "jude", "revelation";

spice to => 'http://labs.bible.org/api/?type=json&callback={{callback}}&formatting=plain&passage=$1';

handle query_lc => sub {
    if ($_ =~ /^bible\s+([a-z]+\s*?[0-9]+:[0-9]+)$/i || $_ =~ /^((?:genesis|exodus|leviticus|numbers|deuteronomy|joshua|judges|ruth|1 samuel|2 samuel|1 kings|2 kings|1 chronicles|2 chronicles|ezra|nehemiah|esther|job|psalm|proverbs|ecclesiastes|song of solomon|isaiah|jeremiah|lamentations|ezekiel|daniel|hosea|joel|amos|obadiah|jonah|micah|nahum|habakkuk|zephaniah|haggai|zechariah|malachi|matthew|mark|luke|john|acts|romans|1 corinthians|2 corinthians|galatians|ephesians|philippians|colossians|1 thessalonians|2 thessalonians|1 timothy|2 timothy|titus|philemon|hebrews|james|1 peter|2 peter|1 john|2 john|3 john|jude|revelation)\s+[0-9]+:[0-9]+)$/) {
	    return $1 if $1;
    }
    return;
};

1;
