package DDG::Spice::Translation;

use DDG::Spice;

spice is_cached => 1;

spice from => "([^/]+)/([^\-]+)\-?(.+)?";
spice to => 'https://ddh7.duckduckgo.com/translation.js?q=$1&to=$2&from=$3';

spice wrap_jsonp_callback => 1;

triggers any => "translate";

my %languages = (
    'ar' => 'arabic',
    'bs-Latn' => 'bosnian (Latin)',
    'bg' => 'bulgarian',
    'ca' => 'catalan',
    'zh-CHS' => 'chinese simplified',
    'zh-CHT' => 'chinese traditional',
    'hr' => 'croatian',
    'cs' => 'czech',
    'da' => 'danish',
    'nl' => 'dutch',
    'en' => 'english',
    'et' => 'estonian',
    'fi' => 'finnish',
    'fr' => 'french',
    'de' => 'german',
    'el' => 'greek',
    'ht' => 'haitian creole',
    'he' => 'hebrew',
    'hi' => 'hindi',
    'mww' => 'hmong daw',
    'hu' => 'hungarian',
    'id' => 'indonesian',
    'it' => 'italian',
    'ja' => 'japanese',
    'tlh' => 'klingon',
    'tlh-Qaak' => 'klingon (pIqaD)',
    'ko' => 'korean',
    'lv' => 'latvian',
    'lt' => 'lithuanian',
    'ms' => 'malay',
    'mt' => 'maltese',
    'no' => 'norwegian',
    'fa' => 'persian',
    'pl' => 'polish',
    'pt' => 'portuguese',
    'otq' => 'querétaro otomi',
    'ro' => 'romanian',
    'ru' => 'russian',
    'sr-Cyrl' => 'serbian (Cyrillic)',
    'sr-Latn' => 'serbian (Latin)',
    'sk' => 'slovak',
    'sl' => 'slovenian',
    'es' => 'spanish',
    'sv' => 'swedish',
    'th' => 'thai',
    'tr' => 'turkish',
    'uk' => 'ukrainian',
    'ur' => 'urdu',
    'vi' => 'vietnamese',
    'cy' => 'welsh',
    'yua' => 'yucatec maya'
);

%languages = (%languages, reverse %languages);

handle remainder => sub {

    return unless $_;
	my $query = shift;

	my ($text, $from, $to) = ('', '', '');

    # Example 1: 'translate library from english to spanish'
    if ($query =~ /(.+?)\s+from\s+(\w+)\s+to\s+(\w+)/) {
        $text = $1;
        $from = $2;
        $to = $3;
        warn "TEXT: $text FROM: $from TO: $to";

	# Example 2: 'translate library to spanish'
    }elsif ($query =~ /(\w+)\s+to\s+(\w+)/) {
        $text = $1;
        $to = $2;
        warn "TEXT: $text TO: $to";

	}else {
        my @words = split (/ /, $query);
        my ($lang1, $lang2) = ('', '');
        foreach my $word (@words) {
            if ($languages{$word} && !$lang2) {
                if ($lang1) {
                    # Example 3: 'translate library english spanish'
                    $lang2 = $word;
                }else {
                    # Example 3: 'translate library spanish'
                    $lang1 = $word;
                }
            }elsif($languages{$word} && $lang2) {
                # more than 2 languages in the query, bail here
                return;
            }else {
                $text = $word;
            }
        }
        if ($lang2) {
            $from = $lang1;
            $to = $lang2;
        }elsif ($lang1) {
            $to = $lang1;
        }
    }

	return unless $text && $to;

	return $text, "$to-$from" if $from;
	return $text, $to;

};

1;
