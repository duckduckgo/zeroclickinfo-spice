package DDG::Spice::Zipcode;
# ABSTRACT: return the location and approximate area of a postal code.

use DDG::Spice;
use URI::Escape;

#Attribution
primary_example_queries "19201", "19301 Turkey";
secondary_example_queries "zipcode 19087", "postal code L3P 1T4";
description "zip and postal code maps";
name "Zipcode";
icon_url "/i/mapq.st.ico";
source "MapQuest";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Zipcode.pm";
category "geography";
topics "everyday", "geography", "travel";
attribution github => ["https://github.com/almanackist", "Almanackist"],
            twitter => ["https://twitter.com/cajoyce", "cajoyce"];

# Triggers
my $zip_string = qr/(zip|post(al)?)\s*(code)?/;

triggers query_lc => qr/(?:$zip_string|[a-z\d\-\s]{2,15})/;

spice from => '([A-Z0-9\-]+)(?:/([A-Z]+)?)?';
spice to => '"http://where.yahooapis.com/v1/places{{dollar}}and(.q($1,$2),.type(11));count=0?appid={{ENV{DDG_SPICE_ZIPCODE_APIKEY}}}&format=json&callback={{callback}}"';

# Handle statement
handle query_lc => sub {

  # Definitions
  my %countries = ("afghanistan" => "af", "albania" => "al", "algeria" => "dz", "american samoa" => "as", "andorra" => "ad", "angola" => "ao", "anguilla" => "ai", "antarctica" => "aq", "antigua & barbuda" => "ag", "antigua and barbuda" => "ag", "antigua barbuda" => "ag", "antigua" => "ag", "argentina" => "ar", "armenia" => "am", "aruba" => "aw", "australia" => "au", "austria" => "at", "azerbaijan" => "az", "bahama" => "bs", "bahamas" => "bs", "bahrain" => "bh", "bangladesh" => "bd", "barbados" => "bb", "belarus" => "by", "belgium" => "be", "belize" => "bz", "benin" => "bj", "bermuda" => "bm", "bhutan" => "bt", "bolivia" => "bo", "bosnia and herzegovina" => "ba", "bosnia herzegovina" => "ba", "bosnia" => "ba", "botswana" => "bw", "bouvet island" => "bv", "brazil" => "br", "british indian ocean territory" => "io", "british virgin islands" => "vg", "brunei darussalam" => "bn", "brunei" => "bn", "bulgaria" => "bg", "burkina faso" => "bf", "burma" => "bu", "burundi" => "bi", "cambodia" => "kh", "cameroon" => "cm", "canada" => "ca", "cape verde" => "cv", "cayman islands" => "ky", "central african republic" => "cf", "chad" => "td", "chile" => "cl", "china" => "cn", "christmas island" => "cx", "cocos islands" => "cc", "colombia" => "co", "comoros" => "km", "congo" => "cg", "cook islands" => "ck", "costa rica" => "cr", "cote d'ivoire" => "ci", "cote divoire" => "ci", "croatia" => "hr", "cuba" => "cu", "curacao" => "cw", "curaçao" => "cw", "cyprus" => "cy", "czech republic" => "cz", "czechoslovakia" => "cs", "democratic republic of congo" => "cg", "democratic yemen" => "yd", "denmark" => "dk", "djibouti" => "dj", "dominica" => "dm", "dominican republic" => "do", "east timor" => "tp", "ecuador" => "ec", "egypt" => "eg", "el salvador" => "sv", "equatorial guinea" => "gq", "eritrea" => "er", "estonia" => "ee", "ethiopia" => "et", "falkland islands" => "fk", "faroe islands" => "fo", "fiji" => "fj", "finland" => "fi", "france metropolitan" => "fx", "france" => "fr", "french guiana" => "gf", "french polynesia" => "pf", "french southern and antarctic territories" => "tf", "gabon" => "ga", "gambia" => "gm", "georgia" => "ge", "germany" => "de", "ghana" => "gh", "gibraltar" => "gi", "great britain" => "gb", "greece" => "gr", "greenland" => "gl", "grenada" => "gd", "guadeloupe" => "gp", "guam" => "gu", "guatemala" => "gt", "guinea bissau" => "gw", "guinea" => "gn", "guinea-bissau" => "gw", "guyana" => "gy", "haiti" => "ht", "heard & mcdonald islands" => "hm", "heard and mcdonald islands" => "hm", "heard mcdonald islands" => "hm", "honduras" => "hn", "hong kong" => "hk", "hungary" => "hu", "iceland" => "is", "india" => "in", "indonesia" => "id", "iran" => "ir", "iraq" => "iq", "ireland" => "ie", "israel" => "il", "italy" => "it", "jamaica" => "jm", "japan" => "jp", "jordan" => "jo", "kazakhstan" => "kz", "kenya" => "ke", "kiribati" => "ki", "korea" => "kp", "korea" => "kr", "kuwait" => "kw", "kyrgyzstan" => "kg", "laos" =>"la", "latvia" => "lv", "lebanon" => "lb", "lesotho" => "ls", "liberia" => "lr", "libya" => "ly", "libyan arab jamahiriya" => "ly", "liechtenstein" => "li", "lithuania" => "lt", "luxembourg" => "lu", "macedonia" => "mk", "macau" => "mo", "madagascar" => "mg", "malawi" => "mw", "malaysia" => "my", "maldives" => "mv", "mali" => "ml", "malta" => "mt", "marshall islands" => "mh", "martinique" => "mq", "mauritania" => "mr", "mauritius" => "mu", "mayotte" => "yt", "mexico" => "mx", "micronesia" => "fm", "moldova" => "md", "monaco" => "mc", "mongolia" => "mn", "monserrat" => "ms", "morocco" => "ma", "mozambique" => "mz", "myanmar" => "mm", "nambia" => "na", "nauru" => "nr", "nepal" => "np", "netherlands antilles" => "an", "netherlands" => "nl", "neutral zone" => "nt", "new caledonia" => "nc", "new zealand" => "nz", "newzealand" => "nz", "nicaragua" => "ni", "niger" => "ne", "nigeria" => "ng", "niue" => "nu", "norfolk island" => "nf", "northern mariana islands" => "mp", "norway" => "no", "oman" => "om", "pakistan" => "pk", "palau" => "pw", "panama" => "pa", "papua new guinea" => "pg", "paraguay" => "py", "peru" => "pe", "philippines" => "ph", "pitcairn" => "pn", "poland" => "pl", "portugal" => "pt", "puerto rico" => "pr", "qatar" => "qa", "reunion" => "re", "romania" => "ro", "russia" => "ru", "russian federation" => "ru", "rwanda" => "rw", "saint helena" => "sh", "saint kitts and nevis" => "kn", "saint kitts nevis" => "kn", "saint kitts" => "kn", "saint lucia" => "lc", "saint pierre miquelon" => "pm", "saint vincent grenadines" => "vc", "saint vincent" => "vc", "samoa" => "ws", "san marino" => "sm", "sao tome & principe" => "st", "sao tome and principe" => "st", "sao tome principe" => "st", "saudi arabia" => "sa", "senegal" => "sn", "seychelles" => "sc", "sierra leone" => "sl", "singapore" => "sg", "slovakia" => "sk", "slovenia" => "si", "solomon islands" => "sb", "somalia" => "so", "south africa" => "za", "south georgia and the south sandwich islands" => "gs", "south georgia" => "gs", "south sandwich islands" => "gs", "spain" => "es", "sri lanka" => "lk", "srilanka" => "lk", "st helena" => "sh", "st kitts and nevis" => "kn", "st kitts nevis" => "kn", "st kitts" => "kn", "st pierre & miquelon" => "pm", "st pierre and miquelon" => "pm", "st pierre miquelon" => "pm", "st vincent & the grenadines" => "vc", "st vincent and the grenadines" => "vc", "st vincent grenadines" => "vc", "st vincent" => "vc", "sudan" => "sd", "suriname" => "sr", "svalbard & jan mayen islands" => "sj", "svalbard and jan mayen islands" => "sj", "svalbard jan mayen islands" => "sj", "swaziland" => "sz", "sweden" => "se", "switzerland" => "ch", "syria" => "sy", "syrian arab republic" => "sy", "taiwan province of china" => "tw", "taiwan" => "tw", "tajikistan" => "tj", "tanzania" => "tz", "thailand" => "th", "togo" => "tg", "tokelau" => "tk", "tonga" => "to", "trinidad & tobago" => "tt", "trinidad and tobago" => "tt", "trinidad tobago" => "tt", "tunisia" => "tn", "turkey" => "tr", "turkmenistan" => "tm", "turks & caicos islands" => "tc", "turks and caicos islands" => "tc", "turks caicos islands" => "tc", "turks caicos" => "tc", "tuvalu" => "tv", "uganda" => "ug", "ukraine" => "ua", "united arab emirates" => "ae", "united kingdom" => "gb", "united republic of tanzania" => "tz", "united states minor outlying islands" => "um", "united states of america" => "us", "united states virgin islands" => "vi", "united states" => "us", "uruguay" => "uy", "us minor outlying islands" => "um", "us of a" => "us", "us virgin islands" => "vi", "us" => "us", "usa" => "us", "uzbekistan" => "uz", "vanuatu" => "vu", "vatican city" => "va", "vatican" => "va", "venezuela" => "ve", "viet nam" => "vn", "vietnam" => "vn", "virgin islands" => "vg", "wallis & futuna islands" => "wf", "wallis and futuna islands" => "wf", "wallis futuna islands" => "wf", "western sahara" => "eh", "yemen" => "ye", "yugoslavia" => "yu", "zaire" => "zr", "zambia" => "zm", "zimbabwe" => "zw");
  my @names = reverse keys %countries;
  my ($country, $code);

  # Check for and remove trigger words
  s/\s*$zip_string\s*//g;

  # Check to make sure trigger wasn't the entire query
  return if ($_ eq '');

  # Check for country name in query
  foreach my $name (@names){
    if (m/$name/){
      $country = $name;
      s/\s*$name\s*//g;
      last;
    }
  }

  # Regexs to disqualify:
  # Check for presence of a digit unless matches edge case
  unless (m/\d/ or m/^\b[a-z]{2}\s*[a-z]{2}\b$/) {
    return;
  }

  # Check for too many digits
  if (m/\d{8,}$/) {
    return;
  }

  # Check for too many letters
  if (m/[a-z]{5,}$/ and $_ !~ m/(\d\d [a-z\d\-]+ \d\d)/x ) {
    return;
  }

  # Check for known false triggers
  # (more can be added...)
  if (m/\b
          (
              4 \s* chan
            | \d+ \s* (st|nd|rd|th)
            | mp(3|4)
            | (19|20)\d{2} \s+ v(4|6|8|12)
            | calend(a|e)r
          )
        \b
      /x) {
    return;
  }

  # Check if postal code matches any known patterns
  if (m/^
          (
              [a-z]{2} \s* [a-z]{2} \b
            | \d{2} [a-z]+ [a-z\s]+ \d{2}
            | \d{3} \- \d{3} \- \d
            | \d{6} \s* \d{3} \- \d{3}
          )
      $/x) {
    $code = $1;
  }

  # Alphanumeric postal code patterns with dashes in them
  elsif (m/^  ( (?: \d{1,4} | [a-z]{2} ) \d\-\d\d \d{1,4} ) $/x) {
    $code = $1;
  }

  # Alphanumeric postal code patterns with spaces in them
  # Alphanumeric postal code edgecases
  elsif (m/^
            (
                \d{4} \s* \d{3,4}
              | \d{4} \s* [a-z]{1,2}
              | [a-z] \d [a-z] \s* \d [a-z] \d
              | [a-z]{3} \s* \d{3}
              | [a-z]{2} \s* \d{2}
              | \d{3} \s* \d{2,3}
              | (?:
                    [a-z]{2} \d ( [a-z] | \d )
                  | [a-z] (?: \d{2} | \d[a-z] | [a-z]\d )
                  | [a-z]\d
                ) \s* \d [a-z]{2}
            )
        $/x) {
    $code = $1;
  }

  # Alphanumeric postal code patterns without spaces in them
  elsif (m/^
            (
                [a-z]{1,3} \d{3,6}
              | [a-z]{4} \d [a-z]{2}
              | [a-z]{5} \d{2}
            )
        $/x) {
    $code = $1;
  }

  # Numeric postal code patterns (optional dash for searches like "19301-")
  elsif (m/^ ( \d{2,7} ) \-? $/x) {
    $code = $1;
  }

  # No postal code found
  else {
    return;
  };

  # remove spaces from postal code
  $code =~ s/ //g;

  if (defined $country and defined $code) {
    return uri_escape(uc($code)), uc $countries{$country};
  }

  # No country given, default to ZZ for global search
  return (uc $code, 'ZZ') if defined $code;
};

1;